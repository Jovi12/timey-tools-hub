import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export const ToolCard = ({ icon: Icon, title, description, href }: ToolCardProps) => {
  return (
    <Link to={href} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
