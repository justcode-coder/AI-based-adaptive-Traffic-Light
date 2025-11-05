import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Car, Video, Wifi, WifiOff } from "lucide-react";
import { useTrafficWebSocket } from "@/hooks/useTrafficWebSocket";

const TrafficMonitor = () => {
  const { data, connected } = useTrafficWebSocket();

  const roadACount = data?.roadA || 0;
  const roadBCount = data?.roadB || 0;
  const currentSignal = data?.currentSignal || "A";
  const timeLeft = data?.timeLeft || 0;
  const logs = data?.logs || ["Waiting for connection..."];
  const videoFrame = data?.videoFrame;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Feed */}
      <Card className="lg:col-span-2 glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between neon-text">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Live YOLOv8 Detection Feed
            </div>
            <div className="flex items-center gap-2">
              {connected ? (
                <>
                  <Wifi className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-destructive" />
                  <span className="text-xs text-destructive">Disconnected</span>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative border-2 border-primary/50 overflow-hidden">
            {videoFrame ? (
              <img 
                src={`data:image/jpeg;base64,${videoFrame}`} 
                alt="Live YOLOv8 Feed" 
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="relative z-10 text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 text-primary pulse-glow" />
                  <p className="text-lg text-muted-foreground">
                    {connected ? "Waiting for video stream..." : "Start Python script to see live feed"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Run: python traffic_server.py</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Counts */}
      <div className="space-y-4">
        <Card className="glass-panel border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">Road A Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Car className="w-12 h-12 text-primary neon-glow" />
              <span className="text-5xl font-bold neon-text">{roadACount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-secondary/30">
          <CardHeader>
            <CardTitle className="text-secondary">Road B Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Car className="w-12 h-12 text-secondary" style={{ filter: "drop-shadow(0 0 10px hsl(var(--secondary)))" }} />
              <span className="text-5xl font-bold text-secondary">{roadBCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-accent/30">
          <CardHeader>
            <CardTitle className="text-accent">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-5xl font-bold text-accent">{roadACount + roadBCount}</span>
          </CardContent>
        </Card>
      </div>

      {/* Signal Status */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="neon-text">Signal Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg">Road A</span>
            <div className={`w-6 h-6 rounded-full ${currentSignal === "A" ? "bg-success neon-glow" : "bg-destructive"}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg">Road B</span>
            <div className={`w-6 h-6 rounded-full ${currentSignal === "B" ? "bg-success neon-glow" : "bg-destructive"}`} />
          </div>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-2">Time Remaining: {timeLeft}s</p>
            <Progress value={(timeLeft / 20) * 100} className="h-2" />
          </div>
          <Badge className="w-full justify-center py-2 bg-primary text-primary-foreground">
            Adaptive Mode Active
          </Badge>
        </CardContent>
      </Card>

      {/* Emergency Alert */}
      <Card className="glass-panel border-destructive/50 bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive pulse-glow">
            <AlertCircle className="w-5 h-5" />
            Emergency Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive font-bold">
            🚑 Ambulance detected on Road B
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Priority Override Engaged (19s remaining)
          </p>
        </CardContent>
      </Card>

      {/* System Log */}
      <Card className="glass-panel border-success/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-success">Status Log Console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/80 rounded-lg p-4 font-mono text-xs space-y-1 h-40 overflow-y-auto border border-success/30">
            {logs.map((log, i) => (
              <p key={i} className="text-success">{log}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficMonitor;
