import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface IAuthDataState {
  token: string;
  profile: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  provider: boolean;
  admin: boolean;
  banned: boolean;
  created_at: Date;
  updated_at: Date;
  avatar_url: string;
}

interface IAuthContextData {
  profile: IUser;
  loading: boolean;
  updateUser(profile: IUser): Promise<void>;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthDataState>(
    {} as IAuthDataState,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, profile] = await AsyncStorage.multiGet([
        '@GoyazBarber:token',
        '@GoyazBarber:profile',
      ]);

      if (token[1] && profile[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setAuthData({ token: token[1], profile: JSON.parse(profile[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const deviceId =
      (await AsyncStorage.getItem('@GoyazBarber:device-id')) || '';

    const response = await api.post('sessions', {
      email,
      password,
      device_id: JSON.parse(deviceId),
    });

    const { token } = response.data;
    const profile: IUser = response.data.user;

    await AsyncStorage.multiSet([
      ['@GoyazBarber:token', token],
      ['@GoyazBarber:profile', JSON.stringify(profile)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, profile });
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);

    await AsyncStorage.multiRemove([
      '@GoyazBarber:token',
      '@GoyazBarber:profile',
    ]);

    setAuthData({} as IAuthDataState);

    setLoading(false);
  }, []);

  const updateUser = useCallback(
    async (profile: IUser) => {
      await AsyncStorage.setItem(
        '@GoyazBarber:profile',
        JSON.stringify(profile),
      );

      setAuthData({
        token: authData.token,
        profile,
      });
    },
    [authData.token],
  );

  return (
    <AuthContext.Provider
      value={{
        profile: authData.profile,
        loading,
        updateUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Usuário não está autenticado.');
  }

  return context;
}

export { AuthProvider, useAuth };
