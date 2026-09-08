// Web Audio API Synthesizer for Disaster Alert Klaxon
class SirenManager {
  constructor() {
    this.ctx = null;
    this.oscillator1 = null;
    this.oscillator2 = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.isMuted = false;
    this.autoStopTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
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
    if (this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    // Dual-tone alternating hazard klaxon: ~800 Hz and ~1000 Hz in repeating wail pattern
    this.oscillator1 = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();

    this.oscillator1.type = 'sawtooth';
    this.oscillator1.frequency.setValueAtTime(800, this.ctx.currentTime);

    // Soft master gain
    this.gainNode.gain.setValueAtTime(0.14, this.ctx.currentTime);

    this.oscillator1.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.oscillator1.start();

    let highTone = false;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      highTone = !highTone;
      const freq = highTone ? 1000 : 800;
      this.oscillator1.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.08);
    }, 400);
  }

  playCriticalSiren(durationMs = 6000) {
    if (this.isMuted) return;
    this.start();
    if (this.autoStopTimer) clearTimeout(this.autoStopTimer);
    this.autoStopTimer = setTimeout(() => {
      this.stop();
      this.autoStopTimer = null;
    }, durationMs);
  }

  stop() {
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
