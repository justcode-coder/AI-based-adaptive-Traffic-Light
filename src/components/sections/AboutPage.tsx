import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Camera, Zap, Code } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="glass-panel border-primary/30 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <CardContent className="p-12 text-center">
          <h1 className="text-6xl font-bold neon-text mb-4 breathing">SimulATE</h1>
          <p className="text-3xl text-secondary mb-6">AI-Powered Adaptive Traffic Signal Simulator</p>
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6" />
          <p className="text-2xl text-accent mb-2">Developed by Parth</p>
          <p className="text-xl text-muted-foreground">Version 1.0 | 2024</p>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="text-secondary text-2xl">Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <Brain className="w-10 h-10 text-primary neon-glow flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">YOLOv8s</h3>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art object detection model for real-time vehicle classification and counting
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <Brain className="w-10 h-10 text-secondary flex-shrink-0"
                     style={{ filter: "drop-shadow(0 0 10px hsl(var(--secondary)))" }} />
              <div>
                <h3 className="font-bold text-lg text-secondary mb-2">SORT Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Simple Online and Realtime Tracking algorithm for maintaining vehicle IDs across frames
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg border border-accent/30">
              <Camera className="w-10 h-10 text-accent flex-shrink-0"
                      style={{ filter: "drop-shadow(0 0 10px hsl(var(--accent)))" }} />
              <div>
                <h3 className="font-bold text-lg text-accent mb-2">ESP32-CAM</h3>
                <p className="text-sm text-muted-foreground">
                  Compact camera module providing live video stream for AI processing at 27 FPS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-success/10 rounded-lg border border-success/30">
              <Zap className="w-10 h-10 text-success neon-glow flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-success mb-2">Arduino Mega</h3>
                <p className="text-sm text-muted-foreground">
                  Microcontroller for signal control, managing RGB LEDs for each traffic light
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass-panel border-accent/30">
        <CardHeader>
          <CardTitle className="text-accent text-2xl">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Real-time vehicle detection and classification using YOLOv8s",
              "Adaptive signal timing based on traffic density",
              "Emergency vehicle priority override system",
              "Multi-road fairness algorithm to prevent starvation",
              "Live dashboard with analytics and monitoring",
              "Manual control and testing capabilities",
              "Fallback mode for system reliability",
              "Data logging and export functionality",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 neon-glow flex-shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credits */}
      <Card className="glass-panel border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="neon-text text-2xl flex items-center gap-3">
            <Code className="w-6 h-6" />
            Project Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <p className="text-xl text-primary breathing mb-4">Developed & Designed by</p>
            <p className="text-5xl font-bold neon-text mb-6">PARTH</p>
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6" />
            <p className="text-lg text-muted-foreground mb-2">A passion project combining</p>
            <p className="text-lg text-secondary">AI • Computer Vision • IoT • Traffic Engineering</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-2xl font-bold text-primary">2024</p>
              <p className="text-sm text-muted-foreground mt-1">Year</p>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <p className="text-2xl font-bold text-secondary">v1.0</p>
              <p className="text-sm text-muted-foreground mt-1">Version</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
