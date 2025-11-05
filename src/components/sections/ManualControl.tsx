import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, AlertTriangle, RotateCcw, Pause, Play, ArrowUp, Zap, CheckCircle, XCircle, Wifi, WifiOff } from "lucide-react";
import { useTrafficWebSocket } from "@/hooks/useTrafficWebSocket";
import { useToast } from "@/hooks/use-toast";

const ManualControl = () => {
  const { data, connected, sendCommand } = useTrafficWebSocket();
  const { toast } = useToast();
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [emergencyDetection, setEmergencyDetection] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleAction = (cmd: string) => {
    if (!connected) {
      toast({
        title: "Not Connected",
        description: "Please start the Python script first",
        variant: "destructive"
      });
      return;
    }
    sendCommand(cmd);
    toast({
      title: "Command Sent",
      description: `Executed: ${cmd}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Control Buttons */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="neon-text">Manual Control</span>
            {connected ? (
              <span className="text-xs text-success flex items-center gap-1">
                <Wifi className="w-3 h-3" /> Connected
              </span>
            ) : (
              <span className="text-xs text-destructive flex items-center gap-1">
                <WifiOff className="w-3 h-3" /> Disconnected
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleAction("ADD_VEHICLE_A")}
            className="w-full bg-primary hover:bg-primary/80 neon-glow"
            size="lg"
            disabled={!connected}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Vehicle (Road A)
          </Button>

          <Button
            onClick={() => handleAction("ADD_VEHICLE_B")}
            className="w-full bg-secondary hover:bg-secondary/80"
            size="lg"
            style={{ boxShadow: "0 0 20px rgba(255,0,110,0.5)" }}
            disabled={!connected}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Vehicle (Road B)
          </Button>

          <Button
            onClick={() => handleAction("TRIGGER_EMERGENCY")}
            className="w-full bg-destructive hover:bg-destructive/80"
            size="lg"
            style={{ boxShadow: "0 0 20px rgba(255,0,0,0.5)" }}
            disabled={!connected}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Trigger Emergency
          </Button>

          <Button
            onClick={() => handleAction("RESET")}
            className="w-full bg-accent hover:bg-accent/80"
            size="lg"
            style={{ boxShadow: "0 0 20px hsl(var(--accent) / 0.5)" }}
            disabled={!connected}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset System
          </Button>

          <Button
            onClick={() => {
              setIsPaused(!isPaused);
              handleAction(isPaused ? "RESUME" : "PAUSE");
            }}
            className="w-full bg-muted hover:bg-muted/80"
            size="lg"
            disabled={!connected}
          >
            {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
            {isPaused ? "Resume" : "Pause"} Simulation
          </Button>
        </CardContent>
      </Card>

      {/* Force Signal Controls */}
      <Card className="glass-panel border-success/30">
        <CardHeader>
          <CardTitle className="text-success">Force Signal Override</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleAction("FORCE_GREEN_A")}
            className="w-full bg-success hover:bg-success/80"
            size="lg"
            style={{ boxShadow: "0 0 20px hsl(var(--success) / 0.5)" }}
            disabled={!connected}
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Force Green (Road A)
          </Button>

          <Button
            onClick={() => handleAction("FORCE_GREEN_B")}
            className="w-full bg-success hover:bg-success/80"
            size="lg"
            style={{ boxShadow: "0 0 20px hsl(var(--success) / 0.5)" }}
            disabled={!connected}
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Force Green (Road B)
          </Button>

          <div className="pt-4 border-t border-primary/30">
            <p className="text-sm text-muted-foreground mb-4">⚠️ Warning: Manual override disables adaptive logic</p>
          </div>
        </CardContent>
      </Card>

      {/* Mode Toggles */}
      <Card className="glass-panel border-accent/30">
        <CardHeader>
          <CardTitle className="text-accent">System Modes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="adaptive" className="text-lg">Enable Adaptive Mode</Label>
            <Switch
              id="adaptive"
              checked={adaptiveMode}
              onCheckedChange={setAdaptiveMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emergency" className="text-lg">Enable Emergency Detection</Label>
            <Switch
              id="emergency"
              checked={emergencyDetection}
              onCheckedChange={setEmergencyDetection}
            />
          </div>

          {adaptiveMode && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Adaptive mode: AI adjusts signal timing based on traffic
              </p>
            </div>
          )}

          {emergencyDetection && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Emergency detection: Ambulances get priority
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Arduino Connection Status */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className={data?.arduinoConnected ? "text-success" : "text-destructive"}>
            Arduino Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-lg font-semibold">
                Serial: {data?.arduinoPort || "Not Connected"}
              </p>
              <p className="text-sm text-muted-foreground">
                {data?.arduinoConnected ? "Arduino Mega 2560" : "Unknown"}
              </p>
            </div>
            {data?.arduinoConnected ? (
              <CheckCircle className="w-12 h-12 text-success neon-glow" />
            ) : (
              <XCircle className="w-12 h-12 text-destructive" />
            )}
          </div>
          <p className={`text-center mt-4 font-semibold ${data?.arduinoConnected ? "text-success" : "text-destructive"}`}>
            {data?.arduinoConnected ? "✅ Connected" : "❌ Disconnected"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualControl;
