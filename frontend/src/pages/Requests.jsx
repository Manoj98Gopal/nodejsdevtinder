import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Heart, MessageCircle, Clock } from "lucide-react"
import React, { useState } from "react";

const mockRequests = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Wilson",
    experience: "4+ years",
    location: "Los Angeles, CA",
    profileURL: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    about:
      "Mobile app developer specializing in React Native and Flutter. Passionate about creating seamless user experiences.",
    skills: ["React Native", "Flutter", "JavaScript", "Firebase", "UI/UX"],
    company: "Spotify",
    requestedAt: "2024-01-25",
    status: "pending",
    type: "incoming"
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Rodriguez",
    experience: "6+ years",
    location: "Chicago, IL",
    profileURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    about:
      "Backend engineer with expertise in distributed systems and microservices architecture.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    company: "Uber",
    requestedAt: "2024-01-23",
    status: "pending",
    type: "incoming"
  },
  {
    id: "3",
    firstName: "Lisa",
    lastName: "Chang",
    experience: "3+ years",
    location: "Boston, MA",
    profileURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
    about:
      "Data scientist with a focus on machine learning and predictive analytics.",
    skills: ["Python", "TensorFlow", "Pandas", "SQL", "R"],
    company: "Netflix",
    requestedAt: "2024-01-20",
    status: "pending",
    type: "outgoing"
  },
  {
    id: "4",
    firstName: "Michael",
    lastName: "Brown",
    experience: "7+ years",
    location: "Portland, OR",
    profileURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    about:
      "Full-stack developer and tech lead with experience in scaling applications.",
    skills: ["React", "Node.js", "AWS", "GraphQL", "TypeScript"],
    company: "Slack",
    requestedAt: "2024-01-18",
    status: "pending",
    type: "outgoing"
  }
];

const Requests = () => {
  const [requests, setRequests] = useState(mockRequests);

  const handleRequest = (requestId, action) => {
    // setRequests(prev => prev.map(request =>
    //   request.id === requestId
    //     ? { ...request, status: action === "accept" ? "accepted" : "rejected" }
    //     : request
    // ))
    // const request = requests.find(r => r.id === requestId)
    // if (request) {
    //   if (action === "accept") {
    //     toast.success(`You're now connected with ${request.firstName}!`, {
    //       icon: "🎉"
    //     })
    //   } else {
    //     toast(`Request from ${request.firstName} declined`, {
    //       icon: "👋"
    //     })
    //   }
    // }
  };

  const incomingRequests = requests.filter(
    (r) => r.type === "incoming" && r.status === "pending"
  );
  const outgoingRequests = requests.filter(
    (r) => r.type === "outgoing" && r.status === "pending"
  );
  const processedRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Connection Requests</h1>
            <p className="text-muted-foreground">
              Manage your incoming and outgoing connection requests
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>{incomingRequests.length} Incoming</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
              <span>{outgoingRequests.length} Outgoing</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incoming" className="relative">
              Incoming
              {incomingRequests.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {incomingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-6">
            {incomingRequests.length > 0 ? (
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <Card key={request.id} className="dev-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.profileURL}
                          alt={`${request.firstName} ${request.lastName}`}
                          className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {request.firstName} {request.lastName}
                              </h3>
                              <p className="text-muted-foreground">
                                {request.company}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.experience}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(
                                request.requestedAt
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed line-clamp-2">
                            {request.about}
                          </p>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-1">
                              {request.skills.map((skill) => (
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

                          <div className="mt-6 flex gap-3">
                            <Button
                              onClick={() =>
                                handleRequest(request.id, "accept")
                              }
                              className="glow-button flex-1"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleRequest(request.id, "reject")
                              }
                              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No incoming requests
                </h3>
                <p className="text-muted-foreground">
                  New connection requests will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-6">
            {outgoingRequests.length > 0 ? (
              <div className="space-y-4">
                {outgoingRequests.map((request) => (
                  <Card key={request.id} className="dev-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.profileURL}
                          alt={`${request.firstName} ${request.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {request.firstName} {request.lastName}
                              </h3>
                              <p className="text-muted-foreground">
                                {request.company}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.experience}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="connection-badge"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            </div>
                          </div>

                          <p className="mt-2 text-sm leading-relaxed line-clamp-1">
                            {request.about}
                          </p>

                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {request.skills.slice(0, 4).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="skill-tag text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {request.skills.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{request.skills.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 text-xs text-muted-foreground">
                            Sent on{" "}
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No outgoing requests
                </h3>
                <p className="text-muted-foreground">
                  Requests you send will be tracked here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {processedRequests.length > 0 ? (
              <div className="space-y-4">
                {processedRequests.map((request) => (
                  <Card key={request.id} className="dev-card opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.profileURL}
                          alt={`${request.firstName} ${request.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {request.firstName} {request.lastName}
                              </h3>
                              <p className="text-muted-foreground">
                                {request.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  request.status === "accepted"
                                    ? "default"
                                    : "destructive"
                                }
                                className={
                                  request.status === "accepted"
                                    ? "connection-badge"
                                    : ""
                                }
                              >
                                {request.status === "accepted" ? (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Connected
                                  </>
                                ) : (
                                  <>
                                    <X className="h-3 w-3 mr-1" />
                                    Declined
                                  </>
                                )}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {request.skills.slice(0, 4).map((skill) => (
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

                          <div className="mt-4 text-xs text-muted-foreground">
                            {request.type === "incoming"
                              ? "Request received"
                              : "Request sent"}{" "}
                            on{" "}
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No request history</h3>
                <p className="text-muted-foreground">
                  Processed requests will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;
