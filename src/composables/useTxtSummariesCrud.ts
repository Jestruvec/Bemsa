import { ref } from "vue";
import { supabase, tableNames } from "@/utils";
import type { TxtSummary } from "@/types";

const tableName = tableNames.txt_summaries;

export const useTxtSummariesCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetchTxtSummaries = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txtSummaries, error: fetchError } = await supabase
        .from(tableName)
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = txtSummaries || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchTxtSummaryById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txtSummary, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(txtSummary);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const postTxtSummary = async (txtSummaryData: TxtSummary) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: txtSummary, error: postError } = await supabase
        .from(tableName)
        .insert([txtSummaryData]);

      if (postError) throw new Error(postError.message);

      data.value.push(txtSummary);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const putTxtSummary = async (id: string, txtSummaryData: TxtSummary) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: updatedTxtSummary, error: putError } = await supabase
        .from(tableName)
        .update(txtSummaryData)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((txt: any) =>
        txt.id === id ? updatedTxtSummary : txt
      );
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteTxtSummary = async (id: string) => {
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
    fetchTxtSummaries,
    fetchTxtSummaryById,
    postTxtSummary,
    putTxtSummary,
    deleteTxtSummary,
    loading,
    error,
    data,
  };
};
