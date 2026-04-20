import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, BotMessageSquare, MapPin } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import AICompanion from './components/AICompanion';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/schedule', label: 'Schedule', icon: CalendarDays },
    { path: '/ask-ai', label: 'Ask AI', icon: BotMessageSquare },
  ];

  return (
    <div className={`bg-slate-900 text-slate-100 font-sans relative flex flex-col ${
      currentPath === '/ask-ai' ? 'h-dvh overflow-hidden' : 'min-h-dvh'
    }`}>
      {/* Background Orbs */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-white/10 flex justify-center shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-blue-500 flex items-center justify-center shadow-lg">
              <MapPin className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Aura Events</h1>
              <p className="text-xs text-primary-400 font-medium">Smart Physical Experience</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                currentPath === item.path 
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 relative z-10 w-full flex flex-col min-h-0 ${
        currentPath === '/ask-ai' 
          ? 'p-0 max-w-7xl mx-auto' 
          : 'px-4 md:px-8 py-6 max-w-7xl mx-auto'
      }`}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/schedule" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Schedule />
              </motion.div>
            } />
            <Route path="/ask-ai" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 w-full flex flex-col min-h-0"
              >
                <AICompanion />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/5 pb-safe z-50">
        <div className="flex justify-around p-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[64px] transition-all ${
                currentPath === item.path 
                  ? 'text-primary-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${currentPath === item.path ? 'bg-primary-500/20' : ''}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
