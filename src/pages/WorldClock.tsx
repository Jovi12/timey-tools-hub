import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

interface TimeZone {
  city: string;
  timezone: string;
  country: string;
}

const WorldClock = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const [loading, setLoading] = useState(true);

  const timezones: TimeZone[] = [
    { city: "New York", timezone: "America/New_York", country: "USA" },
    { city: "London", timezone: "Europe/London", country: "UK" },
    { city: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
    { city: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
    { city: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
    { city: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
    { city: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
    { city: "Paris", timezone: "Europe/Paris", country: "France" },
  ];

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const timePromises = timezones.map(async (tz) => {
          try {
            const response = await fetch(`https://worldtimeapi.org/api/timezone/${tz.timezone}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            return { timezone: tz.timezone, date: new Date(data.datetime) };
          } catch (error) {
            // Fallback to local time calculation
            return { timezone: tz.timezone, date: new Date() };
          }
        });

        const results = await Promise.all(timePromises);
        const timesObj: Record<string, Date> = {};
        results.forEach((result) => {
          timesObj[result.timezone] = result.date;
        });
        setTimes(timesObj);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load world times. Showing local estimates.");
        setLoading(false);
      }
    };

    fetchTimes();
    const interval = setInterval(fetchTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeOfDay = (date: Date, timezone: string) => {
    const hour = parseInt(
      date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        hour12: false,
      })
    );
    
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  const getTimeColor = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning": return "bg-amber-500/10 border-amber-500/20";
      case "afternoon": return "bg-primary/10 border-primary/20";
      case "evening": return "bg-orange-500/10 border-orange-500/20";
      case "night": return "bg-indigo-500/10 border-indigo-500/20";
      default: return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">World Clock</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timezones.map((tz) => (
            <Card key={tz.timezone} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-secondary rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">World Clock</h1>
      <p className="text-center text-muted-foreground mb-8">
        Current time in major cities around the world
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {timezones.map((tz) => {
          const currentTime = times[tz.timezone] || new Date();
          const timeOfDay = getTimeOfDay(currentTime, tz.timezone);
          
          return (
            <Card
              key={tz.timezone}
              className={`shadow-card hover:shadow-card-hover transition-all duration-300 border-2 ${getTimeColor(timeOfDay)}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div>{tz.city}</div>
                    <div className="text-xs font-normal text-muted-foreground">{tz.country}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(currentTime, tz.timezone)}</span>
                </div>
                <div className="text-3xl font-mono font-bold text-center py-3">
                  {formatTime(currentTime, tz.timezone)}
                </div>
                <div className="text-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground capitalize">
                    {timeOfDay}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-secondary/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">About World Clock</h3>
            <p className="text-sm text-muted-foreground">
              Stay synchronized with colleagues, friends, and family across the globe. 
              Our world clock displays accurate real-time information for major cities, 
              making it perfect for scheduling international meetings and calls.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorldClock;
