import { ref } from "vue";
import { supabase, tableNames } from "@/utils";
import type { Approval } from "@/types";
import type { TxtStatusEnum } from "@/enums";
import { useAuth } from "@/composables";

const tableName = tableNames.approvals;

export const useApprovalsCrud = () => {
  const { user } = useAuth();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetch = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: approvals, error: fetchError } = await supabase
        .from(tableName)
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = approvals || [];
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
      let { data: approval, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(approval);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const post = async (approvalData: Approval) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: approval, error: postError } = await supabase
        .from(tableName)
        .insert([approvalData]);

      if (postError) throw new Error(postError.message);

      data.value.push(approval);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const put = async (id: string, newStatus: TxtStatusEnum) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: updatedApproval, error: putError } = await supabase
        .from(tableName)
        .update({ status: newStatus, userId: user.value.id })
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((txt: any) =>
        txt.id === id ? updatedApproval : txt
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
