import { ref } from "vue";
import { supabase } from "@/utils/supabase";
import { storageService } from "@/services/storage";

export function useAuth() {
  const user = ref<any>(storageService.getItem("user") || null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const register = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: registerError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (registerError) throw registerError;

      user.value = data.user;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (loginError) throw loginError;

      user.value = data.user;
      storageService.setItem("user", data.user);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;

      user.value = null;
      storageService.removeItem("user");
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const recoverPassword = async (email: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { error: recoverError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: "http://localhost:5173/reset-password",
        }
      );
      if (recoverError) throw recoverError;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updateAuth = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { error: updateUserError } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (updateUserError) throw updateUserError;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    recoverPassword,
    updateAuth,
  };
}
