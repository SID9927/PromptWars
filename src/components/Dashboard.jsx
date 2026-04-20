import { motion } from 'framer-motion';
import { Users, ArrowRight, Map, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { label: 'Attendees', value: '2,400+', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Sessions', value: '45', icon: Clock, color: 'text-primary-400', bg: 'bg-primary-400/10' },
    { label: 'Exhibitors', value: '120', icon: Map, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Happening Now
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome to <span className="gradient-text">Aura Tech Summit India</span> 2026
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg mb-8"
          >
            The premier physical event for next-generation technology. Navigate the venue, schedule your sessions, and ask our AI anything.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => navigate('/schedule')}
              className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] flex items-center gap-2"
            >
              View Schedule
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/ask-ai')}
              className="glass-panel px-6 py-3 rounded-xl font-medium hover:bg-white/5 transition-all flex items-center gap-2 text-slate-200"
            >
              <Zap className="w-4 h-4 text-primary-400" />
              Ask AI Concierge
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all duration-300 group"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Session */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-panel p-6 md:p-8 rounded-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Up Next For You</h2>
          <button 
            onClick={() => navigate('/schedule')}
            className="text-sm text-primary-400 hover:text-primary-300 font-medium"
          >
            See all
          </button>
        </div>
        <div className="bg-slate-800/50 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-primary-400 mb-2 uppercase tracking-wider">BIEC Hall 1 • 10:00 AM</div>
            <h3 className="text-lg font-bold text-white mb-1">The Future of Agentic AI Interfaces</h3>
            <p className="text-slate-400 text-sm">Speaker: Siddharth - Leading AI Researcher</p>
          </div>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Bengaluru+International+Exhibition+Centre+(BIEC)" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Map className="w-4 h-4" />
            Find on Map
          </a>
        </div>
      </motion.div>
    </div>
  );
}
