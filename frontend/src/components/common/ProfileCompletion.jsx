import React from "react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

const ProfileCompletion = ({ user }) => {
  const calculateCompletion = () => {
    const fields = [
      user?.firstName,
      user?.lastName,
      user?.email,
      user?.phoneNumber,
      user?.experience,
      user?.gender,
      user?.profileURL,
      user?.about,
      user?.skills.length > 0 ? "skills" : ""
    ];

    const filledFields = fields.filter((field) => field && field.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completion = calculateCompletion();

  const getCompletionColor = () => {
    if (completion === 100) return "bg-green-500";
    if (completion >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCompletionText = () => {
    if (completion === 100) return "Complete";
    if (completion >= 70) return "Almost there";
    return "Needs attention";
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Profile Completion</span>
        <Badge
          variant={completion === 100 ? "default" : "secondary"}
          className="text-xs"
        >
          {completion}%
        </Badge>
      </div>
      <Progress value={completion} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {getCompletionText()} • Complete your profile to get better matches
      </p>
    </div>
  );
};

export default ProfileCompletion;
