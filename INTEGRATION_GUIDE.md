# SimulATE Dashboard Integration Guide

## 📋 Required Downloads & Installation

### 1. Python Packages
Install these packages in your Python environment:

```bash
pip install flask flask-socketio flask-cors psutil opencv-python ultralytics pyserial
```

**Optional (for GPU monitoring):**
```bash
pip install pynvml  # For NVIDIA GPU usage monitoring
```

### 2. Your Existing Files
You already have:
- ✅ `5_😂😂😂chat_gpt_befor_upgrades.py` (Your YOLOv8 traffic script)
- ✅ `1mainrudino.ino` (Arduino code)
- ✅ `yolov8s.pt` (YOLO model weights)
- ✅ Video file for testing

---

## 🔧 Integration Steps

### Step 1: Add WebSocket Server to Your Python Script

**Option A: Modify Your Existing Script**

Add this at the top of your `5_😂😂😂chat_gpt_befor_upgrades.py`:

```python
from traffic_server import state, update_from_your_code, add_log, set_arduino_status, start_server
import threading

# Start WebSocket server in background
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
print("🌐 Dashboard server started - open your browser!")
```

**Option B: Run Separately (Easier for Testing)**

1. Keep your existing script as-is
2. Run `traffic_server.py` in a separate terminal window
3. Manually update the `state` variables from your script

---

### Step 2: Update Arduino Connection Status

Find this section in your code (around line 37-43):

```python
ser = None
try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(2)
    print(f"✅ Serial connected: {SERIAL_PORT}")
    set_arduino_status(True, SERIAL_PORT)  # ADD THIS LINE
except serial.SerialException as e:
    print(f"⚠️ Serial error: {e}")
    set_arduino_status(False, "")  # ADD THIS LINE
```

---

### Step 3: Stream Data in Your Main Loop

In your main detection loop (around line 156-180), add these updates:

```python
# After getting vehicle counts from detection
road_a_count, road_b_count, annotated_frame = get_vehicle_counts_from_frame(frame)

# Update dashboard (ADD THIS)
update_from_your_code(
    road_a=vehicle_counts['A'],
    road_b=vehicle_counts['B'], 
    signal=current_green_road,
    time_left=int(time_remaining) if time_remaining > 0 else 0,
    frame=annotated_frame  # Frame with bounding boxes
)

# Update metrics (ADD THIS)
state.fps = int(1.0 / frame_time) if frame_time > 0 else 0
state.avg_frame_time = int(frame_time * 1000)  # Convert to ms
state.vehicles_detected = vehicle_counts['A'] + vehicle_counts['B']
```

---

### Step 4: Add Logging Throughout Your Code

Replace your `print()` statements with `add_log()`:

```python
# Instead of:
print(f"🚦 Road {new_green} is now GREEN")

# Use:
add_log(f"🚦 Road {new_green} is now GREEN")
```

---

### Step 5: Update Vehicle Type Counts

After detection (around line 90-100), count vehicle types:

```python
# After detection, categorize vehicles
car_count = sum(1 for cls in classes if cls == 2)  # car
bus_count = sum(1 for cls in classes if cls == 5)  # bus
truck_count = sum(1 for cls in classes if cls == 7)  # truck
bike_count = sum(1 for cls in classes if cls == 3)  # motorcycle

# Update dashboard
state.vehicle_types = {
    'car': car_count,
    'bus': bus_count, 
    'truck': truck_count,
    'bike': bike_count
}
```

---

### Step 6: Handle Dashboard Commands

Add this function to handle commands from the dashboard:

```python
def handle_dashboard_command(command):
    """Process commands from the web dashboard"""
    if command == 'FORCE_GREEN_A':
        switch_lights('A')
        add_log("Dashboard: Forced Road A to GREEN")
    elif command == 'FORCE_GREEN_B':
        switch_lights('B')
        add_log("Dashboard: Forced Road B to GREEN")
    elif command == 'TRIGGER_EMERGENCY':
        # Your emergency logic here
        add_log("Dashboard: Emergency triggered")
    elif command == 'RESET':
        vehicle_counts['A'] = 0
        vehicle_counts['B'] = 0
        add_log("Dashboard: System reset")
```

---

## 🚀 Running the System

### Method 1: Integrated (Recommended)
```bash
# Everything runs in one script
python 5_😂😂😂chat_gpt_befor_upgrades.py
```

The dashboard will automatically connect to `ws://localhost:5000/ws`

### Method 2: Separate Processes (For Testing)
```bash
# Terminal 1: Run the WebSocket server
python traffic_server.py

# Terminal 2: Run your traffic detection (with manual state updates)
python 5_😂😂😂chat_gpt_befor_upgrades.py
```

---

## 🌐 Accessing the Dashboard

1. **Open your browser** to the Lovable preview URL
2. The dashboard will automatically connect when Python is running
3. Look for the **"Connected"** indicator in the top right

---

## ✅ Verification Checklist

- [ ] Python packages installed (`flask`, `flask-socketio`, etc.)
- [ ] Arduino connected and detected (check COM port)
- [ ] `traffic_server.py` file created
- [ ] WebSocket server started (either integrated or separate)
- [ ] Dashboard shows "Connected" status
- [ ] Video feed appears on dashboard
- [ ] Vehicle counts update in real-time
- [ ] Signal timing updates
- [ ] System metrics show (CPU, GPU, FPS)
- [ ] Manual controls work (Force Green A/B)
- [ ] Logs appear in the console

---

## 🐛 Troubleshooting

### Dashboard shows "Disconnected"
- ✅ Check if Python script is running
- ✅ Verify port 5000 is not blocked by firewall
- ✅ Check console for WebSocket connection errors

### Video feed not showing
- ✅ Ensure `frame` is being passed to `update_from_your_code()`
- ✅ Check if video file path is correct
- ✅ Verify camera is accessible

### Arduino not connecting
- ✅ Check COM port number (currently COM7)
- ✅ Upload Arduino sketch to board first
- ✅ Verify USB cable connection
- ✅ Check if another program is using the serial port

### Controls not working
- ✅ Ensure `handle_message()` in server is processing commands
- ✅ Check browser console for errors
- ✅ Verify WebSocket connection is established

---

## 📝 Notes

- **Frame Rate**: Dashboard updates 10x per second for smooth video
- **Log Limit**: Only last 50 logs are kept to prevent memory issues
- **History**: Vehicle counts are logged every minute for charts
- **Compatibility**: Works on Windows, macOS, and Linux

---

## 🎯 Quick Test Without Arduino

To test the dashboard without hardware:

```python
# Comment out Arduino connection
# ser = serial.Serial(...)

# Set manual values for testing
set_arduino_status(False, "COM7 (Simulated)")
state.road_a_count = 10
state.road_b_count = 8
```

---

## 📞 Need Help?

If something isn't working:
1. Check the browser console (F12) for errors
2. Check Python terminal for error messages
3. Verify all packages are installed correctly
4. Make sure ports aren't blocked by firewall
