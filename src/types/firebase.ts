export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'OWNER' | 'TEAM' | 'GUEST';
  photoURL?: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  location?: string;
  joinedAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  status: 'unread' | 'read' | 'replied';
  repliedAt?: Date;
  replyMessage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  coverImage?: string;
  tags: string[];
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  author: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  downloadUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  icon?: string;
  screenshots: string[];
  technologies: string[];
  author: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}
