import { ref } from "vue";
import { supabase } from "@/utils/supabase";
import type { User } from "@/types";
import { useAuth } from "@/composables";

const { user, error: authError, register, updateAuth } = useAuth();

export const useUserProfilesCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetchUserProfiles = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data: userProfiles, error: fetchError } = await supabase.from(
        "user_profiles"
      ).select(`
          *,
          roles (
            name,
            id
          )  
        `);

      if (fetchError) throw new Error(fetchError.message);

      data.value = userProfiles || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserProfileById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      let { data: user_profile, error: fetchError } = await supabase
        .from("user_profiles")
        .select(
          `
          *,
          roles (
            name,
            id
          )  
        `
        )
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(user_profile);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const postUserProfile = async (profileData: User) => {
    loading.value = true;
    error.value = null;

    try {
      const { password, ...rest } = profileData;

      await register(profileData.email, password);
      if (authError.value) throw new Error(authError.value);

      const { data: newProfile, error: postError } = await supabase
        .from("user_profiles")
        .insert([{ ...rest, id: user.value.id }]);
      if (postError) throw new Error(postError.message);

      data.value.push(newProfile);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const putUserProfile = async (
    id: string,
    profileData: User,
    updateAuthData?: boolean
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const { password, roles, ...rest } = profileData;

      if (updateAuthData) {
        await updateAuth(profileData.email, password);
        if (authError.value) throw new Error(authError.value);
      }

      const { data: updatedProfile, error: putError } = await supabase
        .from("user_profiles")
        .update(rest)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((profile: any) =>
        profile.id === id ? updatedProfile : profile
      );
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteUserProfile = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { error: deleteError } = await supabase
        .from("user_profiles")
        .delete()
        .eq("id", id);

      if (deleteError) throw new Error(deleteError.message);

      data.value = data.value.filter((profile: any) => profile.id !== id); // Filtramos el perfil eliminado
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchUserProfiles,
    fetchUserProfileById,
    postUserProfile,
    putUserProfile,
    deleteUserProfile,
    loading,
    error,
    data,
  };
};
