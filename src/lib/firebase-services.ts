import { 
  doc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp,
  serverTimestamp,
  setDoc,
  increment
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { User, ContactMessage, BlogPost, Project, App } from '@/types/firebase';

// Convert Firestore Timestamp to Date
const timestampToDate = (timestamp: Timestamp | Date): Date => {
  return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
};

// Convert Date to Firestore Timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// User Services
export const userService = {
  async createUser(uid: string, userData: Omit<User, 'uid' | 'joinedAt' | 'lastLogin'>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...userData,
      joinedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isActive: true
    });
  },

  async getUser(uid: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return null;
    
    const data = userDoc.data();
    return {
      uid: userDoc.id,
      ...data,
      joinedAt: timestampToDate(data.joinedAt),
      lastLogin: timestampToDate(data.lastLogin)
    } as User;
  },

  async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        joinedAt: timestampToDate(data.joinedAt),
        lastLogin: timestampToDate(data.lastLogin)
      } as User;
    });
  },

  async uploadProfilePicture(uid: string, file: File): Promise<string> {
    const storageRef = ref(storage, `profile-pictures/${uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user profile with new photo URL
    await this.updateUser(uid, { photoURL: downloadURL });
    
    return downloadURL;
  }
};

// Contact Message Services
export const contactService = {
  async createMessage(messageData: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>): Promise<string> {
    const messageRef = await addDoc(collection(db, 'contact-messages'), {
      ...messageData,
      timestamp: serverTimestamp(),
      status: 'unread'
    });
    return messageRef.id;
  },

  async getAllMessages(): Promise<ContactMessage[]> {
    const messagesSnapshot = await getDocs(
      query(collection(db, 'contact-messages'), orderBy('timestamp', 'desc'))
    );
    return messagesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: timestampToDate(data.timestamp),
        repliedAt: data.repliedAt ? timestampToDate(data.repliedAt) : undefined
      } as ContactMessage;
    });
  },

  async updateMessageStatus(id: string, status: ContactMessage['status'], replyMessage?: string): Promise<void> {
    const messageRef = doc(db, 'contact-messages', id);
    const updateData: any = { status };
    
    if (status === 'replied') {
      updateData.repliedAt = serverTimestamp();
      updateData.replyMessage = replyMessage;
    }
    
    await updateDoc(messageRef, updateData);
  }
};

// Blog Post Services
export const blogService = {
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): Promise<string> {
    const postRef = await addDoc(collection(db, 'blog-posts'), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      likes: 0
    });
    return postRef.id;
  },

  async getAllPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
    const q = publishedOnly 
      ? query(collection(db, 'blog-posts'), where('published', '==', true), orderBy('createdAt', 'desc'))
      : query(collection(db, 'blog-posts'), orderBy('createdAt', 'desc'));
    
    const postsSnapshot = await getDocs(q);
    return postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt)
      } as BlogPost;
    });
  },

  async getPost(id: string): Promise<BlogPost | null> {
    const postDoc = await getDoc(doc(db, 'blog-posts', id));
    if (!postDoc.exists()) return null;
    
    const data = postDoc.data();
    return {
      id: postDoc.id,
      ...data,
      createdAt: timestampToDate(data.createdAt),
      updatedAt: timestampToDate(data.updatedAt)
    } as BlogPost;
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    const postRef = doc(db, 'blog-posts', id);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, 'blog-posts', id));
  },

  async incrementViews(id: string): Promise<void> {
    const postRef = doc(db, 'blog-posts', id);
    await updateDoc(postRef, { views: increment(1) });
  },

  async toggleLike(id: string, userId: string): Promise<void> {
    const postRef = doc(db, 'blog-posts', id);
    const likeRef = doc(db, `blog-posts/${id}/likes`, userId);
    const likeDoc = await getDoc(likeRef);
    
    if (likeDoc.exists()) {
      await deleteDoc(likeRef);
      await updateDoc(postRef, { likes: increment(-1) });
    } else {
      await setDoc(likeRef, { userId, createdAt: serverTimestamp() });
      await updateDoc(postRef, { likes: increment(1) });
    }
  }
};

// Project Services
export const projectService = {
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return projectRef.id;
  },

  async getAllProjects(publishedOnly: boolean = true): Promise<Project[]> {
    const q = publishedOnly 
      ? query(collection(db, 'projects'), where('status', '==', 'published'), orderBy('createdAt', 'desc'))
      : query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    const projectsSnapshot = await getDocs(q);
    return projectsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt)
      } as Project;
    });
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, 'projects', id));
  }
};

// App Services
export const appService = {
  async createApp(appData: Omit<App, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const appRef = await addDoc(collection(db, 'apps'), {
      ...appData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return appRef.id;
  },

  async getAllApps(publishedOnly: boolean = true): Promise<App[]> {
    const q = publishedOnly 
      ? query(collection(db, 'apps'), where('status', '==', 'published'), orderBy('createdAt', 'desc'))
      : query(collection(db, 'apps'), orderBy('createdAt', 'desc'));
    
    const appsSnapshot = await getDocs(q);
    return appsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt)
      } as App;
    });
  },

  async updateApp(id: string, updates: Partial<App>): Promise<void> {
    const appRef = doc(db, 'apps', id);
    await updateDoc(appRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  async deleteApp(id: string): Promise<void> {
    await deleteDoc(doc(db, 'apps', id));
  }
};
