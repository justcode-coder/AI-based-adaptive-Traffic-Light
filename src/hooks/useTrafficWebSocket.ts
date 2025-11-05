import { useEffect, useState, useCallback } from 'react';

export interface TrafficData {
  roadA: number;
  roadB: number;
  currentSignal: 'A' | 'B';
  timeLeft: number;
  systemUptime: number;
  cpuUsage: number;
  gpuUsage: number;
  fps: number;
  avgFrameTime: number;
  framesProcessed: number;
  vehiclesDetected: number;
  signalCycles: number;
  emergencyOverrides: number;
  arduinoConnected: boolean;
  arduinoPort: string;
  videoFrame?: string; // base64 encoded frame
  logs: string[];
  vehicleHistory: Array<{ time: string; roadA: number; roadB: number }>;
  vehicleTypes: { car: number; bus: number; truck: number; bike: number };
}

const WS_URL = 'ws://localhost:5000/ws';

export const useTrafficWebSocket = () => {
  const [data, setData] = useState<TrafficData | null>(null);
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      try {
        socket = new WebSocket(WS_URL);
        
        socket.onopen = () => {
          console.log('✅ Connected to Python traffic system');
          setConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data);
            setData(newData);
          } catch (e) {
            console.error('Error parsing WebSocket data:', e);
          }
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
          console.log('❌ Disconnected from Python traffic system');
          setConnected(false);
          // Attempt to reconnect after 3 seconds
          reconnectTimeout = setTimeout(connect, 3000);
        };

        setWs(socket);
      } catch (error) {
        console.error('Failed to connect:', error);
        reconnectTimeout = setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  const sendCommand = useCallback((command: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ command }));
      console.log('📤 Sent command:', command);
    } else {
      console.warn('WebSocket not connected');
    }
  }, [ws]);

  return { data, connected, sendCommand };
};
