import { createContext, useState, FC } from 'react';

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
