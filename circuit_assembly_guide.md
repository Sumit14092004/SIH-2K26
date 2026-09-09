# Aapda-Kadabra: Circuit Assembly Guide
## From Zero to a Working Environmental Sensor Node

**Difficulty:** Beginner (No prior electronics experience needed)  
**Time Required:** ~2 hours  
**Tools Needed:** Breadboard, Jumper Wires, Soldering Iron (only for battery holder)

---

## Before You Start: The Golden Rules

> [!CAUTION]
> **RULE 1: NEVER connect or disconnect wires while the ESP32 is powered on.** Always unplug the USB cable first.
>
> **RULE 2: NEVER connect 5V or 3.3V directly to a sensor pin that expects an analog signal.** You will fry the sensor.
>
> **RULE 3: Double-check every wire BEFORE plugging in the USB cable.** One wrong wire can permanently destroy the ESP32.

---

## Step 0: Know Your Breadboard

A breadboard is a plastic board with tiny holes. Inside those holes are hidden metal strips that connect them together.

```
     A  B  C  D  E     F  G  H  I  J
  1  ●──●──●──●──●     ●──●──●──●──●
  2  ●──●──●──●──●     ●──●──●──●──●
  3  ●──●──●──●──●     ●──●──●──●──●
     ...
 30  ●──●──●──●──●     ●──●──●──●──●

  +  ●──●──●──●──●──●──●──●──●──●──●  ← RED POWER RAIL (all connected)
  -  ●──●──●──●──●──●──●──●──●──●──●  ← BLUE GROUND RAIL (all connected)
```

**Key Concept:**
- Holes in the same ROW (A-E or F-J) are connected internally.
- The big gap in the middle BREAKS the connection.
- The RED rail (+) on the side runs the entire length — use it for 3.3V power.
- The BLUE rail (-) on the side runs the entire length — use it for GND (ground).

---

## Step 1: Place the ESP32 on the Breadboard

1. Take your ESP32 Dev Kit board.
2. Place it so it **straddles the center gap** of the breadboard (one row of pins on the left side, one row on the right side).
3. Push it down firmly so all pins are seated in the holes.
4. The USB port should face **outward** (towards you), hanging off the edge of the breadboard.

```
        LEFT SIDE          GAP          RIGHT SIDE
        ─────────          ───          ──────────
        ┌─────────────────────────────────┐
        │           ESP32 BOARD           │
        │     ┌───────────────────┐       │
  3V3  ─┤     │                   │       ├─ VIN (5V)
  GND  ─┤     │    ESP32-S3      │       ├─ GND
  D15  ─┤     │                   │       ├─ D13
  D2   ─┤     │   ┌──────────┐   │       ├─ D12
  D4   ─┤     │   │   USB    │   │       ├─ D14
  ...  ─┤     │   │  PORT    │   │       ├─ D27
  D21  ─┤     │   └──────────┘   │       ├─ D26
  D22  ─┤     │                   │       ├─ D25
  D23  ─┤     │                   │       ├─ D33
        │     └───────────────────┘       │
        └─────────────────────────────────┘
```

---

## Step 2: Set Up the Power Rails

Before connecting any sensor, we need to create two "highways" on the breadboard — one for power (3.3V) and one for ground (GND).

**What to do:**
1. Take a **RED** jumper wire.
2. Connect it from the ESP32's **3V3** pin to the **RED (+) rail** on the side of the breadboard.
3. Take a **BLACK** jumper wire.
4. Connect it from the ESP32's **GND** pin to the **BLUE (-) rail** on the side of the breadboard.

Now every sensor can grab power from the RED rail and ground from the BLUE rail without crowding the ESP32's pins.

```
ESP32 PIN          RAIL
─────────          ────
  3V3  ──RED wire──►  + (RED RAIL)
  GND  ──BLK wire──►  - (BLUE RAIL)
```

> [!TIP]
> If your breadboard has power rails on BOTH sides (left and right), connect the left (+) to the right (+) with a jumper wire, and the left (-) to the right (-) with another jumper wire. This gives you power access on both sides.

---

## Step 3: Connect the BME680 (Temperature / Humidity / Pressure / VOC)

The BME680 uses a protocol called **I2C** — it only needs 4 wires.

**Wiring:**

| BME680 Pin | Connect To | Wire Color |
|---|---|---|
| **VCC** | RED (+) Rail | Red |
| **GND** | BLUE (-) Rail | Black |
| **SCL** | ESP32 Pin **GPIO 22** | Yellow |
| **SDA** | ESP32 Pin **GPIO 21** | Green |

```
BME680 Module           ESP32
┌───────────┐           
│  ● VCC ───┼──RED──────► + RAIL (3.3V)
│  ● GND ───┼──BLACK────► - RAIL (GND)
│  ● SCL ───┼──YELLOW───► GPIO 22
│  ● SDA ───┼──GREEN────► GPIO 21
└───────────┘
```

**How to do it:**
1. Place the BME680 module on the breadboard, away from the ESP32 (around row 25).
2. Connect VCC to the RED rail using a red jumper wire.
3. Connect GND to the BLUE rail using a black jumper wire.
4. Connect SCL to GPIO 22 on the ESP32 using a yellow wire.
5. Connect SDA to GPIO 21 on the ESP32 using a green wire.

**Done!** The BME680 is connected. Move to the next sensor.

---

## Step 4: Connect the MPU6050 (Vibration / Landslide Sensor)

The MPU6050 ALSO uses **I2C** — and here is the beautiful part: it shares the SAME two wires (GPIO 21 and GPIO 22) as the BME680! I2C allows multiple devices on the same two wires because each device has a unique internal address.

**Wiring:**

| MPU6050 Pin | Connect To | Wire Color |
|---|---|---|
| **VCC** | RED (+) Rail | Red |
| **GND** | BLUE (-) Rail | Black |
| **SCL** | ESP32 Pin **GPIO 22** (same as BME680!) | Yellow |
| **SDA** | ESP32 Pin **GPIO 21** (same as BME680!) | Green |

```
MPU6050 Module          ESP32
┌───────────┐           
│  ● VCC ───┼──RED──────► + RAIL (3.3V)
│  ● GND ───┼──BLACK────► - RAIL (GND)
│  ● SCL ───┼──YELLOW───► GPIO 22  ◄── SHARED with BME680
│  ● SDA ───┼──GREEN────► GPIO 21  ◄── SHARED with BME680
│  ● XDA    │  (leave empty)
│  ● XCL    │  (leave empty)
│  ● AD0    │  (leave empty)
│  ● INT    │  (leave empty)
└───────────┘
```

> [!NOTE]
> **"But wait, two sensors on the same wires?"** Yes! I2C is like a highway with addresses. The BME680 lives at address `0x76` and the MPU6050 lives at address `0x68`. The ESP32 calls each one by its address, so they never get confused.

---

## Step 5: Connect the MQ-135 (Gas / Smoke Sensor)

The MQ-135 is an **analog** sensor. It outputs a voltage that changes based on how much gas/smoke is in the air. The ESP32 reads this voltage using its ADC (Analog-to-Digital Converter).

**Wiring:**

| MQ-135 Pin | Connect To | Wire Color |
|---|---|---|
| **VCC** | RED (+) Rail | Red |
| **GND** | BLUE (-) Rail | Black |
| **AO** (Analog Out) | ESP32 Pin **GPIO 34** | Orange |
| **DO** (Digital Out) | (leave empty — we don't need it) | — |

```
MQ-135 Module           ESP32
┌───────────┐           
│  ● VCC ───┼──RED──────► + RAIL (3.3V)
│  ● GND ───┼──BLACK────► - RAIL (GND)
│  ● AO  ───┼──ORANGE───► GPIO 34
│  ● DO     │  (leave empty)
└───────────┘
```

> [!WARNING]
> The MQ-135 has a small metal cylinder on top that gets **very hot** during operation (it has an internal heater). Do not touch it while it is powered on. This is normal — the heat helps it detect gases accurately.

---

## Step 6: Connect the HC-SR04 (Ultrasonic Water Level Sensor)

This sensor sends out an ultrasonic "ping" (like a bat) and measures how long it takes for the echo to come back. From this, it calculates distance to the water surface.

**Wiring:**

| HC-SR04 Pin | Connect To | Wire Color |
|---|---|---|
| **VCC** | RED (+) Rail | Red |
| **GND** | BLUE (-) Rail | Black |
| **TRIG** | ESP32 Pin **GPIO 25** | Blue |
| **ECHO** | ESP32 Pin **GPIO 26** | Purple |

```
HC-SR04 Module          ESP32
┌───────────┐           
│  ● VCC ───┼──RED──────► + RAIL (3.3V)
│  ● TRIG ──┼──BLUE─────► GPIO 25
│  ● ECHO ──┼──PURPLE───► GPIO 26
│  ● GND ───┼──BLACK────► - RAIL (GND)
└───────────┘
```

> [!IMPORTANT]
> **Orientation Matters!** In the final deployment, this sensor must point **straight down** towards the water surface. During testing on your desk, you can point it at the table or your hand and watch the distance change on the Serial Monitor.

---

## Step 7: Connect the PMS5003 (PM2.5 / PM10 Air Quality Sensor)

This sensor uses **UART** (Serial Communication) — it sends a stream of data bytes.

**Wiring:**

| PMS5003 Pin | Connect To | Wire Color |
|---|---|---|
| **VCC (Pin 1)** | RED (+) Rail (**5V from VIN, NOT 3.3V**) | Red |
| **GND (Pin 2)** | BLUE (-) Rail | Black |
| **TX (Pin 5)** | ESP32 Pin **GPIO 16** (ESP32 RX) | White |

```
PMS5003 Cable           ESP32
┌───────────┐           
│  Pin 1 VCC┼──RED──────► VIN (5V) or + RAIL
│  Pin 2 GND┼──BLACK────► - RAIL (GND)
│  Pin 3    │  (leave empty)
│  Pin 4    │  (leave empty)
│  Pin 5 TX ┼──WHITE────► GPIO 16 (RX2)
└───────────┘
```

> [!WARNING]
> The PMS5003 requires **5V** power, not 3.3V. Connect its VCC to the ESP32's **VIN** pin (which outputs 5V from USB power) or directly to the 5V line from your TP4056 module. Do NOT connect it to the 3.3V rail — it will not work.

---

## Step 8: Connect the Remaining 3 Analog Sensors

These three sensors are very simple — they each have 3 pins (VCC, GND, Signal) and connect to the ESP32's analog input pins.

### 8A: Raindrop Sensor

| Pin | Connect To |
|---|---|
| **VCC** | RED (+) Rail |
| **GND** | BLUE (-) Rail |
| **AO** | ESP32 Pin **GPIO 35** |

### 8B: Turbidity Sensor

| Pin | Connect To |
|---|---|
| **VCC** | RED (+) Rail |
| **GND** | BLUE (-) Rail |
| **AO** | ESP32 Pin **GPIO 32** |

### 8C: Capacitive Soil Moisture Sensor

| Pin | Connect To |
|---|---|
| **VCC** | RED (+) Rail |
| **GND** | BLUE (-) Rail |
| **AO** | ESP32 Pin **GPIO 33** |

```
All 3 Analog Sensors → Same Pattern:
  VCC ──► + RAIL (3.3V)
  GND ──► - RAIL (GND)
  AO  ──► Unique GPIO Pin (35, 32, or 33)
```

---

## Step 9: Build the Solar Power Circuit

This is the only part that may require soldering. This circuit lets your node run forever on solar power.

**Components:**
- Linx Solar Panel (5V output)
- TP4056 Charging Module
- 18650 Battery in Holder
- ESP32

**How it connects:**

```
                    TP4056 Module
                ┌──────────────────┐
 SOLAR PANEL    │                  │     18650 BATTERY
 ┌────────┐    │  IN+    BAT+     │    ┌────────────┐
 │  (+) ──┼────►  ●        ●  ────┼────►  (+)       │
 │        │    │                  │    │            │
 │  (-) ──┼────►  ●        ●  ────┼────►  (-)       │
 └────────┘    │  IN-    BAT-     │    └────────────┘
                │                  │
                │  OUT+    OUT-    │
                │   ●        ●    │
                └───┼────────┼────┘
                    │        │
                    ▼        ▼
                  ESP32    ESP32
                  VIN      GND
```

**Step by step:**
1. **Solar Panel → TP4056 Input:** Connect the solar panel's RED wire (+) to the **IN+** pad on the TP4056. Connect the BLACK wire (-) to the **IN-** pad.
2. **18650 Battery → TP4056 Battery:** Connect the battery holder's RED wire (+) to the **BAT+** pad. Connect the BLACK wire (-) to the **BAT-** pad.
3. **TP4056 Output → ESP32:** Connect **OUT+** to the ESP32's **VIN** pin. Connect **OUT-** to the ESP32's **GND** pin.

> [!CAUTION]
> **Before inserting the 18650 battery:** Double-check the polarity (+ and -) of every connection. If you reverse the battery polarity, the TP4056's protection circuit should save you, but do not rely on it. Always verify before powering on.

---

## Step 10: The Final Wiring Cheat Sheet

Print this and tape it next to your breadboard:

```
╔═══════════════════════════════════════════════════════════╗
║           AAPDA-KADABRA: COMPLETE WIRING MAP              ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  I2C BUS (SHARED):                                        ║
║    GPIO 21 (SDA) ──► BME680 SDA + MPU6050 SDA            ║
║    GPIO 22 (SCL) ──► BME680 SCL + MPU6050 SCL            ║
║                                                           ║
║  UART (SERIAL):                                           ║
║    GPIO 16 (RX2) ◄── PMS5003 TX                          ║
║                                                           ║
║  ANALOG SENSORS:                                          ║
║    GPIO 34 ◄── MQ-135 (Gas/Smoke)                        ║
║    GPIO 35 ◄── Raindrop Sensor                           ║
║    GPIO 32 ◄── Turbidity Sensor                          ║
║    GPIO 33 ◄── Soil Moisture Sensor                      ║
║                                                           ║
║  DIGITAL (HC-SR04):                                       ║
║    GPIO 25 ──► HC-SR04 TRIGGER                           ║
║    GPIO 26 ◄── HC-SR04 ECHO                              ║
║                                                           ║
║  POWER:                                                   ║
║    3V3    ──► RED (+) Power Rail                          ║
║    GND    ──► BLUE (-) Ground Rail                       ║
║    VIN    ◄── TP4056 OUT+ (Solar/Battery)                ║
║    VIN    ──► PMS5003 VCC (needs 5V)                     ║
║                                                           ║
║  ALL SENSOR VCC ──► RED (+) RAIL (3.3V)                  ║
║  ALL SENSOR GND ──► BLUE (-) RAIL                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Step 11: Power On & Verify

1. **Do NOT insert the battery yet.**
2. Plug the ESP32 into your laptop using the USB cable.
3. Open Antigravity IDE → PlatformIO → Serial Monitor (baud rate: 115200).
4. You should see the ESP32 boot up and print gibberish or a boot log.
5. If nothing happens, check that your USB cable is a **data cable** (not a charge-only cable).

**If you see smoke, smell burning, or hear a pop:**
1. **Immediately** unplug the USB cable.
2. Do NOT touch any component (they may be hot).
3. Wait 30 seconds.
4. Check your wiring against this guide — you likely have a wire in the wrong pin.

---

## You Are Done!

Your Aapda-Kadabra hardware node is now fully assembled. The next step is to flash the C++ firmware onto the ESP32 using PlatformIO, which will start reading all 8 sensors and printing their values to the Serial Monitor.

Tell your Hardware Engineer (Member 1) to open Antigravity IDE and ask the agent to write the `main.cpp` sensor reading code. The wiring is ready.
