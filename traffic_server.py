"""
SimulATE WebSocket Server
Integrates with your existing YOLOv8 traffic system to stream data to the dashboard.
Add this code to your existing Python script or run it alongside.
"""

import asyncio
import json
import base64
import cv2
import psutil
import time
from datetime import datetime
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Global state - update these from your main traffic script
class TrafficState:
    def __init__(self):
        self.road_a_count = 0
        self.road_b_count = 0
        self.current_signal = 'A'
        self.time_left = 0
        self.start_time = time.time()
        self.fps = 0
        self.frames_processed = 0
        self.vehicles_detected = 0
        self.signal_cycles = 0
        self.emergency_overrides = 0
        self.arduino_connected = False
        self.arduino_port = ""
        self.current_frame = None
        self.logs = []
        self.vehicle_history = []
        self.vehicle_types = {'car': 0, 'bus': 0, 'truck': 0, 'bike': 0}
        self.avg_frame_time = 0

state = TrafficState()

def update_from_your_code(road_a, road_b, signal, time_left, frame=None):
    """
    Call this function from your main traffic script to update the dashboard
    
    Example:
        update_from_your_code(
            road_a=vehicle_counts['A'],
            road_b=vehicle_counts['B'],
            signal=current_green_road,
            time_left=remaining_time,
            frame=annotated_frame
        )
    """
    state.road_a_count = road_a
    state.road_b_count = road_b
    state.current_signal = signal
    state.time_left = time_left
    state.current_frame = frame
    state.frames_processed += 1

def add_log(message):
    """Add a log entry"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    log_entry = f"[{timestamp}] {message}"
    state.logs.append(log_entry)
    if len(state.logs) > 50:  # Keep last 50 logs
        state.logs.pop(0)

def set_arduino_status(connected, port=""):
    """Update Arduino connection status"""
    state.arduino_connected = connected
    state.arduino_port = port

def get_system_metrics():
    """Get real-time system metrics"""
    cpu_percent = psutil.cpu_percent(interval=0.1)
    
    # GPU usage (requires nvidia-smi for NVIDIA GPUs)
    gpu_percent = 0
    try:
        import pynvml
        pynvml.nvmlInit()
        handle = pynvml.nvmlDeviceGetHandleByIndex(0)
        info = pynvml.nvmlDeviceGetUtilizationRates(handle)
        gpu_percent = info.gpu
    except:
        gpu_percent = 0
    
    return cpu_percent, gpu_percent

async def broadcast_data():
    """Continuously broadcast data to connected clients"""
    while True:
        try:
            cpu, gpu = get_system_metrics()
            uptime = time.time() - state.start_time
            
            # Encode current frame to base64
            frame_data = None
            if state.current_frame is not None:
                _, buffer = cv2.imencode('.jpg', state.current_frame)
                frame_data = base64.b64encode(buffer).decode('utf-8')
            
            # Update vehicle history
            current_time = datetime.now().strftime("%H:%M")
            if len(state.vehicle_history) == 0 or state.vehicle_history[-1]['time'] != current_time:
                state.vehicle_history.append({
                    'time': current_time,
                    'roadA': state.road_a_count,
                    'roadB': state.road_b_count
                })
                if len(state.vehicle_history) > 20:
                    state.vehicle_history.pop(0)
            
            data = {
                'roadA': state.road_a_count,
                'roadB': state.road_b_count,
                'currentSignal': state.current_signal,
                'timeLeft': state.time_left,
                'systemUptime': int(uptime),
                'cpuUsage': int(cpu),
                'gpuUsage': int(gpu),
                'fps': state.fps,
                'avgFrameTime': state.avg_frame_time,
                'framesProcessed': state.frames_processed,
                'vehiclesDetected': state.vehicles_detected,
                'signalCycles': state.signal_cycles,
                'emergencyOverrides': state.emergency_overrides,
                'arduinoConnected': state.arduino_connected,
                'arduinoPort': state.arduino_port,
                'videoFrame': frame_data,
                'logs': state.logs[-10:],  # Last 10 logs
                'vehicleHistory': state.vehicle_history,
                'vehicleTypes': state.vehicle_types
            }
            
            socketio.emit('traffic_data', data)
            await asyncio.sleep(0.1)  # Update 10 times per second
            
        except Exception as e:
            print(f"Error broadcasting data: {e}")
            await asyncio.sleep(1)

@socketio.on('connect')
def handle_connect():
    print('✅ Client connected to WebSocket')
    add_log("Dashboard connected")

@socketio.on('disconnect')
def handle_disconnect():
    print('❌ Client disconnected')
    add_log("Dashboard disconnected")

@socketio.on('message')
def handle_message(data):
    """Handle commands from dashboard"""
    try:
        message = json.loads(data) if isinstance(data, str) else data
        command = message.get('command', '')
        print(f"📥 Received command: {command}")
        add_log(f"Command received: {command}")
        
        # TODO: Integrate these commands with your traffic logic
        if command == 'FORCE_GREEN_A':
            # Your code to force signal A green
            add_log("Forcing Road A to GREEN")
            pass
        elif command == 'FORCE_GREEN_B':
            # Your code to force signal B green
            add_log("Forcing Road B to GREEN")
            pass
        elif command == 'TRIGGER_EMERGENCY':
            add_log("Emergency override triggered")
            state.emergency_overrides += 1
            pass
        elif command == 'RESET':
            add_log("System reset initiated")
            pass
        elif command == 'PAUSE':
            add_log("System paused")
            pass
        elif command == 'RESUME':
            add_log("System resumed")
            pass
            
    except Exception as e:
        print(f"Error handling command: {e}")

def start_server():
    """Start the WebSocket server"""
    print("🚀 Starting SimulATE WebSocket Server...")
    print("📡 Server running on ws://localhost:5000/ws")
    print("🌐 Dashboard should connect automatically")
    
    # Run background task
    socketio.start_background_task(lambda: asyncio.run(broadcast_data()))
    
    # Start Flask server
    socketio.run(app, host='0.0.0.0', port=5000, debug=False)

# =============================================================================
# INTEGRATION WITH YOUR EXISTING CODE
# =============================================================================

"""
HOW TO INTEGRATE THIS WITH YOUR EXISTING PYTHON SCRIPT:

1. Add these imports to your main script:
   from traffic_server import state, update_from_your_code, add_log, set_arduino_status, start_server
   import threading

2. Start the server in a background thread at the beginning of your script:
   server_thread = threading.Thread(target=start_server, daemon=True)
   server_thread.start()

3. In your main detection loop, after getting vehicle counts, call:
   update_from_your_code(
       road_a=vehicle_counts['A'],
       road_b=vehicle_counts['B'],
       signal=current_green_road,
       time_left=time_remaining,
       frame=annotated_frame  # The frame with bounding boxes
   )

4. Update Arduino status when connecting:
   if ser:
       set_arduino_status(True, SERIAL_PORT)
   else:
       set_arduino_status(False, "")

5. Add logs throughout your code:
   add_log(f"Detected {count} vehicles on Road A")
   add_log("Switching to Road B")
   add_log("Emergency vehicle detected!")

6. Update vehicle type counts after detection:
   state.vehicle_types['car'] = car_count
   state.vehicle_types['bus'] = bus_count
   # etc.

7. Update FPS and frame time:
   state.fps = current_fps
   state.avg_frame_time = frame_time_ms
"""

if __name__ == '__main__':
    # Test server without main traffic system
    print("Running in TEST mode - generating dummy data")
    
    def dummy_data_generator():
        import random
        while True:
            state.road_a_count = random.randint(5, 15)
            state.road_b_count = random.randint(5, 15)
            state.current_signal = 'A' if time.time() % 20 < 10 else 'B'
            state.time_left = int(10 - (time.time() % 10))
            state.fps = random.randint(25, 30)
            state.avg_frame_time = random.randint(35, 45)
            add_log(f"Detected {state.road_a_count} vehicles on Road A")
            time.sleep(2)
    
    import threading
    dummy_thread = threading.Thread(target=dummy_data_generator, daemon=True)
    dummy_thread.start()
    
    start_server()
