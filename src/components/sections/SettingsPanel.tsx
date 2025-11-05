import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const SettingsPanel = () => {
  const [minGreen, setMinGreen] = useState([5]);
  const [maxGreen, setMaxGreen] = useState([30]);
  const [timePerVehicle, setTimePerVehicle] = useState("3");
  const [yellowDelay, setYellowDelay] = useState("2");
  const [enableFairness, setEnableFairness] = useState(true);
  const [enableEmergency, setEnableEmergency] = useState(true);
  const [enableFallback, setEnableFallback] = useState(true);

  const handleSave = () => {
    toast.success("Configuration Saved", {
      description: "All settings have been applied successfully",
    });
  };

  const handleReset = () => {
    setMinGreen([5]);
    setMaxGreen([30]);
    setTimePerVehicle("3");
    setYellowDelay("2");
    setEnableFairness(true);
    setEnableEmergency(true);
    setEnableFallback(true);
    toast.info("Settings Reset", {
      description: "All settings restored to default values",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timing Settings */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="neon-text">Timing Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="minGreen" className="text-lg">
              Minimum Green Time: {minGreen[0]}s
            </Label>
            <Slider
              id="minGreen"
              min={3}
              max={15}
              step={1}
              value={minGreen}
              onValueChange={setMinGreen}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGreen" className="text-lg">
              Maximum Green Time: {maxGreen[0]}s
            </Label>
            <Slider
              id="maxGreen"
              min={20}
              max={60}
              step={5}
              value={maxGreen}
              onValueChange={setMaxGreen}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timePerVehicle">Time per Vehicle (seconds)</Label>
              <Input
                id="timePerVehicle"
                type="number"
                value={timePerVehicle}
                onChange={(e) => setTimePerVehicle(e.target.value)}
                className="glass-panel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yellowDelay">Yellow Delay (seconds)</Label>
              <Input
                id="yellowDelay"
                type="number"
                value={yellowDelay}
                onChange={(e) => setYellowDelay(e.target.value)}
                className="glass-panel"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="text-secondary">System Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
            <Checkbox
              id="fairness"
              checked={enableFairness}
              onCheckedChange={(checked) => setEnableFairness(checked as boolean)}
            />
            <Label htmlFor="fairness" className="text-base cursor-pointer">
              Enable Fairness Switching
              <p className="text-sm text-muted-foreground mt-1">
                Prevents one road from being starved of green time
              </p>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
            <Checkbox
              id="emergency"
              checked={enableEmergency}
              onCheckedChange={(checked) => setEnableEmergency(checked as boolean)}
            />
            <Label htmlFor="emergency" className="text-base cursor-pointer">
              Enable Emergency Detection
              <p className="text-sm text-muted-foreground mt-1">
                Gives priority to ambulances and emergency vehicles
              </p>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-accent/10 rounded-lg border border-accent/30">
            <Checkbox
              id="fallback"
              checked={enableFallback}
              onCheckedChange={(checked) => setEnableFallback(checked as boolean)}
            />
            <Label htmlFor="fallback" className="text-base cursor-pointer">
              Enable Fallback Mode
              <p className="text-sm text-muted-foreground mt-1">
                Switches to fixed timing if camera or AI fails
              </p>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-success hover:bg-success/80"
          size="lg"
          style={{ boxShadow: "0 0 20px hsl(var(--success) / 0.5)" }}
        >
          <Save className="w-5 h-5 mr-2" />
          Save Configuration
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="glass-panel"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
