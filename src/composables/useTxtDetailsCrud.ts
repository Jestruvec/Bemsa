import { ref } from "vue";
import { supabase, tableNames } from "@/utils";
import type { TxtDetail } from "@/types";

const tableName = tableNames.txt_details;

export const useTxtDetailsCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetchTxtDetails = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txtDetails, error: fetchError } = await supabase
        .from(tableName)
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = txtDetails || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchTxtDetailById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txtDetail, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(txtDetail);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const postTxtDetail = async (txtDetailData: TxtDetail) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: txtDetail, error: postError } = await supabase
        .from(tableName)
        .insert([txtDetailData]);

      if (postError) throw new Error(postError.message);

      data.value.push(txtDetail);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const putTxtDetail = async (id: string, txtDetailData: TxtDetail) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: updatedTxtDetail, error: putError } = await supabase
        .from(tableName)
        .update(txtDetailData)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((txt: any) =>
        txt.id === id ? updatedTxtDetail : txt
      );
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteTxtDetail = async (id: string) => {
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
    fetchTxtDetails,
    fetchTxtDetailById,
    postTxtDetail,
    putTxtDetail,
    deleteTxtDetail,
    loading,
    error,
    data,
  };
};
