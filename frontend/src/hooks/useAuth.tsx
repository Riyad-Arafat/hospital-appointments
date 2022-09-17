import { useCallback, useContext, useMemo } from "react";
import { loginAPI, logoutAPI } from "src/api/Auth";
import { AuthContext } from "src/contexts/AuthContext";
import { LoginProps } from "src/types/Auth.type";

const useAuth = () => {
  const { user, loading } = useContext(AuthContext);

  const login = useCallback(async (values: LoginProps) => {
    try {
      const { data, status } = await loginAPI(values);
      status === 200 && localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return "Please check your email and password";
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { status } = await logoutAPI();
      status === 200 && localStorage.removeItem("token");
      return "Logout successfully";
    } catch (error) {
      return "Something went wrong";
    }
  }, []);

  return useMemo(() => {
    return {
      user,
      loading,
      login,
      logout,
    };
  }, [user, loading, login, logout]);
};

export default useAuth;
