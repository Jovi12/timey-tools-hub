import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Timer = () => {
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success("Timer completed!", {
              description: "Your countdown has finished.",
            });
            // Play sound
            try {
              audioRef.current?.play();
            } catch (e) {
              console.log("Audio play failed");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    if (!isRunning && timeLeft === duration) {
      const totalSeconds = minutes * 60 + seconds;
      if (totalSeconds <= 0) {
        toast.error("Please set a valid time");
        return;
      }
      setDuration(totalSeconds);
      setTimeLeft(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleSetDuration = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      toast.error("Please enter a valid time");
      return;
    }
    setDuration(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsRunning(false);
  };

  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGmi765eeRAoMUKjj8LZjHQY3kdny0HgsBS13yPDdkEAKFF+06eunVRUKRaDg8b9sHwUrgc7y2Yk2CBloue3XnkMJDFCo4/C2ZB0GN5HZ8tF4LAUueMjw3I9AChRftOnnplUVCkag4PG/bB8FLIHN8tmJNggZaLrt155DCQxQqOPwtmQdBjeR2fLSdywFLnjI8NyPQQkUX7Tp56dVFQpGoODxv2wfBSyCzvLYiTYIGWm67deeQwkMUKjj8LdjHQY3ktnyz3csBix4yPDcj0AJE1+06eSoVRQKR6Df8b9sIAUsgc7y2Ik2CBlpuu7WnUMJDFCo4/C3YxwGOJHZ8tJ3KwQseMnw24xAChNgtOjlpVQUCkeg4PG/ax8FLIHOWVUKRaDf8sB==" />
      
      <h1 className="text-3xl font-bold text-center mb-8">Countdown Timer</h1>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-center">Set Your Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {!isRunning && timeLeft === duration && (
            <div className="flex gap-4 items-end justify-center">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Minutes</label>
                <Input
                  type="number"
                  min="0"
                  max="99"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 text-center text-lg"
                />
              </div>
              <span className="text-2xl font-bold pb-2">:</span>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Seconds</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-24 text-center text-lg"
                />
              </div>
              <Button onClick={handleSetDuration}>Set</Button>
            </div>
          )}

          <div className="relative">
            <div className={`text-6xl md:text-7xl font-mono text-center py-8 ${isRunning ? 'animate-pulse-timer' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${percentage}%` }}
              />
            </div>
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
            
            <Button size="lg" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
            {[1, 5, 10, 15].map((min) => (
              <Button
                key={min}
                variant="outline"
                size="sm"
                onClick={() => {
                  setMinutes(min);
                  setSeconds(0);
                  const total = min * 60;
                  setDuration(total);
                  setTimeLeft(total);
                  setIsRunning(false);
                }}
              >
                {min} min
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timer;
