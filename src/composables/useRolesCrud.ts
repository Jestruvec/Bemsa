import { ref } from "vue";
import { supabase, tableNames } from "@/utils";
import type { Role } from "@/types";

const tableName = tableNames.roles;

export const useRolesCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetch = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: roles, error: fetchError } = await supabase
        .from(tableName)
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = roles || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      let { data: role, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(role);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const post = async (roleData: Role) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: role, error: postError } = await supabase
        .from(tableName)
        .insert([roleData]);

      if (postError) throw new Error(postError.message);

      data.value.push(role);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const put = async (id: string, roleData: Role) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: updatedRole, error: putError } = await supabase
        .from(tableName)
        .update(roleData)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((txt: any) =>
        txt.id === id ? updatedRole : txt
      );
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq("id", id);

      if (deleteError) throw new Error(deleteError.message);

      data.value = data.value.filter((profile: any) => profile.id !== id);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    fetch,
    fetchById,
    post,
    put,
    remove,
    loading,
    error,
    data,
  };
};
