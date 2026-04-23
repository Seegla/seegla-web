"use client";

import { X, CheckCircle2, MessageSquare, ClipboardList, PhoneCall } from "lucide-react";

interface ActionGuideProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string;
}

export default function ActionGuide({ isOpen, onClose, departmentName }: ActionGuideProps) {
  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Talk to the Manager",
      description: "Ask the team manager if there has been any extra stress or hard deadlines lately.",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "2. Check Workload",
      description: "See if the team has too much work. If so, try to move some tasks or deadlines.",
      icon: ClipboardList,
      color: "text-brand-teal",
      bgColor: "bg-brand-teal/10"
    },
    {
      title: "3. Health Check-in",
      description: "Offer a wellness session or remind the team about the healthy resources in the app.",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "4. Professional Help",
      description: "If the stress continues, suggest talking to a company-approved counselor.",
      icon: PhoneCall,
      color: "text-brand-coral",
      bgColor: "bg-brand-coral/10"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-navy/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-navy text-white">
          <div>
            <h2 className="text-xl font-bold font-secondary">Help Guide</h2>
            <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mt-1">Recommended Steps</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-brand-navy">Helping {departmentName}</h3>
            <p className="text-brand-navy/60 text-sm mt-2 leading-relaxed">
              Follow these simple steps to help the team feel better and reduce burnout.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className={`shrink-0 h-10 w-10 rounded-xl ${step.bgColor} ${step.color} flex items-center justify-center`}>
                  <step.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy text-sm">{step.title}</h4>
                  <p className="text-brand-navy/60 text-xs mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button 
            className="flex-1 bg-brand-navy text-white font-bold py-4 rounded-xl text-sm"
            onClick={onClose}
          >
            Mark as Started
          </button>
          <button 
            className="flex-1 bg-white border border-gray-200 text-brand-navy font-bold py-4 rounded-xl text-sm"
            onClick={onClose}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
