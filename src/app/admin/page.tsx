'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useFirebaseAuth';
import { useRouter } from 'next/navigation';

// Define UserRole locally to avoid importing from server-side model
type UserRole = 'OWNER' | 'TEAM' | 'GUEST';
import { motion } from 'framer-motion';
import { FiShield, FiActivity, FiUsers, FiEye, FiEdit, FiTrash2, FiUserPlus, FiSettings } from 'react-icons/fi';
import CyberCard from '@/components/ui/CyberCard';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin: string;
}

interface AuditLog {
  _id: string;
  userId: string;
  action: string;
  resource: string;
  resourceType: string;
  timestamp: string;
  details?: any;
}

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'members' | 'audit'>('overview');
  
  // Cursor tracking
  const cursorRef = useRef({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'OWNER') {
      toast.error('Access denied. Owner role required.');
      router.push('/');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, user, router]);

  // Cursor tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResponse = await fetch('/api/admin/users', {
        credentials: 'include'
      });
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.users || []);
      }

      // Fetch audit logs
      const auditResponse = await fetch('/api/admin/audit', {
        credentials: 'include'
      });
      
      if (auditResponse.ok) {
        const auditData = await auditResponse.json();
        setAuditLogs(auditData.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        toast.success('User role updated successfully');
        fetchDashboardData();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchDashboardData();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden admin-dashboard">
      {/* Cursor tracking effect */}
      <div
        className="cursor-trail"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isHovering ? 1 : 0.7,
        }}
      />
      
      {/* Glow effect following cursor */}
      <div
        className="cursor-glow"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />
      
      {/* Particle effects */}
      {isHovering && Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="cursor-particle"
          style={{
            left: `${cursorPosition.x + (Math.random() - 0.5) * 100}px`,
            top: `${cursorPosition.y + (Math.random() - 0.5) * 100}px`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiShield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-neue-machania)' }}>Admin Dashboard</h1>
          </div>
          <p className="text-gray-400" style={{ fontFamily: 'var(--font-neue-machania)' }}>
            Manage users, monitor activity, and control system settings
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: FiActivity },
            { id: 'users', label: 'Users', icon: FiUsers },
            { id: 'members', label: 'Members', icon: FiUserPlus },
            { id: 'audit', label: 'Audit Logs', icon: FiEye },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeSection === tab.id
                  ? 'admin-tab-active'
                  : 'admin-tab-hover'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CyberCard className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{users.length}</p>
                  </div>
                  <FiUsers className="w-8 h-8 text-cyan-400" />
                </div>
              </CyberCard>

              <CyberCard glow="green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Team Members</p>
                    <p className="text-2xl font-bold text-white">
                      {users.filter(u => u.role === 'TEAM').length}
                    </p>
                  </div>
                  <FiShield className="w-8 h-8 text-green-400" />
                </div>
              </CyberCard>

              <CyberCard glow="purple">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Recent Activity</p>
                    <p className="text-2xl font-bold text-white">{auditLogs.length}</p>
                  </div>
                  <FiActivity className="w-8 h-8 text-purple-400" />
                </div>
              </CyberCard>

              <CyberCard className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">System Status</p>
                    <p className="text-2xl font-bold text-green-400">Online</p>
                  </div>
                  <FiSettings className="w-8 h-8 text-cyan-400" />
                </div>
              </CyberCard>
            </div>
          )}

          {activeSection === 'users' && (
            <CyberCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiUsers className="w-6 h-6 text-cyan-400" />
                User Management
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 text-gray-400">Last Login</th>
                      <th className="text-left py-3 px-4 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-gray-400">{user.email}</td>
                        <td className="py-3 px-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value as any)}
                            className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded"
                            disabled={user._id === user._id}
                          >
                            <option value={'GUEST'}>Guest</option>
                            <option value={'TEAM'}>Team</option>
                            <option value={'OWNER'}>Owner</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              disabled={user._id === user._id}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CyberCard>
          )}

          {activeSection === 'members' && (
            <div className="space-y-6">
              <CyberCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiUserPlus className="w-6 h-6 text-green-400" />
                  Team Members
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Team Member Cards */}
                  <div className="admin-card p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FiUserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Kamal</h3>
                    <p className="text-green-400 text-sm mb-2">OWNER</p>
                    <p className="text-gray-400 text-sm mb-4">Lead Security Architect</p>
                    <div className="flex justify-center gap-2">
                      <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FiEdit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FiSettings className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="admin-card p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FiUserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Team Member</h3>
                    <p className="text-blue-400 text-sm mb-2">TEAM</p>
                    <p className="text-gray-400 text-sm mb-4">Security Analyst</p>
                    <div className="flex justify-center gap-2">
                      <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FiEdit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FiSettings className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="admin-card p-6 text-center border-2 border-dashed border-gray-600">
                    <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FiUserPlus className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400 mb-2">Add Member</h3>
                    <p className="text-gray-500 text-sm mb-4">Invite team member</p>
                    <button className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                      <FiUserPlus className="w-4 h-4 inline mr-2" />
                      Invite
                    </button>
                  </div>
                </div>
              </CyberCard>
              
              {/* Member Profile Editor */}
              <CyberCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiEdit className="w-5 h-5 text-green-400" />
                  Profile Editor
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-green-400 font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Enter display name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-400 font-medium mb-2">Bio</label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors h-24 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-400 font-medium mb-2">Skills</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="e.g., Security Analysis, Penetration Testing, SIEM"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-400 font-medium mb-2">GitHub</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="github username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 font-medium mb-2">LinkedIn</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="linkedin profile"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-green-400 font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                        <FiUserPlus className="w-6 h-6 text-gray-500" />
                      </div>
                      <button className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                        Upload Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Save Profile
                    </button>
                    <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </CyberCard>
            </div>
          )}

          {activeSection === 'audit' && (
            <CyberCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FiEye className="w-6 h-6 text-cyan-400" />
                Audit Logs
              </h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {auditLogs.map((log) => (
                  <div key={log._id} className="border-l-2 border-cyan-500/30 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">{log.action}</span>
                        <span className="text-gray-400 ml-2">on {log.resource}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      User ID: {log.userId} | Type: {log.resourceType}
                    </div>
                  </div>
                ))}
              </div>
            </CyberCard>
          )}
        </motion.div>
      </div>
    </div>
  );
}
