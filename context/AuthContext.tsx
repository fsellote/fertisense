import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// 👤 User type definition
export type User = {
  name: string;
  email?: string;
  role: 'admin' | 'stakeholder' | 'guest';
  address?: string;
  farmLocation?: string;
  mobile?: string;
  profileImage?: string | null;
};

// 🔒 Auth context type
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
};

// 📦 Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🧠 AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 📥 Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  // 🔐 Login
  const login = async (userData: User) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 🔓 Logout
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 🔄 Update user
  const updateUser = async (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = { ...prevUser, ...updatedFields };
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪝 Hook for consuming auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
