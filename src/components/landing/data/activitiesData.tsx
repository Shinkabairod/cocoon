import React from 'react';
import { Camera, Briefcase, Code, Dumbbell, Clock, BookOpen } from 'lucide-react';
import { Activity } from '../types';

export const activities: Activity[] = [
  {
    text: "your content creation",
    icon: <Camera className="h-10 w-10" />,
    color: "text-fuchsia-600",
    example: "Scripts, thumbnails, planning"
  },
  {
    text: "your digital agency",
    icon: <Briefcase className="h-10 w-10" />,
    color: "text-indigo-600",
    example: "Strategies, audits, consulting"
  },
  {
    text: "your dev work",
    icon: <Code className="h-12 w-12 my-0" />,
    color: "text-blue-600",
    example: "Solutions, APIs, training"
  },
  {
    text: "your fitness coaching",
    icon: <Dumbbell className="h-10 w-10" />,
    color: "text-red-500",
    example: "Programs, nutrition, progress tracking"
  },
  {
    text: "your expert time",
    icon: <Clock className="h-10 w-10" />,
    color: "text-yellow-500",
    example: "Consulting, masterclasses, audits"
  },
  {
    text: "your knowledge",
    icon: <BookOpen className="h-10 w-10" />,
    color: "text-emerald-600",
    example: "Courses, workshops, certifications"
  }
];