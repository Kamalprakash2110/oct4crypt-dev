'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiActivity, FiLock, FiTerminal, FiCode, FiX, FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';
import CyberCard from '@/components/ui/CyberCard';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  architecture: string;
  threatModel: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
  glow: 'green' | 'blue' | 'purple';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Advanced Threat Detection System',
    description: 'Machine learning-powered threat detection system that analyzes network traffic patterns and identifies anomalous behavior in real-time.',
    category: 'Web Security',
    tags: ['Machine Learning', 'Network Security', 'Real-time'],
    imageUrl: '/projects/threat-detection.jpg',
    githubUrl: 'https://github.com/kamal/threat-detection',
    demoUrl: 'https://threat-detection.oct4crypt.com',
    architecture: 'Distributed microservices architecture with Kafka for event streaming, Elasticsearch for log aggregation, and TensorFlow models for anomaly detection.',
    threatModel: 'MITRE ATT&CK framework integration with automated IOC extraction and threat intelligence feeds from multiple sources.',
    technologies: ['Python', 'TensorFlow', 'Kafka', 'Elasticsearch', 'Docker', 'Kubernetes'],
    icon: FiShield,
    glow: 'blue'
  },
  {
    id: '2',
    title: 'SOC Automation Platform',
    description: 'Comprehensive SOC automation platform that streamlines incident response workflows and reduces analyst workload by 70%.',
    category: 'SOC Tools',
    tags: ['Automation', 'Incident Response', 'Workflow'],
    imageUrl: '/projects/soc-automation.jpg',
    githubUrl: 'https://github.com/kamal/soc-automation',
    architecture: 'Event-driven architecture with Redis for caching, PostgreSQL for persistence, and React-based dashboard for visualization.',
    threatModel: 'Role-based access control with audit trails, encrypted data storage, and secure API communication.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'WebSocket'],
    icon: FiActivity,
    glow: 'green'
  },
  {
    id: '3',
    title: 'Network Security Monitor',
    description: 'Real-time network monitoring solution with deep packet inspection and automated vulnerability scanning capabilities.',
    category: 'Network Security',
    tags: ['Network', 'Monitoring', 'Scanning'],
    imageUrl: '/projects/network-monitor.jpg',
    githubUrl: 'https://github.com/kamal/network-monitor',
    demoUrl: 'https://network-monitor.oct4crypt.com',
    architecture: 'High-performance packet capture using libpcap, distributed processing with Apache Spark, and Grafana for visualization.',
    threatModel: 'Zero-trust network architecture with segmentation, encrypted communications, and continuous monitoring.',
    technologies: ['Go', 'libpcap', 'Apache Spark', 'Grafana', 'InfluxDB'],
    icon: FiTerminal,
    glow: 'purple'
  },
  {
    id: '4',
    title: 'Malware Analysis Framework',
    description: 'Comprehensive malware analysis framework supporting both static and dynamic analysis with automated reporting.',
    category: 'Automation',
    tags: ['Malware', 'Analysis', 'Automation'],
    imageUrl: '/projects/malware-framework.jpg',
    githubUrl: 'https://github.com/kamal/malware-framework',
    architecture: 'Sandboxed analysis environment with Cuckoo integration, YARA rule engine, and distributed processing nodes.',
    threatModel: 'Isolated analysis environments with strict access controls, encrypted sample storage, and secure result transmission.',
    technologies: ['Python', 'Cuckoo', 'YARA', 'Docker', 'MongoDB', 'Redis'],
    icon: FiLock,
    glow: 'green'
  },
  {
    id: '5',
    title: 'Security Audit Dashboard',
    description: 'Enterprise security audit dashboard with comprehensive compliance reporting and risk assessment capabilities.',
    category: 'Web Security',
    tags: ['Audit', 'Compliance', 'Dashboard'],
    imageUrl: '/projects/audit-dashboard.jpg',
    githubUrl: 'https://github.com/kamal/audit-dashboard',
    demoUrl: 'https://audit-dashboard.oct4crypt.com',
    architecture: 'Multi-tenant SaaS architecture with microservices, API gateway, and real-time data synchronization.',
    threatModel: 'GDPR and SOC2 compliance with data encryption, access logging, and secure authentication mechanisms.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    icon: FiCode,
    glow: 'blue'
  },
  {
    id: '6',
    title: 'Penetration Testing Toolkit',
    description: 'Professional penetration testing toolkit with automated vulnerability discovery and exploitation capabilities.',
    category: 'Automation',
    tags: ['Penetration Testing', 'Vulnerability', 'Toolkit'],
    imageUrl: '/projects/pen-testing-toolkit.jpg',
    githubUrl: 'https://github.com/kamal/pen-testing-toolkit',
    architecture: 'Modular plugin architecture with REST API, database-driven configuration, and parallel execution engine.',
    threatModel: 'Secure credential storage, encrypted communication channels, and comprehensive audit logging for compliance.',
    technologies: ['Python', 'Flask', 'SQLite', 'Docker', 'Nmap', 'Metasploit'],
    icon: FiShield,
    glow: 'purple'
  }
];

const categories = ['All', 'Web Security', 'SOC Tools', 'Network Security', 'Automation'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
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
            Cybersecurity
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              {" "}Projects
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced security projects showcasing cutting-edge threat detection and defense mechanisms
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
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 input rounded-lg border-red-500/30 focus:border-red-400"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <CyberCard
              key={project.id}
              glow={project.glow}
              delay={index * 0.1}
              className="h-full cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    project.glow === 'blue' ? 'from-cyan-500 to-blue-500' :
                    project.glow === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-lg flex items-center justify-center shadow-lg`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-3">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-xs rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 btn btn-outline text-sm"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 btn btn-secondary text-sm"
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
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      selectedProject.glow === 'blue' ? 'from-cyan-500 to-blue-500' :
                      selectedProject.glow === 'green' ? 'from-green-500 to-emerald-500' :
                      'from-purple-500 to-pink-500'
                    } rounded-xl flex items-center justify-center shadow-lg`}>
                      <selectedProject.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                      <span className="text-cyan-400">{selectedProject.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Architecture</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.architecture}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Threat Model</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.threatModel}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 btn btn-outline rounded-lg"
                      >
                        <FiGithub className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 btn btn-primary rounded-lg"
                      >
                        <FiExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
