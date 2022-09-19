import React, { createContext, useCallback, useEffect, useMemo } from "react";
import { getCurrentUserAPI } from "api/Auth";
import { UserType } from "types/User.type";
import { LoadingSpin } from "components/LoadingSpin";

interface Props {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  reAuth: () => Promise<void>;
}

export const AuthContext = createContext<Props>({
  user: null,
  isAuthenticated: false,
  loading: true,
  reAuth: () => Promise.resolve(),
});

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [loading, setLoading] = React.useState(true);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getCurrentUserAPI();
      setUser(data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        ...useMemo(
          () => ({
            user: user,
            isAuthenticated: !!user,
            loading: !user,
          }),
          [user]
        ),
        reAuth: getCurrentUser,
      }}
    >
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <LoadingSpin />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
