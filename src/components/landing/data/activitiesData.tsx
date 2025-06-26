
import React from 'react';
import { Camera, Briefcase, Code, Dumbbell, Clock, BookOpen } from 'lucide-react';
import { Activity } from '../types';

export const activities: Activity[] = [
  {
    text: "ta création de contenu",
    icon: <Camera className="h-10 w-10" />,
    color: "text-fuchsia-600",
    example: "Scripts, thumbnails, planning"
  },
  {
    text: "ton agence digitale",
    icon: <Briefcase className="h-10 w-10" />,
    color: "text-indigo-600",
    example: "Stratégies, audits, consulting"
  },
  {
    text: "ton activité de dev",
    icon: <Code className="h-10 w-10" />,
    color: "text-blue-600",
    example: "Solutions, API, formations"
  },
  {
    text: "ton coaching sportif",
    icon: <Dumbbell className="h-10 w-10" />,
    color: "text-red-500",
    example: "Programmes, nutrition, suivi"
  },
  {
    text: "ton temps d'expert",
    icon: <Clock className="h-10 w-10" />,
    color: "text-yellow-500",
    example: "Consultations, masterclass, audit"
  },
  {
    text: "tes connaissances",
    icon: <BookOpen className="h-10 w-10" />,
    color: "text-emerald-600",
    example: "Cours, workshops, certifications"
  }
];
