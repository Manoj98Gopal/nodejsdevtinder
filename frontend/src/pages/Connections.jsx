import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Search,
  Filter,
  Users,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import api from "@/utils/http";

const mockConnections = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    experience: "5+ years",
    location: "San Francisco, CA",
    profileURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
    about:
      "Full-stack developer passionate about React and Node.js. Love building scalable applications.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    company: "Google",
    email: "sarah.johnson@email.com",
    phoneNumber: "+1234567890",
    connectedAt: "2024-01-15",
    status: "connected"
  },
  {
    id: "2",
    firstName: "Alex",
    lastName: "Chen",
    experience: "8+ years",
    location: "New York, NY",
    profileURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    about:
      "Senior Software Engineer specializing in microservices architecture.",
    skills: ["Java", "Spring Boot", "Kubernetes", "Docker", "MongoDB"],
    company: "Microsoft",
    email: "alex.chen@email.com",
    phoneNumber: "+1234567891",
    connectedAt: "2024-01-20",
    status: "connected"
  },
  {
    id: "3",
    firstName: "Maya",
    lastName: "Patel",
    experience: "3+ years",
    location: "Austin, TX",
    profileURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    about:
      "Frontend developer with a passion for creating beautiful, accessible user interfaces.",
    skills: ["React", "Vue.js", "CSS", "Figma", "Accessibility"],
    company: "Airbnb",
    email: "maya.patel@email.com",
    phoneNumber: "+1234567892",
    connectedAt: "2024-02-01",
    status: "connected"
  }
];

const Connections = () => {
  const [connections] = useState(mockConnections);
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  const [myConnections, setMyConnections] = useState([]);

  const getMyConnections = async () => {
    try {
      const response = await api.get("/user/connections");
      if(response.data.success){
        setMyConnections(response.data.data)
      }
    } catch (error) {
      console.log("unable to get my connections :", error);
    }
  };

  useEffect(() => {
    getMyConnections();
  }, []);

  // Get all unique skills from connections
  const allSkills = Array.from(
    new Set(connections.flatMap((conn) => conn.skills))
  ).sort();

  // Filter connections based on search and filters
  const filteredConnections = myConnections.filter((connection) => {
    const matchesSearch =
      searchQuery === "" ||
      `${connection.firstName} ${connection.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesExperience =
      experienceFilter === "all" || connection.experience === experienceFilter;

    const matchesSkill =
      skillFilter === "all" || connection.skills.includes(skillFilter);

    return matchesSearch && matchesExperience && matchesSkill;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Connections</h1>
            <p className="text-muted-foreground">
              {connections.length} developers in your network
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {connections.length} Connected
            </span>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Connections</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Search and Filters */}
            <Card className="dev-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search connections by name, company, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={experienceFilter}
                      onValueChange={setExperienceFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="0-1 years">0-1 years</SelectItem>
                        <SelectItem value="1-3 years">1-3 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5+ years">5+ years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Skills" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Skills</SelectItem>
                        {allSkills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connections Grid */}
            {filteredConnections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConnections.map((connection) => (
                  <Card key={connection.id} className="dev-card group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={connection.profileURL}
                          alt={`${connection.firstName} ${connection.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">
                            {connection.firstName} {connection.lastName}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground">
                            {connection.experience} Years
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed line-clamp-2">
                        {connection.about}
                      </p>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {connection.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="skill-tag text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {connection.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{connection.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-3 text-xs text-muted-foreground">
                        Connected on{" "}
                        {new Date(connection.updatedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No connections found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery ||
                  experienceFilter !== "all" ||
                  skillFilter !== "all"
                    ? "Try adjusting your search filters"
                    : "Start connecting with developers in the Feed"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.connectedAt).getTime() -
                    new Date(a.connectedAt).getTime()
                )
                .slice(0, 6)
                .map((connection) => (
                  <Card key={connection.id} className="dev-card group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={connection.profileURL}
                          alt={`${connection.firstName} ${connection.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">
                            {connection.firstName} {connection.lastName}
                          </h3>
                         
                          <div className="connection-badge mt-1">
                            New Connection
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed line-clamp-2">
                        {connection.about}
                      </p>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {connection.skills.slice(0, 3).map((skill) => (
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

                      <div className="mt-4">
                        <Button size="sm" className="w-full glow-button">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Conversation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Connections;
