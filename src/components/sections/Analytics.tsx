import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTrafficWebSocket } from "@/hooks/useTrafficWebSocket";

const Analytics = () => {
  const { data } = useTrafficWebSocket();

  const vehicleData = data?.vehicleHistory || [
    { time: "12:00", roadA: 10, roadB: 8 },
    { time: "12:05", roadA: 12, roadB: 6 },
    { time: "12:10", roadA: 8, roadB: 10 },
    { time: "12:15", roadA: 15, roadB: 9 },
    { time: "12:20", roadA: 11, roadB: 12 },
  ];

  const signalData = [
    { cycle: "Cycle 1", greenA: 20, redA: 15, greenB: 15, redB: 20 },
    { cycle: "Cycle 2", greenA: 25, redA: 18, greenB: 18, redB: 25 },
    { cycle: "Cycle 3", greenA: 22, redA: 16, greenB: 16, redB: 22 },
  ];

  const types = data?.vehicleTypes || { car: 45, bus: 15, truck: 20, bike: 20 };
  const total = types.car + types.bus + types.truck + types.bike;
  const vehicleTypes = [
    { name: "Car", value: types.car, color: "hsl(var(--primary))" },
    { name: "Bus", value: types.bus, color: "hsl(var(--secondary))" },
    { name: "Truck", value: types.truck, color: "hsl(var(--accent))" },
    { name: "Bike", value: types.bike, color: "hsl(var(--success))" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Vehicle Count Over Time */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="neon-text">Vehicle Count Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vehicleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
              <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--primary))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="roadA"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="Road A"
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="roadB"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                name="Road B"
                dot={{ fill: "hsl(var(--secondary))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Signal Duration */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="text-secondary">Signal Duration per Cycle</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
              <XAxis dataKey="cycle" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--secondary))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="greenA" fill="hsl(var(--success))" name="Green A" />
              <Bar dataKey="redA" fill="hsl(var(--destructive))" name="Red A" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vehicle Type Distribution */}
      <Card className="glass-panel border-accent/30">
        <CardHeader>
          <CardTitle className="text-accent">Vehicle Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Average Waiting Time */}
      <Card className="glass-panel border-success/30">
        <CardHeader>
          <CardTitle className="text-success">Average Waiting Time</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="text-8xl font-bold text-success neon-glow breathing">24.5</div>
            <p className="text-2xl mt-4 text-muted-foreground">seconds</p>
            <p className="text-sm text-success/70 mt-2">↓ 15% from previous hour</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
