import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'student' | 'employer' | null;

interface AuthContextType {
  userRole: UserRole;
  isAuthenticated: boolean;
  loginAsStudent: () => void;
  loginAsEmployer: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('mockUserRole') as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const loginAsStudent = () => {
    setUserRole('student');
    localStorage.setItem('mockUserRole', 'student');
  };

  const loginAsEmployer = () => {
    setUserRole('employer');
    localStorage.setItem('mockUserRole', 'employer');
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem('mockUserRole');
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        isAuthenticated: userRole !== null,
        loginAsStudent,
        loginAsEmployer,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
