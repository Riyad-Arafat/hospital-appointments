import { useCallback, useContext, useMemo } from "react";
import { loginAPI, logoutAPI } from "api/Auth";
import { AuthContext } from "contexts/AuthContext";
import { LoginProps } from "types/Auth.type";

const useAuth = () => {
  const { user, loading, isAuthenticated, reAuth } = useContext(AuthContext);

  const login = useCallback(
    async (values: LoginProps) => {
      try {
        const { data, status } = await loginAPI(values);
        status === 200 && localStorage.setItem("token", data.token);
        await reAuth();
        return data;
      } catch (error) {
        throw Error("Please check your email and password");
      }
    },
    [reAuth]
  );

  const logout = useCallback(async () => {
    try {
      const { status } = await logoutAPI();
      status === 200 && localStorage.removeItem("token");
      await reAuth();
      return "Logout successfully";
    } catch (error) {
      return "Something went wrong";
    }
  }, [reAuth]);

  return {
    login,
    logout,
    reAuth,
    ...useMemo(
      () => ({
        user,
        loading,
        isAuthenticated,
      }),
      [user, loading, isAuthenticated]
    ),
  };
};

export default useAuth;
