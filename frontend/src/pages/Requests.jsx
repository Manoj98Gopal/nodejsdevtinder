import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/utils/http";
import { Check, X, Heart, MessageCircle, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";



const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [myRequest, setMyRequest] = useState([]);
  const [outGoingRequest, setGoingRequest] = useState([]);

  const handleRequest = async (requestId, action, name) => {
    const filteredRequest = myRequest?.filter((data) => data._id != requestId);

    const request = await api.post(`/request/review/${action}/${requestId}`);

    console.log("reqered data :", request.data);

    if (request?.data?.success) {
      if (action === "accepted") {
        toast.success(`You're now connected with ${name}!`, {
          icon: "🎉"
        });
      } else {
        toast.info(`Request from ${name} declined`, {
          icon: "👋"
        });
      }
    }

    setMyRequest(filteredRequest);
  };

  const getMyRequests = async () => {
    try {
      const response = await api.get("/user/requests");
      setMyRequest(response.data?.data);
    } catch (error) {
      console.error("unable to get errors :", error);
    }
  };

  const getOutGoingRequest = async () => {
    try {
      const response = await api.get("/user/outgoing_request");
      setGoingRequest(response.data?.data);
    } catch (error) {
      console.error("unable to get errors :", error);
    }
  };

  useEffect(() => {
    getMyRequests();
    getOutGoingRequest();
  }, []);

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
              <span>{myRequest.length} Incoming</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
              <span>{outGoingRequest.length} Outgoing</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incoming" className="relative">
              Incoming
              {myRequest.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {myRequest.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-6">
            {myRequest.length > 0 ? (
              <div className="space-y-4">
                {myRequest.map((request) => (
                  <Card key={request._id} className="dev-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.sender.profileURL}
                          alt={`${request.sender.firstName} ${request.sender.lastName}`}
                          className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {request.sender.firstName}{" "}
                                {request.sender.lastName}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                {request.sender.experience} Years
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed line-clamp-2">
                            {request.sender.about}
                          </p>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-1">
                              {request.sender.skills.map((skill) => (
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
                                handleRequest(
                                  request._id,
                                  "accepted",
                                  request.sender.firstName
                                )
                              }
                              className="glow-button flex-1"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleRequest(
                                  request._id,
                                  "rejected",
                                  request.sender.firstName
                                )
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
            {outGoingRequest.length > 0 ? (
              <div className="space-y-4">
                {outGoingRequest.map((request) => (
                  <Card key={request._id} className="dev-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.receiver.profileURL}
                          alt={`${request.receiver.firstName} ${request.receiver.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {request.receiver.firstName}{" "}
                                {request.receiver.lastName}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                {request.receiver.experience} Years
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
                            {request.receiver.about}
                          </p>

                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {request.receiver.skills
                                .slice(0, 4)
                                .map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="skill-tag text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {request.receiver.skills.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{request.receiver.skills.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 text-xs text-muted-foreground">
                            Sent on{" "}
                            {new Date(request.createdAt).toLocaleDateString()}
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
