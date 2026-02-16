'use client';

import { motion } from 'framer-motion';
import { FiUser, FiShield, FiCode, FiTerminal, FiAward, FiTarget, FiGitBranch, FiCalendar } from 'react-icons/fi';
import CyberCard from '@/components/ui/CyberCard';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'achievement' | 'milestone' | 'certification';
}

const skills: Skill[] = [
  { name: 'SIEM Management', level: 90, category: 'Security Operations', icon: FiShield },
  { name: 'Threat Hunting', level: 85, category: 'Security Operations', icon: FiTarget },
  { name: 'Network Security', level: 80, category: 'Infrastructure', icon: FiTerminal },
  { name: 'Python', level: 85, category: 'Development', icon: FiCode },
  { name: 'Linux Administration', level: 75, category: 'Infrastructure', icon: FiTerminal },
  { name: 'Security Monitoring', level: 88, category: 'Security Operations', icon: FiShield },
  { name: 'Incident Response', level: 82, category: 'Security Operations', icon: FiShield },
  { name: 'Penetration Testing', level: 70, category: 'Security Testing', icon: FiTarget },
  { name: 'Docker & Kubernetes', level: 65, category: 'Infrastructure', icon: FiCode },
  { name: 'Cloud Security', level: 72, category: 'Infrastructure', icon: FiShield }
];

const timeline: TimelineItem[] = [
  {
    year: '2024',
    title: 'Advanced SOC Analyst',
    description: 'Leading threat detection initiatives and implementing automated response protocols for enterprise security operations.',
    type: 'milestone'
  },
  {
    year: '2023',
    title: 'GIAC Certified Incident Handler',
    description: 'Achieved GCIH certification demonstrating expertise in incident response and handling.',
    type: 'certification'
  },
  {
    year: '2023',
    title: 'Zero Trust Architecture Implementation',
    description: 'Successfully designed and implemented Zero Trust security framework for 500+ employee organization.',
    type: 'achievement'
  },
  {
    year: '2022',
    title: 'Security Operations Lead',
    description: 'Promoted to lead SOC team of 12 analysts, managing 24/7 security monitoring operations.',
    type: 'milestone'
  },
  {
    year: '2022',
    title: 'CISSP Certification',
    description: 'Certified Information Systems Security Professional - validating comprehensive security knowledge.',
    type: 'certification'
  },
  {
    year: '2021',
    title: 'Threat Detection Platform Launch',
    description: 'Developed and deployed custom threat detection platform reducing incident response time by 40%.',
    type: 'achievement'
  },
  {
    year: '2020',
    title: 'SOC Analyst',
    description: 'Began professional journey in cybersecurity, focusing on security monitoring and incident analysis.',
    type: 'milestone'
  }
];

const skillCategories = Array.from(new Set(skills.map(skill => skill.category)));

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              {" "}Kamal
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cybersecurity enthusiast focused on SOC analysis, threat detection, and defensive security
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <CyberCard glow="blue" className="text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Kamal</h2>
              <p className="text-cyan-400 font-medium mb-4">Cybersecurity Professional</p>
              <p className="text-gray-300 leading-relaxed">
                Passionate about defending digital assets and staying ahead of emerging threats. 
                Specialized in building robust security frameworks and leading incident response teams.
              </p>
            </CyberCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <CyberCard glow="green" className="p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiTarget className="w-6 h-6 text-cyan-400" />
                Professional Focus
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Core Expertise</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        SOC Analysis & Management
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Threat Detection & Hunting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Incident Response
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Security Architecture
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Key Achievements</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <FiAward className="w-4 h-4 text-green-400" />
                        Reduced incident response time by 40%
                      </li>
                      <li className="flex items-center gap-2">
                        <FiAward className="w-4 h-4 text-green-400" />
                        Led team of 12 security analysts
                      </li>
                      <li className="flex items-center gap-2">
                        <FiAward className="w-4 h-4 text-green-400" />
                        Implemented Zero Trust architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <FiAward className="w-4 h-4 text-green-400" />
                        CISSP & GCIH certified
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CyberCard>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <CyberCard key={category} glow="purple" delay={categoryIndex * 0.1}>
                <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <skill.icon className="w-4 h-4 text-cyan-400" />
                            <span className="text-gray-300 text-sm">{skill.name}</span>
                          </div>
                          <span className="text-cyan-400 text-sm font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </CyberCard>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Journey</h2>
          
          <CyberCard glow="blue" className="p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-green-500"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline Dot */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                      item.type === 'certification' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                      item.type === 'achievement' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                      'bg-gradient-to-br from-cyan-500 to-blue-500'
                    }`}>
                      {item.type === 'certification' && <FiAward className="w-6 h-6 text-white" />}
                      {item.type === 'achievement' && <FiTarget className="w-6 h-6 text-white" />}
                      {item.type === 'milestone' && <FiGitBranch className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-cyan-400 font-bold">{item.year}</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.type === 'certification' ? 'bg-purple-500/20 text-purple-400' :
                          item.type === 'achievement' ? 'bg-green-500/20 text-green-400' :
                          'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
}
