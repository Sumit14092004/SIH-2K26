// Web Audio API Synthesizer for Disaster Alert Klaxon
class SirenManager {
  constructor() {
    this.ctx = null;
    this.oscillator1 = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.isMuted = false;
    this.autoStopTimer = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext not supported or permission denied
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.isPlaying) {
      this.stop();
    }
  }

  start() {
    if (this.isMuted) return;
    this.init();

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.isPlaying) return;
    if (!this.ctx) return;

    this.isPlaying = true;

    try {
      // Dual-tone alternating hazard klaxon: ~800 Hz and ~1050 Hz in repeating wail pattern
      this.oscillator1 = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();

      this.oscillator1.type = 'sawtooth';
      this.oscillator1.frequency.setValueAtTime(800, this.ctx.currentTime);

      // Audible master gain
      this.gainNode.gain.setValueAtTime(0.24, this.ctx.currentTime);

      this.oscillator1.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      this.oscillator1.start();

      let highTone = false;
      this.intervalId = setInterval(() => {
        if (!this.isPlaying || !this.ctx || !this.oscillator1) return;
        highTone = !highTone;
        const freq = highTone ? 1050 : 780;
        try {
          this.oscillator1.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.08);
        } catch {
          // ignore if frequency ramp fails
        }
      }, 380);
    } catch (err) {
      console.warn('[SIREN] Could not start audio oscillator:', err);
    }
  }

  playCriticalSiren(durationMs = 7000) {
    if (this.isMuted) return;
    this.start();
    if (this.autoStopTimer) clearTimeout(this.autoStopTimer);
    this.autoStopTimer = setTimeout(() => {
      this.stop();
      this.autoStopTimer = null;
    }, durationMs);
  }

  stop() {
    if (this.autoStopTimer) {
      clearTimeout(this.autoStopTimer);
      this.autoStopTimer = null;
    }

    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.oscillator1) {
      try {
        this.oscillator1.stop();
        this.oscillator1.disconnect();
      } catch {
        // ignore if already stopped
      }
      this.oscillator1 = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const sirenManager = new SirenManager();

// Auto-unlock AudioContext on user's first interaction with document (click, tap, keypress)
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sirenManager.init();
    if (sirenManager.ctx && sirenManager.ctx.state === 'suspended') {
      sirenManager.ctx.resume().catch(() => {});
    }
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}
