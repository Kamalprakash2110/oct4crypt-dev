'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useFirebaseAuth';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiEdit, FiCamera, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
    website: user?.website || '',
    location: user?.location || ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role === 'GUEST') {
      toast.error('Please login as a team member to access profile');
      router.push('/login');
      return;
    }
  }, [isAuthenticated, user, router]);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Here you would save to Firebase
      // await userService.updateUser(user!.uid, {
      //   ...profileData,
      //   skills: profileData.skills.split(',').map(s => s.trim()).filter(s => s)
      // });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would upload to Firebase Storage
      toast.success('Profile picture uploaded successfully!');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              {" "}Profile
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Manage your professional profile and team information
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sage-glass p-8 relative">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-16 h-16 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                      <FiCamera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.displayName}
                </h2>
                <p className="text-green-400 font-medium mb-4">
                  {user?.role}
                </p>
                <p className="text-gray-400 mb-6">
                  {user?.bio || 'No bio yet'}
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FiMail className="w-4 h-4 text-green-400" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.location && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiGlobe className="w-4 h-4 text-green-400" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-6">
                  {user?.github && (
                    <a
                      href={`https://github.com/${user.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FiGithub className="w-5 h-5 text-gray-400" />
                    </a>
                  )}
                  {user?.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FiLinkedin className="w-5 h-5 text-gray-400" />
                    </a>
                  )}
                  {user?.twitter && (
                    <a
                      href={`https://twitter.com/${user.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FiTwitter className="w-5 h-5 text-gray-400" />
                    </a>
                  )}
                  {user?.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FiGlobe className="w-5 h-5 text-gray-400" />
                    </a>
                  )}
                </div>
                
                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-6 py-2 px-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  {isEditing ? <FiX className="w-4 h-4" /> : <FiEdit className="w-4 h-4" />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Edit Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {isEditing && (
              <div className="sage-glass p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiEdit className="w-6 h-6 text-green-400" />
                  Edit Profile
                </h3>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="Enter your display name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-green-400 font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full px-4 py-2 sage-input h-32 resize-none"
                      placeholder="Tell us about yourself, your experience, and expertise..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-green-400 font-medium mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={profileData.skills}
                      onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                      className="w-full px-4 py-2 sage-input"
                      placeholder="e.g., Security Analysis, Penetration Testing, SIEM, Threat Hunting"
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Separate skills with commas
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        GitHub Username
                      </label>
                      <input
                        type="text"
                        value={profileData.github}
                        onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="github username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="text"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="linkedin profile name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        Twitter Handle
                      </label>
                      <input
                        type="text"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="@username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 font-medium mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="w-full px-4 py-2 sage-input"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 sage-button font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
