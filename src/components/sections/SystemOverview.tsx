import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Camera, Brain, Cpu, Zap } from "lucide-react";

const SystemOverview = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="neon-text text-2xl">System Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-8">
            {/* ESP32-CAM */}
            <div className="flex flex-col items-center breathing">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary neon-glow">
                <Camera className="w-12 h-12 text-primary" />
              </div>
              <p className="mt-4 text-lg font-semibold text-primary">ESP32-CAM</p>
              <p className="text-sm text-muted-foreground">Video Stream</p>
            </div>

            <ArrowRight className="w-8 h-8 text-primary pulse-glow rotate-90 md:rotate-0" />

            {/* YOLOv8 */}
            <div className="flex flex-col items-center breathing">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center border-4 border-secondary"
                   style={{ boxShadow: "0 0 30px rgba(255,0,110,0.5)" }}>
                <Brain className="w-12 h-12 text-secondary" />
              </div>
              <p className="mt-4 text-lg font-semibold text-secondary">YOLOv8 AI</p>
              <p className="text-sm text-muted-foreground">Object Detection</p>
            </div>

            <ArrowRight className="w-8 h-8 text-secondary pulse-glow rotate-90 md:rotate-0" />

            {/* Python Logic */}
            <div className="flex flex-col items-center breathing">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-accent"
                   style={{ boxShadow: "0 0 30px hsl(var(--accent) / 0.5)" }}>
                <Cpu className="w-12 h-12 text-accent" />
              </div>
              <p className="mt-4 text-lg font-semibold text-accent">Python Logic</p>
              <p className="text-sm text-muted-foreground">Decision Engine</p>
            </div>

            <ArrowRight className="w-8 h-8 text-accent pulse-glow rotate-90 md:rotate-0" />

            {/* Arduino */}
            <div className="flex flex-col items-center breathing">
              <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center border-4 border-success"
                   style={{ boxShadow: "0 0 30px hsl(var(--success) / 0.5)" }}>
                <Zap className="w-12 h-12 text-success" />
              </div>
              <p className="mt-4 text-lg font-semibold text-success">Arduino Mega</p>
              <p className="text-sm text-muted-foreground">LED Control</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">Input Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 neon-glow" />
              <p className="text-sm">ESP32-CAM captures live video stream at 27 FPS</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 neon-glow" />
              <p className="text-sm">YOLOv8s detects vehicles and classifies types</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 neon-glow" />
              <p className="text-sm">SORT tracker maintains vehicle IDs across frames</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-secondary/30">
          <CardHeader>
            <CardTitle className="text-secondary">Decision Logic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px rgba(255,0,110,0.8)" }} />
              <p className="text-sm">Python calculates optimal green time per road</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px rgba(255,0,110,0.8)" }} />
              <p className="text-sm">Emergency vehicle detection triggers override</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px rgba(255,0,110,0.8)" }} />
              <p className="text-sm">Fairness algorithm prevents road starvation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-accent/30">
          <CardHeader>
            <CardTitle className="text-accent">Output Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }} />
              <p className="text-sm">Serial commands sent to Arduino Mega</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }} />
              <p className="text-sm">Digital pins control RED/YELLOW/GREEN LEDs</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"
                   style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }} />
              <p className="text-sm">Real-time feedback for timing adjustments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-success/30">
          <CardHeader>
            <CardTitle className="text-success">Safety Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 neon-glow" />
              <p className="text-sm">Minimum 5s green time per cycle</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 neon-glow" />
              <p className="text-sm">2s yellow warning before red transition</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 neon-glow" />
              <p className="text-sm">Fallback to fixed timing if AI fails</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemOverview;
