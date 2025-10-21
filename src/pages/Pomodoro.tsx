import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { toast } from "sonner";

const Pomodoro = () => {
  const WORK_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes
  
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
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

  const handleSessionComplete = () => {
    setIsRunning(false);
    try {
      audioRef.current?.play();
    } catch (e) {
      console.log("Audio play failed");
    }

    if (isWorkSession) {
      setCompletedPomodoros((prev) => prev + 1);
      toast.success("Work session complete!", {
        description: "Time for a break!",
      });
      setIsWorkSession(false);
      setTimeLeft(BREAK_TIME);
    } else {
      toast.success("Break complete!", {
        description: "Ready for another work session?",
      });
      setIsWorkSession(true);
      setTimeLeft(WORK_TIME);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_TIME);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (isWorkSession) {
      setIsWorkSession(false);
      setTimeLeft(BREAK_TIME);
    } else {
      setIsWorkSession(true);
      setTimeLeft(WORK_TIME);
    }
  };

  const totalTime = isWorkSession ? WORK_TIME : BREAK_TIME;
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGmi765eeRAoMUKjj8LZjHQY3kdny0HgsBS13yPDdkEAKFF+06eunVRUKRaDg8b9sHwUrgc7y2Yk2CBloue3XnkMJDFCo4/C2ZB0GN5HZ8tF4LAUueMjw3I9AChRftOnnplUVCkag4PG/bB8FLIHN8tmJNggZaLrt155DCQxQqOPwtmQdBjeR2fLSdywFLnjI8NyPQQkUX7Tp56dVFQpGoODxv2wfBSyCzvLYiTYIGWm67deeQwkMUKjj8LdjHQY3ktnyz3csBix4yPDcj0AJE1+06eSoVRQKR6Df8b9sIAUsgc7y2Ik2CBlpuu7WnUMJDFCo4/C3YxwGOJHZ8tJ3KwQseMnw24xAChNgtOjlpVQUCkeg4PG/ax8FLIHOWVUKRaDf8sB==" />
      
      <h1 className="text-3xl font-bold text-center mb-8">Pomodoro Timer</h1>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            {isWorkSession ? (
              <>
                <Brain className="h-6 w-6 text-primary" />
                <span>Work Session</span>
              </>
            ) : (
              <>
                <Coffee className="h-6 w-6 text-accent" />
                <span>Break Time</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
              <span className="text-sm text-muted-foreground">Completed Pomodoros:</span>
              <span className="text-lg font-bold text-primary">{completedPomodoros}</span>
            </div>
          </div>

          <div className="relative">
            <div className={`text-6xl md:text-7xl font-mono text-center py-8 ${isRunning ? 'animate-pulse-timer' : ''} ${!isWorkSession ? 'text-accent' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress circle or bar */}
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-4">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${isWorkSession ? 'bg-primary' : 'bg-accent'}`}
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
            
            <Button size="lg" variant="outline" onClick={handleSkip}>
              Skip
            </Button>
            
            <Button size="lg" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg">How Pomodoro Works:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Work for 25 minutes with full focus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Take a 5-minute break to recharge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Repeat the cycle for maximum productivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>After 4 pomodoros, take a longer 15-30 min break</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pomodoro;
