"use client";

import React, { useEffect, useState } from "react";
import { clientAuth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await setPersistence(clientAuth, browserSessionPersistence);

        const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
          if (user) {
            setIsAuthenticated(true);
            console.log(clientAuth.currentUser);
          } else {
            setIsAuthenticated(false);
            router.push("sign-in");
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting persistence:", error);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, [router]);

  if (isAuthenticated === null || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default Auth;
