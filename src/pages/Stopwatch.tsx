import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([time, ...laps]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Stopwatch</h1>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-center">Time Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className={`text-6xl md:text-7xl font-mono text-center py-8 ${isRunning ? 'animate-pulse-timer' : ''}`}>
            {formatTime(time)}
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={handleStartPause}
              className={isRunning ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>
            
            <Button size="lg" variant="outline" onClick={handleLap} disabled={!isRunning}>
              <Flag className="mr-2 h-5 w-5" />
              Lap
            </Button>
            
            <Button size="lg" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          {laps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Lap Times</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {laps.map((lap, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-secondary rounded-lg"
                  >
                    <span className="font-semibold">Lap {laps.length - index}</span>
                    <span className="font-mono text-lg">{formatTime(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Stopwatch;
