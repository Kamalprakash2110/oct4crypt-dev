'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShield, FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Apps' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://github.com/kamal', label: 'GitHub', icon: FiGithub },
  { href: 'https://linkedin.com/in/kamal', label: 'LinkedIn', icon: FiLinkedin },
  { href: 'mailto:kamal@oct4crypt.com', label: 'Email', icon: FiMail },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 border-t border-cyan-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9c_1px,transparent_1px),linear-gradient(to_bottom,#00ff9c_1px,transparent_1px)] bg-[size:50px_50px] opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Link href="/" className="inline-flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25"
                >
                  <FiShield className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  oct4crypt
                </span>
              </Link>
              
              <p className="text-gray-400 text-sm max-w-md">
                Think Secure. Build Smart. <br />
                Cybersecurity tools, projects, and insights by Kamal.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Legal */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Kamal – All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Built with</span>
              <span className="text-cyan-400">❤️</span>
              <span>and</span>
              <span className="text-green-400">⚡</span>
              <span>for the cybersecurity community</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
