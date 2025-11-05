import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, Sliders, Network, Heart, FileText, Zap, Brain, Settings, Info } from "lucide-react";
import TrafficMonitor from "./sections/TrafficMonitor";
import Analytics from "./sections/Analytics";
import ManualControl from "./sections/ManualControl";
import SystemOverview from "./sections/SystemOverview";
import SystemHealth from "./sections/SystemHealth";
import DataLogging from "./sections/DataLogging";
import AIVisualizer from "./sections/AIVisualizer";
import SettingsPanel from "./sections/SettingsPanel";
import AboutPage from "./sections/AboutPage";
import WelcomeScreen from "./WelcomeScreen";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("monitor");
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="glass-panel p-6">
          <h1 className="text-4xl md:text-6xl font-bold neon-text text-center mb-2 breathing">
            SimulATE
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground">
            AI-Powered Adaptive Traffic Signal Simulator
          </p>
          <p className="text-center text-sm text-primary/70 mt-2">by Parth</p>
        </div>
      </header>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-panel p-2 w-full flex flex-wrap justify-center gap-2 mb-6 h-auto">
          <TabsTrigger value="monitor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Activity className="w-4 h-4 mr-2" />
            Monitor
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="control" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sliders className="w-4 h-4 mr-2" />
            Control
          </TabsTrigger>
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Network className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Heart className="w-4 h-4 mr-2" />
            Health
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="w-4 h-4 mr-2" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Brain className="w-4 h-4 mr-2" />
            AI Brain
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Info className="w-4 h-4 mr-2" />
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitor">
          <TrafficMonitor />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        <TabsContent value="control">
          <ManualControl />
        </TabsContent>

        <TabsContent value="overview">
          <SystemOverview />
        </TabsContent>

        <TabsContent value="health">
          <SystemHealth />
        </TabsContent>

        <TabsContent value="logs">
          <DataLogging />
        </TabsContent>

        <TabsContent value="ai">
          <AIVisualizer />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>

        <TabsContent value="about">
          <AboutPage />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <div className="glass-panel p-4">
          <p className="text-sm neon-text pulse-glow">
            Made by Parth | SimulATE v1.0 | YOLOv8s + SORT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
