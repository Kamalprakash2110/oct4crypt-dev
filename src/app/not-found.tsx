import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
          >
            <FiHome className="w-5 h-5" />
            Go Home
          </Link>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiSearch className="w-4 h-4" />
              Projects
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>Error Code: 404 - Page Not Found</p>
          <p className="mt-2">
            Oct4crypt - Securing the Digital World
          </p>
        </div>
      </motion.div>
    </div>
  );
}
