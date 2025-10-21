import { Clock, Timer, Brain, Globe } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const tools = [
    {
      icon: Clock,
      title: "Stopwatch",
      description: "Track time with precision. Perfect for workouts, cooking, or any timed activity.",
      href: "/stopwatch",
    },
    {
      icon: Timer,
      title: "Countdown Timer",
      description: "Set custom countdowns for meetings, breaks, or important deadlines.",
      href: "/timer",
    },
    {
      icon: Brain,
      title: "Pomodoro Timer",
      description: "Boost productivity with the proven 25-5 technique for focused work sessions.",
      href: "/pomodoro",
    },
    {
      icon: Globe,
      title: "World Clock",
      description: "Check current time in major cities worldwide for seamless global coordination.",
      href: "/world-clock",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            TimeyTools
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-white/90">
            Your Ultimate Time Utility Hub
          </p>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Track, Focus, and Manage Time Smarter
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Get Started
          </Button>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* Why Use TimeyTools Section */}
      <section className="bg-secondary/30 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Use TimeyTools?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Boost Productivity
              </h3>
              <p className="text-muted-foreground">
                Use Pomodoro technique and timers to maintain focus and accomplish more in less time. 
                Structured work intervals help prevent burnout and maintain peak performance.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Better Time Management
              </h3>
              <p className="text-muted-foreground">
                Track activities precisely with our stopwatch, set deadlines with countdown timers, 
                and coordinate globally with world clocks. Master your schedule effortlessly.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Improve Focus
              </h3>
              <p className="text-muted-foreground">
                Eliminate distractions with dedicated time-blocking tools. Create a focused environment 
                that helps you dive deep into work and achieve flow state consistently.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Global Accessibility
              </h3>
              <p className="text-muted-foreground">
                Free, web-based tools available anywhere, anytime. No installation required. 
                Works seamlessly across all devices for productivity on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Master Your Time?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who have improved their productivity and time management 
          with our suite of powerful, easy-to-use tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/stopwatch">Start Stopwatch</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/pomodoro">Try Pomodoro</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
