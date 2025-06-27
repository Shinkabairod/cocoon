import React from 'react';
import { Camera, Briefcase, Code, Dumbbell, Clock, BookOpen } from 'lucide-react';
import { Activity } from '../types';
export const activities: Activity[] = [{
  text: "your content creation",
  icon: <Camera className="h-10 w-10" />,
  color: "text-violet-600",
  example: "Scripts, thumbnails, planning"
}, {
  text: "your digital agency",
  icon: <Briefcase className="h-10 w-10" />,
  color: "text-blue-600",
  example: "Strategies, audits, consulting"
}, {
  text: "your dev activity",
  icon: <Code className="h-10 w-10" />,
  color: "text-indigo-600",
  example: "Solutions, API, training"
}, {
  text: "your fitness coaching",
  icon: <Dumbbell className="max-w-10 w-10/12 " />,
  color: "text-purple-600",
  example: "Programs, nutrition, tracking"
}, {
  text: "your expert time",
  icon: <Clock className="h-10 w-10" />,
  color: "text-violet-500",
  example: "Consultations, masterclass, audit"
}, {
  text: "your knowledge",
  icon: <BookOpen className="h-10 w-10" />,
  color: "text-blue-500",
  example: "Courses, workshops, certifications"
}];