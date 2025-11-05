import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, FileText, Download } from "lucide-react";
import { toast } from "sonner";

const sessionData = [
  { time: "12:03:10", road: "A", count: 12, duration: 20, emergency: "No" },
  { time: "12:03:30", road: "B", count: 8, duration: 15, emergency: "No" },
  { time: "12:03:45", road: "A", count: 15, duration: 25, emergency: "No" },
  { time: "12:04:10", road: "B", count: 6, duration: 20, emergency: "Yes" },
  { time: "12:04:30", road: "A", count: 11, duration: 18, emergency: "No" },
];

const DataLogging = () => {
  const handleSave = () => {
    toast.success("Session Saved", {
      description: "Current session data has been saved successfully",
    });
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}`, {
      description: "Download will begin shortly",
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/80 neon-glow"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Current Session
        </Button>
        <Button
          onClick={() => handleExport("CSV")}
          className="bg-success hover:bg-success/80"
          style={{ boxShadow: "0 0 20px hsl(var(--success) / 0.5)" }}
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button
          onClick={() => handleExport("PDF")}
          className="bg-destructive hover:bg-destructive/80"
          style={{ boxShadow: "0 0 20px hsl(var(--destructive) / 0.5)" }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Current Session Data */}
      <Card className="glass-panel border-primary/30">
        <CardHeader>
          <CardTitle className="neon-text">Current Session Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/30">
                  <TableHead className="text-primary">Time</TableHead>
                  <TableHead className="text-primary">Road</TableHead>
                  <TableHead className="text-primary">Vehicle Count</TableHead>
                  <TableHead className="text-primary">Green Duration (s)</TableHead>
                  <TableHead className="text-primary">Emergency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionData.map((row, i) => (
                  <TableRow key={i} className="border-primary/10 hover:bg-primary/5">
                    <TableCell className="font-mono">{row.time}</TableCell>
                    <TableCell>
                      <span className={row.road === "A" ? "text-primary" : "text-secondary"}>
                        Road {row.road}
                      </span>
                    </TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.duration}s</TableCell>
                    <TableCell>
                      {row.emergency === "Yes" ? (
                        <span className="text-destructive font-semibold">🚨 Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Session Statistics */}
      <Card className="glass-panel border-secondary/30">
        <CardHeader>
          <CardTitle className="text-secondary">Session Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-3xl font-bold text-primary">52</p>
              <p className="text-sm text-muted-foreground mt-2">Total Vehicles</p>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <p className="text-3xl font-bold text-secondary">5</p>
              <p className="text-sm text-muted-foreground mt-2">Signal Cycles</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-3xl font-bold text-accent">19.6</p>
              <p className="text-sm text-muted-foreground mt-2">Avg Duration (s)</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-3xl font-bold text-destructive">1</p>
              <p className="text-sm text-muted-foreground mt-2">Emergencies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataLogging;
