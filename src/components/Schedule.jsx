import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, Bookmark } from 'lucide-react';

export default function Schedule() {
  const [filter, setFilter] = useState('All');
  const tracks = ['All', 'Main Stage', 'Workshop', 'Networking'];

  const sessions = [
    {
      id: 1,
      time: '09:00 AM',
      title: 'Registration & Welcome Breakfast',
      speaker: 'Event Team',
      location: 'BIEC Main Foyer',
      track: 'Networking',
      duration: '60 min'
    },
    {
      id: 2,
      time: '10:00 AM',
      title: 'The Future of Agentic AI Interfaces',
      speaker: 'Siddharth',
      location: 'BIEC Hall 1',
      track: 'Main Stage',
      duration: '45 min'
    },
    {
      id: 3,
      time: '11:00 AM',
      title: 'Building Interactive Physical Spaces with React',
      speaker: 'Arjun Singh',
      location: 'Tech Pavilion A',
      track: 'Workshop',
      duration: '90 min'
    },
    {
      id: 4,
      time: '01:00 PM',
      title: 'Lunch & Exhibitor Networking',
      speaker: 'Various',
      location: 'BIEC Expo Center',
      track: 'Networking',
      duration: '120 min'
    },
    {
      id: 5,
      time: '03:00 PM',
      title: 'Framer Motion for Event Apps',
      speaker: 'Priya Sharma',
      location: 'Innovation Lab 3',
      track: 'Workshop',
      duration: '60 min'
    }
  ];

  const filteredSessions = filter === 'All' ? sessions : sessions.filter(s => s.track === filter);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            Event Schedule
          </h2>
          <p className="text-slate-400">Plan your day and don't miss key keynotes.</p>
        </div>
        
        {/* Track Filter */}
        <div className="flex overflow-x-auto p-1 glass-panel rounded-xl gap-1 hide-scrollbar max-w-full">
          {tracks.map(track => (
            <button
              key={track}
              onClick={() => setFilter(track)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === track 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-l-2 border-slate-700/50 pl-6 ml-4 space-y-8">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[35px] top-4 w-5 h-5 rounded-full bg-slate-900 border-4 border-primary-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            
            <div className="glass-panel p-6 rounded-2xl hover:border-primary-500/30 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary-400 font-mono text-sm font-semibold flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {session.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {session.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {session.speaker}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {session.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <button className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-primary-500/20 text-slate-400 hover:text-primary-400 transition-colors border border-transparent hover:border-primary-500/30">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredSessions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-slate-500"
          >
            No sessions found for this track.
          </motion.div>
        )}
      </div>
    </div>
  );
}
