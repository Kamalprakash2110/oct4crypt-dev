'use client';

import { AuthProvider } from '@/hooks/useFirebaseAuth';
import { useEffect, useState } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, just render children without AuthProvider
  if (!isClient) {
    return <>{children}</>;
  }

  // After hydration, wrap with AuthProvider
  return <AuthProvider>{children}</AuthProvider>;
}
