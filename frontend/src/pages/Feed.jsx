import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Calendar, Mail } from "lucide-react";
import api from "@/utils/http";
import { toast } from "sonner"; // ✅ assuming you're using sonner/toast

const Feed = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentDeveloper = developers[currentIndex];

  const handleAction = async (action) => {
    if (isAnimating || !currentDeveloper) return;

    setIsAnimating(true);

    const card = document.querySelector(".swipe-card");
    if (card) {
      card.classList.add(
        action === "like" ? "animate-swipe-right" : "animate-swipe-left"
      );
    }

    try {
      if (action === "like") {
        await api.post(`/request/send/interested/${currentDeveloper._id}`);
        toast.success(`Sent interest to ${currentDeveloper.firstName}!`, {
          icon: "❤️",
        });
      } else {
        await api.post(`/request/send/ignored/${currentDeveloper._id}`);
        toast(`${currentDeveloper.firstName} skipped`, {
          icon: "👋",
        });
      }
    } catch (error) {
      console.error("Action failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);

        if (card) {
          card.classList.remove("animate-swipe-right", "animate-swipe-left");
        }
      }, 400);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handleAction("reject");
      if (e.key === "ArrowRight") handleAction("like");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, isAnimating]);

  const getDeveloperList = async () => {
    try {
      const response = await api.get("/user/feed");
      setDevelopers(response.data.data);
    } catch (error) {
      console.error("unable to get developers", error);
    }
  };

  useEffect(() => {
    getDeveloperList();
  }, []);

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
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                {currentDeveloper.experience && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{currentDeveloper.experience} experience</span>
                  </div>
                )}

                {currentDeveloper.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{currentDeveloper.email}</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed">
                  {currentDeveloper.about}
                </p>

                {currentDeveloper?.skills?.length > 0 && (
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
                )}
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
