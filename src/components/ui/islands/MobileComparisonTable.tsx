import React from 'react';
import { CheckCircle, Clock, DollarSign, User, ScanLine, Activity } from 'lucide-react';

const MobileComparisonTable = () => {
  const benefits = [
    {
      id: 'wait-time',
      label: 'Wait Time',
      icon: Clock,
      ioc: { text: 'Minutes', highlight: true },
    },
    {
      id: 'cost',
      label: 'Cost',
      icon: DollarSign,
      ioc: { text: 'Low Co-pay', highlight: true },
    },
    {
      id: 'provider',
      label: 'Provider',
      icon: User,
      ioc: { text: 'Ortho Specialist', highlight: true },
    },
    {
      id: 'imaging',
      label: 'Imaging',
      icon: ScanLine,
      ioc: { text: 'X-Ray & CT', highlight: true },
    },
    {
      id: 'experience',
      label: 'The Experience',
      icon: Activity,
      ioc: { text: 'Cast & Go', highlight: true },
    }
  ];

  return (
    <div className="bg-white relative">
      <div className="px-4 py-8 space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Better care. <span className="text-blue-600">Better value.</span>
          </h2>
          <p className="text-slate-500 text-sm">See how we stack up against the ER.</p>
        </div>

        {/* Two-Column Layout (Independent Columns) */}
        <div className="grid grid-cols-2 gap-0 items-start">
          
          {/* Left Column: Labels */}
          <div className="bg-slate-50 border border-slate-200 rounded-l-2xl rounded-r-none mt-20 overflow-hidden border-r-0">
            {/* Rows */}
            {benefits.map((benefit) => (
              <div key={benefit.id} className="h-16 flex items-center px-4 border-b border-slate-200 last:border-0">
                <span className="text-xs font-bold text-slate-700 leading-tight">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column: IOC (Highlighted) */}
          <div className="bg-blue-600 border border-blue-500 rounded-2xl rounded-bl-none overflow-hidden relative shadow-lg shadow-blue-900/20">
            {/* Header Cell */}
            <div className="h-20 flex flex-col justify-center items-center border-b border-blue-500/30 bg-blue-600">
              <p className="text-white font-extrabold text-xl leading-none mb-1">IOC</p>
              <p className="text-[10px] text-blue-100 uppercase tracking-widest font-medium">The Smart Way</p>
            </div>

            {/* Rows */}
            {benefits.map((benefit) => (
              <div key={benefit.id} className="h-16 flex items-center px-4 border-b border-blue-500/30 last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" strokeWidth={3} />
                  <span className="text-white font-bold text-sm leading-tight">
                    {benefit.ioc.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <a 
            href="https://pp-wfe-101.advancedmd.com/163338/onlineintake/demographic" 
            className="flex items-center justify-center w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-xl shadow-blue-900/30 hover:bg-blue-700 transition-all active:scale-95 border border-white/20 backdrop-blur-sm"
          >
            Check In Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default MobileComparisonTable;
