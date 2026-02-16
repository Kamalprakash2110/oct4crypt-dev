'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShield, FiArrowRight, FiCode, FiLock, FiActivity, FiTerminal } from 'react-icons/fi';
import CyberCard from '@/components/ui/CyberCard';
import Logo from '@/components/ui/Logo';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="mb-8"
            >
              <Logo size="lg" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-scifi)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}
            >
              Securing the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">
                Digital World
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-neue-machania)' }}
            >
              One Layer at a Time
              <span className="block text-cyan-400 mt-2">
                Cybersecurity tools, projects, and insights by Kamal and team Oct4crypt
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary flex items-center justify-center gap-2 group px-8 py-4"
                >
                  Explore Projects
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-glass flex items-center justify-center gap-2 px-8 py-4"
                >
                  Contact Me
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cybersecurity
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                {" "}Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized in modern security challenges and defensive strategies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiActivity,
                title: 'SOC Analysis',
                description: 'Real-time security monitoring and incident response with advanced SIEM integration.',
                glow: 'blue' as const,
                delay: 0.1
              },
              {
                icon: FiLock,
                title: 'Threat Detection',
                description: 'Proactive threat hunting and malware analysis using cutting-edge security tools.',
                glow: 'green' as const,
                delay: 0.2
              },
              {
                icon: FiTerminal,
                title: 'Security Automation',
                description: 'Custom scripts and tools for automated security workflows and vulnerability assessment.',
                glow: 'purple' as const,
                delay: 0.3
              },
              {
                icon: FiCode,
                title: 'Secure Development',
                description: 'Building security-first applications with modern development practices.',
                glow: 'blue' as const,
                delay: 0.4
              },
              {
                icon: FiShield,
                title: 'Blue Team Operations',
                description: 'Defensive security strategies and incident response planning for enterprise environments.',
                glow: 'green' as const,
                delay: 0.5
              },
              {
                icon: FiActivity,
                title: 'Network Security',
                description: 'Network monitoring, intrusion detection, and security architecture design.',
                glow: 'purple' as const,
                delay: 0.6
              }
            ].map((feature, index) => (
              <CyberCard
                key={index}
                glow={feature.glow}
                delay={feature.delay}
                className="h-full"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    feature.glow === 'blue' ? 'from-cyan-500 to-blue-500' :
                    feature.glow === 'green' ? 'from-green-500 to-emerald-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </CyberCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <CyberCard glow="green" className="text-center p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Level Up Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                  {" "}Security Game?
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Explore cutting-edge security tools and insights from the front lines of cybersecurity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apps">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-cyber flex items-center justify-center gap-2 px-8 py-4"
                  >
                    Browse Security Tools
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </CyberCard>
        </div>
      </section>
    </div>
  );
}
