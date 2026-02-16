'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'green' | 'blue' | 'purple' | 'none';
  delay?: number;
  onClick?: () => void;
}

const glowColors = {
  green: 'shadow-neon-green hover:shadow-neon-green',
  blue: 'shadow-electric-blue hover:shadow-electric-blue',
  purple: 'shadow-cyber-purple hover:shadow-cyber-purple',
  none: 'shadow-glass hover:shadow-glass',
};

export default function CyberCard({ 
  children, 
  className = '', 
  hover = true, 
  glow = 'none',
  delay = 0,
  onClick 
}: CyberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative backdrop-blur-xl bg-gray-900/20 rounded-2xl 
        border border-cyan-500/20 overflow-hidden
        ${glowColors[glow]}
        ${hover ? 'cursor-pointer transition-all duration-300' : ''}
        ${className}
      `}
    >
      {/* Glow border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-green-500/20 to-cyan-500/20 opacity-50 blur-sm pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}
