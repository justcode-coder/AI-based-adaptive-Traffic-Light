import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Zap, Clock, TrendingUp } from "lucide-react";
import { useTrafficWebSocket } from "@/hooks/useTrafficWebSocket";

const SystemHealth = () => {
  const { data } = useTrafficWebSocket();

  const fps = data?.fps || 0;
  const cpuUsage = data?.cpuUsage || 0;
  const gpuUsage = data?.gpuUsage || 0;
  const avgFrameTime = data?.avgFrameTime || 0;
  
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const uptime = formatUptime(data?.systemUptime || 0);
  const framesProcessed = data?.framesProcessed || 0;
  const vehiclesDetected = data?.vehiclesDetected || 0;
  const signalCycles = data?.signalCycles || 0;
  const emergencyOverrides = data?.emergencyOverrides || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* FPS Display */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="w-5 h-5" />
            YOLOv8 Inference Speed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold neon-text breathing">{fps}</div>
            <p className="text-2xl mt-2 text-muted-foreground">FPS</p>
            <p className="text-sm text-success mt-4">✓ Optimal Performance</p>
          </div>
        </CardContent>
      </Card>

      {/* CPU Usage */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Zap className="w-5 h-5" />
            CPU Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-secondary">{cpuUsage}%</div>
          </div>
          <Progress value={cpuUsage} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </CardContent>
      </Card>

      {/* GPU Usage */}
      <Card className="glass-panel border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <TrendingUp className="w-5 h-5" />
            GPU Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-accent">{gpuUsage}%</div>
          </div>
          <Progress value={gpuUsage} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Idle</span>
            <span>Max</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Frame Time */}
      <Card className="glass-panel border-success/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Clock className="w-5 h-5" />
            Average Frame Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-success neon-glow">{avgFrameTime}</div>
            <p className="text-2xl mt-2 text-muted-foreground">milliseconds</p>
            <p className="text-sm text-success/70 mt-4">Real-time processing</p>
          </div>
        </CardContent>
      </Card>

      {/* System Uptime */}
      <Card className="glass-panel border-primary/30 md:col-span-2">
        <CardHeader>
          <CardTitle className="neon-text">System Uptime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-7xl font-bold text-primary pulse-glow font-mono">{uptime}</div>
            <p className="text-xl mt-4 text-muted-foreground">HH:MM:SS</p>
            <p className="text-sm text-primary/70 mt-2">Running since 12:00:00</p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="glass-panel border-primary/30 lg:col-span-3">
        <CardHeader>
          <CardTitle className="neon-text">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-3xl font-bold text-primary">{framesProcessed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">Frames Processed</p>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <p className="text-3xl font-bold text-secondary">{vehiclesDetected}</p>
              <p className="text-sm text-muted-foreground mt-2">Vehicles Detected</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-3xl font-bold text-accent">{signalCycles}</p>
              <p className="text-sm text-muted-foreground mt-2">Signal Cycles</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/30">
              <p className="text-3xl font-bold text-success">{emergencyOverrides}</p>
              <p className="text-sm text-muted-foreground mt-2">Emergency Overrides</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;
