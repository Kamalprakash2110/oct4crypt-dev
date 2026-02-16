'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiShield, FiActivity, FiLock, FiCode, FiExternalLink, FiGithub } from 'react-icons/fi';
import CyberCard from '@/components/ui/CyberCard';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: 'green' | 'blue' | 'purple';
}

const apps: App[] = [
  {
    id: '1',
    name: 'SOC Monitor',
    description: 'Real-time security monitoring dashboard with SIEM integration, threat detection, and automated incident response capabilities.',
    category: 'SOC',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/kamal/soc-monitor',
    demoUrl: 'https://soc-monitor.oct4crypt.com',
    icon: FiActivity,
    glow: 'blue'
  },
  {
    id: '2',
    name: 'Malware Analyzer',
    description: 'Advanced malware analysis tool with static and dynamic analysis capabilities, YARA rules integration, and threat intelligence feeds.',
    category: 'Malware',
    techStack: ['Python', 'Docker', 'YARA', 'VirusTotal API'],
    githubUrl: 'https://github.com/kamal/malware-analyzer',
    icon: FiShield,
    glow: 'green'
  },
  {
    id: '3',
    name: 'Network Scanner',
    description: 'Comprehensive network reconnaissance tool with port scanning, service detection, and vulnerability assessment modules.',
    category: 'Network',
    techStack: ['Go', 'Nmap', 'Shodan API', 'React'],
    githubUrl: 'https://github.com/kamal/network-scanner',
    demoUrl: 'https://network-scanner.oct4crypt.com',
    icon: FiTerminal,
    glow: 'purple'
  },
  {
    id: '4',
    name: 'SIEM Parser',
    description: 'Log parsing and correlation engine for security events with customizable rules and automated alerting system.',
    category: 'SIEM',
    techStack: ['Python', 'Elasticsearch', 'Kibana', 'Logstash'],
    githubUrl: 'https://github.com/kamal/siem-parser',
    icon: FiCode,
    glow: 'blue'
  },
  {
    id: '5',
    name: 'OSINT Toolkit',
    description: 'Open-source intelligence gathering platform with social media analysis, domain enumeration, and threat mapping.',
    category: 'OSINT',
    techStack: ['Node.js', 'Puppeteer', 'MongoDB', 'D3.js'],
    githubUrl: 'https://github.com/kamal/osint-toolkit',
    demoUrl: 'https://osint.oct4crypt.com',
    icon: FiLock,
    glow: 'green'
  },
  {
    id: '6',
    name: 'Password Auditor',
    description: 'Enterprise password security audit tool with strength analysis, breach detection, and compliance reporting.',
    category: 'Security',
    techStack: ['Python', 'HaveIBeenPwned API', 'React', 'PostgreSQL'],
    githubUrl: 'https://github.com/kamal/password-auditor',
    icon: FiShield,
    glow: 'purple'
  }
];

const categories = ['All', 'SOC', 'SIEM', 'Network', 'Malware', 'OSINT', 'Security'];

export default function AppsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Security
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              {" "}Tools & Apps
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cutting-edge cybersecurity applications and tools for modern threat detection and defense
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative search-input">
              <input
                type="text"
                placeholder="Search security tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 input rounded-lg border-red-500/30 focus:border-red-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <CyberCard
              key={app.id}
              glow={app.glow}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    app.glow === 'blue' ? 'from-cyan-500 to-blue-500' :
                    app.glow === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-lg flex items-center justify-center shadow-lg`}>
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded">
                    {app.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-3">
                  <h3 className="text-xl font-semibold text-white">{app.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{app.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {app.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  {app.githubUrl && (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all rounded text-sm"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {app.demoUrl && (
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all rounded text-sm"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </CyberCard>
          ))}
        </div>

        {/* No Results */}
        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No security tools found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
