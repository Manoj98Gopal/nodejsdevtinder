import { updateUserData } from "@/app/userSlice";
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
import { SKILLS } from "@/constant/appConstant";
import api from "@/utils/http";
import { Lock, Settings, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    experience: "",
    gender: "",
    profileURL: "",
    about: "",
    skills: []
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch()

  const userData = useSelector((store) => store.userData);

  const updateLocalStateOfProfile = (data) => {
    const tempData = {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phoneNumber: data?.phoneNumber || "",
      experience: data?.experience || "",
      gender: data?.gender || "",
      profileURL: data?.profileURL || "",
      about: data?.about || "",
      skills: data?.skills || []
    };
    setProfileForm(tempData);
  };

  useEffect(() => {
    updateLocalStateOfProfile(userData);
  }, [userData]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await api.patch("/profile/edit", profileForm);
      if (success?.data?.success) {
        toast.success("Profile updated successfully!");
        dispatch(updateUserData(success?.data?.data))
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    setIsLoading(true)

    try {

      const payload = {
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }

      const response = await api.patch("/profile/password/",payload)

      if (response?.data?.success) {
        toast.success("Password updated successfully!")
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        toast.error("Failed to update password")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  };

  if (!userData) return null;

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
                <ProfileCompletion user={userData} />
                <div className="border-t my-6"></div>
                <div className="relative inline-block mb-4">
                  <img
                    src={
                      userData?.profileURL ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    }
                    alt={`${userData?.firstName} ${userData?.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1">
                  {userData?.firstName} {userData?.lastName}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {userData?.experience} years
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{userData?.email}</span>
                  </div>
                  {userData?.phoneNumber && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">
                        {userData?.phoneNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium capitalize">
                      {userData?.gender}
                    </span>
                  </div>
                </div>

                {userData?.skills.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 text-left">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {userData?.skills.map((skill) => (
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

                      {/* <div className="space-y-2">
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
                      </div> */}

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

                          <Input
                            id="experience"
                            value={profileForm.experience}
                            onChange={(e) => {
                              setProfileForm((prev) => ({
                                ...prev,
                                experience: e.target.value
                              }));
                            }}
                            disabled={!isEditing}
                            required
                          />
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
                          <Select
                            className="w-full"
                            onValueChange={(value) => {
                              const selectedSkill = SKILLS.find(
                                (s) => s.id === Number(value)
                              );
                              if (
                                selectedSkill &&
                                !profileForm.skills.includes(selectedSkill.name)
                              ) {
                                setProfileForm((prev) => ({
                                  ...prev,
                                  skills: [...prev.skills, selectedSkill.name] // store only string
                                }));
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a skill" />
                            </SelectTrigger>
                            <SelectContent>
                              {SKILLS.map((skill) => (
                                <SelectItem
                                  key={skill.id}
                                  value={skill.id.toString()}
                                >
                                  {skill.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {profileForm.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profileForm.skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="skill-tag"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setProfileForm((prev) => ({
                                        ...prev,
                                        skills: prev.skills.filter(
                                          (s) => s !== skill
                                        )
                                      }))
                                    }
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
