import React, { createContext, useCallback, useEffect } from "react";
import { getCurrentUserAPI } from "src/api/Auth";
import { UserType } from "src/types/User.type";

interface Props {
  user: UserType | null;
  loading: boolean;
}

export const AuthContext = createContext<Props>({
  user: null,
  loading: true,
});

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  const getCurrentUser = useCallback(async () => {
    try {
      const { data } = await getCurrentUserAPI();
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={React.useMemo(() => {
        return {
          user: user,
          loading: !user,
        };
      }, [user])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
