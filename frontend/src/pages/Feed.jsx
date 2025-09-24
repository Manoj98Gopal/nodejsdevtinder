import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, MapPin, Calendar, Briefcase } from "lucide-react";
const mockDevelopers = [
  {
    id: "2",
    firstName: "Alex",
    lastName: "Chen",
    age: 32,
    experience: "8+ years",
    location: "New York, NY",
    profileURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    about:
      "Senior Software Engineer specializing in microservices architecture. Always learning new technologies and contributing to open source.",
    skills: ["Java", "Spring Boot", "Kubernetes", "Docker", "MongoDB"],
    company: "Microsoft"
  },
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    age: 28,
    experience: "5+ years",
    location: "San Francisco, CA",
    profileURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
    about:
      "Full-stack developer passionate about React and Node.js. Love building scalable applications and mentoring junior developers.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    company: "Google"
  },

  {
    id: "3",
    firstName: "Maya",
    lastName: "Patel",
    age: 26,
    experience: "3+ years",
    location: "Austin, TX",
    profileURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    about:
      "Frontend developer with a passion for creating beautiful, accessible user interfaces. UX enthusiast and design systems advocate.",
    skills: ["React", "Vue.js", "CSS", "Figma", "Accessibility"],
    company: "Airbnb"
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Kim",
    age: 30,
    experience: "6+ years",
    location: "Seattle, WA",
    profileURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    about:
      "DevOps engineer focused on cloud infrastructure and automation. Love optimizing deployment pipelines and system reliability.",
    skills: ["AWS", "Terraform", "Python", "Jenkins", "Monitoring"],
    company: "Amazon"
  }
];

const Feed = () => {
  const [developers, setDevelopers] = useState(mockDevelopers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentDeveloper = developers[currentIndex];

  const handleAction = (action) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const card = document.querySelector(".swipe-card");
    if (card) {
      card.classList.add(
        action === "like" ? "animate-swipe-right" : "animate-swipe-left"
      );
    }

    setTimeout(() => {
      if (action === "like") {
        toast.success(`Sent interest to ${currentDeveloper.firstName}!`, {
          icon: "❤️"
        });
      } else {
        toast(`${currentDeveloper.firstName} skipped`, {
          icon: "👋"
        });
      }

      setCurrentIndex((prev) => prev + 1);
      setIsAnimating(false);

      if (card) {
        card.classList.remove("animate-swipe-right", "animate-swipe-left");
      }
    }, 400);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handleAction("reject");
      if (e.key === "ArrowRight") handleAction("like");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, isAnimating]);

  if (currentIndex >= developers.length) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
              <Heart className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No more developers!</h2>
            <p className="text-muted-foreground">
              You've viewed all available profiles. Check back later for new
              matches!
            </p>
          </div>
          <Button onClick={() => setCurrentIndex(0)} className="glow-button">
            Start Over
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">Discover Developers</h1>
        </div>

        <div className="relative">
          <Card className="swipe-card max-w-sm mx-auto overflow-hidden p-0">
            <div className="relative">
              <img
                src={currentDeveloper.profileURL}
                alt={`${currentDeveloper.firstName} ${currentDeveloper.lastName}`}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">
                  {currentDeveloper.firstName} {currentDeveloper.lastName}
                </h3>
                <p className="text-sm opacity-90">
                  {currentDeveloper.age} years old
                </p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{currentDeveloper.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{currentDeveloper.company}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{currentDeveloper.experience} experience</span>
                </div>

                <p className="text-sm leading-relaxed">
                  {currentDeveloper.about}
                </p>

                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentDeveloper.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="skill-tag text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAction("reject")}
              disabled={isAnimating}
              className="h-14 w-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              size="lg"
              onClick={() => handleAction("like")}
              disabled={isAnimating}
              className="h-14 w-14 rounded-full glow-button"
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
