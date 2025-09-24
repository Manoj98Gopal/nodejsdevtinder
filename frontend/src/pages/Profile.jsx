import ProfileCompletion from "@/components/common/ProfileCompletion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Settings, User } from "lucide-react";
import React, { useState } from "react";

const user = {
  firstName: "Manoj",
  lastName: "Gopal",
  profileURL: "https://randomuser.me/api/portraits/men/32.jpg",
  email: "manoj.gopal@example.com",
  phoneNumber: "+91 98765 43210",
  gender: "male",
  experience: "5+ years",
  skills: ["React.js", "Next.js", "JavaScript", "Django", "Docker"]
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    experience: user?.experience || "",
    gender: user?.gender || "",
    profileURL: user?.profileURL || "",
    about: user?.about || "",
    skills: user?.skills || []
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [skillInput, setSkillInput] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // setIsLoading(true)

    // try {
    //   const success = await updateProfile(profileForm)
    //   if (success) {
    //     toast.success("Profile updated successfully!")
    //     setIsEditing(false)
    //   } else {
    //     toast.error("Failed to update profile")
    //   }
    // } catch (error) {
    //   toast.error("Failed to update profile")
    // } finally {
    //   setIsLoading(false)
    // }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    //   toast.error("Passwords don't match")
    //   return
    // }

    // setIsLoading(true)

    // try {
    //   const success = await updatePassword(passwordForm.currentPassword, passwordForm.newPassword)
    //   if (success) {
    //     toast.success("Password updated successfully!")
    //     setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    //   } else {
    //     toast.error("Failed to update password")
    //   }
    // } catch (error) {
    //   toast.error("Failed to update password")
    // } finally {
    //   setIsLoading(false)
    // }
  };

  const addSkill = () => {
    // if (skillInput.trim() && !profileForm.skills.includes(skillInput.trim())) {
    //   setProfileForm(prev => ({
    //     ...prev,
    //     skills: [...prev.skills, skillInput.trim()]
    //   }))
    //   setSkillInput("")
    // }
  };

  const removeSkill = (skillToRemove) => {
    // setProfileForm(prev => ({
    //   ...prev,
    //   skills: prev.skills.filter(skill => skill !== skillToRemove)
    // }))
  };

  const handleSkillKeyPress = (e) => {
    // if (e.key === "Enter") {
    //   e.preventDefault()
    //   addSkill()
    // }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={!isEditing ? "glow-button" : ""}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Preview Card */}
          <div className="lg:col-span-1">
            <Card className="dev-card">
              <CardContent className="p-6 text-center">
                <ProfileCompletion user={user} />
                <div className="border-t my-6"></div>
                <div className="relative inline-block mb-4">
                  <img
                    src={
                      user.profileURL ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-muted-foreground mb-4">{user.experience}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{user.phoneNumber}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium capitalize">
                      {user.gender}
                    </span>
                  </div>
                </div>

                {user.skills.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 text-left">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skills.map((skill) => (
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
              </CardContent>
            </Card>
          </div>

          {/* Profile Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="dev-card">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileUpdate}>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileForm.firstName}
                            onChange={(e) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                firstName: e.target.value
                              }))
                            }
                            disabled={!isEditing}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileForm.lastName}
                            onChange={(e) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                lastName: e.target.value
                              }))
                            }
                            disabled={!isEditing}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              email: e.target.value
                            }))
                          }
                          disabled={!isEditing}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={profileForm.phoneNumber}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              phoneNumber: e.target.value
                            }))
                          }
                          disabled={!isEditing}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience</Label>
                          <Select
                            value={profileForm.experience}
                            onValueChange={(value) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                experience: value
                              }))
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1 years">
                                0-1 years
                              </SelectItem>
                              <SelectItem value="1-3 years">
                                1-3 years
                              </SelectItem>
                              <SelectItem value="3-5 years">
                                3-5 years
                              </SelectItem>
                              <SelectItem value="5+ years">5+ years</SelectItem>
                              <SelectItem value="10+ years">
                                10+ years
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select
                            value={profileForm.gender}
                            onValueChange={(value) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                gender: value
                              }))
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">
                                Prefer not to say
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profileURL">Profile Picture URL</Label>
                        <Input
                          id="profileURL"
                          value={profileForm.profileURL}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              profileURL: e.target.value
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="about">About</Label>
                        <Textarea
                          id="about"
                          value={profileForm.about}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              about: e.target.value
                            }))
                          }
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>

                      {isEditing && (
                        <div className="space-y-2">
                          <Label htmlFor="skills">Skills</Label>
                          <div className="flex gap-2">
                            <Input
                              id="skills"
                              placeholder="Add a skill..."
                              value={skillInput}
                              onChange={(e) => setSkillInput(e.target.value)}
                              onKeyPress={handleSkillKeyPress}
                            />
                            <Button type="button" onClick={addSkill} size="sm">
                              Add
                            </Button>
                          </div>
                          {profileForm.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profileForm.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="skill-tag"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {isEditing && (
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="glow-button"
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card className="dev-card">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePasswordUpdate}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              currentPassword: e.target.value
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              newPassword: e.target.value
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="glow-button"
                          disabled={isLoading}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </CardContent>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
