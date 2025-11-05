import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, Eye, Network } from "lucide-react";

const AIVisualizer = () => {
  return (
    <div className="space-y-6">
      {/* AI Brain Header */}
      <Card className="glass-panel border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl neon-text">
            <Brain className="w-10 h-10 pulse-glow" />
            AI Intelligence Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Real-time visualization of YOLOv8s neural network processing and decision-making logic
          </p>
        </CardContent>
      </Card>

      {/* Neural Network Layers */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="text-secondary">Neural Network Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input Layer */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-right">
                <p className="text-sm font-semibold text-primary">Input Layer</p>
              </div>
              <div className="flex-1 grid grid-cols-8 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-primary/30 rounded border-2 border-primary breathing"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <Eye className="w-6 h-6 text-primary" />
            </div>

            {/* Hidden Layers */}
            {[1, 2, 3].map((layer) => (
              <div key={layer} className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <p className="text-sm font-semibold text-secondary">Layer {layer}</p>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-secondary/20 rounded border border-secondary/50 pulse-glow"
                      style={{ animationDelay: `${(i + layer) * 0.05}s` }}
                    />
                  ))}
                </div>
                <Network className="w-6 h-6 text-secondary" />
              </div>
            ))}

            {/* Output Layer */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-right">
                <p className="text-sm font-semibold text-accent">Output</p>
              </div>
              <div className="flex-1 grid grid-cols-5 gap-3">
                {["Car", "Bus", "Truck", "Bike", "Ambulance"].map((label, i) => (
                  <div
                    key={i}
                    className="h-16 bg-accent/30 rounded-lg border-2 border-accent flex items-center justify-center breathing"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <p className="text-xs font-semibold text-accent">{label}</p>
                  </div>
                ))}
              </div>
              <Cpu className="w-6 h-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detection Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-success/30">
          <CardHeader>
            <CardTitle className="text-success">Detection Confidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Car Detection</span>
                <span className="text-sm font-bold text-success">94%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success neon-glow" style={{ width: "94%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Bus Detection</span>
                <span className="text-sm font-bold text-success">87%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: "87%", boxShadow: "0 0 10px hsl(var(--success))" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Emergency Vehicle</span>
                <span className="text-sm font-bold text-destructive">98%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive pulse-glow" style={{ width: "98%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-primary/30">
          <CardHeader>
            <CardTitle className="neon-text">Model Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/30">
              <span className="text-sm">Inference Time</span>
              <span className="text-xl font-bold text-primary">37ms</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-secondary/30">
              <span className="text-sm">Precision</span>
              <span className="text-xl font-bold text-secondary">91.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/30">
              <span className="text-sm">Recall</span>
              <span className="text-xl font-bold text-accent">88.7%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIVisualizer;
