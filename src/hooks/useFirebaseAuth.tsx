'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { userService } from '@/lib/firebase-services';
import { User } from '@/types/firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginAsGuest: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Convert Firebase user to our User type
  const firebaseUserToUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
    try {
      const userData = await userService.getUser(firebaseUser.uid);
      
      if (userData) {
        // Update last login
        await userService.updateUser(firebaseUser.uid, { lastLogin: new Date() });
        return userData;
      } else {
        // Create user if doesn't exist
        const newUser: Omit<User, 'uid' | 'joinedAt' | 'lastLogin'> = {
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
          role: 'GUEST', // Default role, will be updated by admin
          photoURL: firebaseUser.photoURL || undefined,
          bio: '',
          skills: [],
          github: '',
          linkedin: '',
          twitter: '',
          website: '',
          location: '',
          isActive: true
        };
        
        await userService.createUser(firebaseUser.uid, newUser);
        return await userService.getUser(firebaseUser.uid);
      }
    } catch (error) {
      console.error('Error converting Firebase user:', error);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      if (firebaseUser) {
        const userData = await firebaseUserToUser(firebaseUser);
        if (userData) {
          setUser(userData);
          toast.success('Login successful!');
          return { success: true };
        }
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const loginAsGuest = () => {
    // Create a guest user object for local state
    const guestUser: User = {
      uid: 'guest',
      email: 'oct4crypt@gmail.com',
      displayName: 'Guest User',
      role: 'GUEST',
      bio: '',
      skills: [],
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
      location: '',
      joinedAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    };
    
    setUser(guestUser);
    toast.success('Logged in as guest');
  };

  const refreshUser = async () => {
    if (user && user.uid !== 'guest') {
      const updatedUser = await userService.getUser(user.uid);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      
      if (firebaseUser) {
        const userData = await firebaseUserToUser(firebaseUser);
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    loginAsGuest,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
