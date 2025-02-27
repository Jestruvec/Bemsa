import { ref } from "vue";
import { supabase, tableNames } from "@/utils";
import type { TxtHeader } from "@/types";

const tableName = tableNames.txt_headers;

export const useTxtHeadersCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetchTxtHeaders = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txt_headers, error: fetchError } = await supabase
        .from(tableName)
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = txt_headers || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchTxtHeaderById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txtHeader, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(txtHeader);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const postTxtHeader = async (txtHeaderData: TxtHeader) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: txtHeader, error: postError } = await supabase
        .from(tableName)
        .insert([txtHeaderData]);

      if (postError) throw new Error(postError.message);

      data.value.push(txtHeader);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const putTxtHeader = async (id: string, txtHeaderData: TxtHeader) => {
    loading.value = true;
    error.value = null;

    try {
      const { data: updatedTxtHeader, error: putError } = await supabase
        .from(tableName)
        .update(txtHeaderData)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      data.value = data.value.map((txt: any) =>
        txt.id === id ? updatedTxtHeader : txt
      );
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteTxtHeader = async (id: string) => {
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
    fetchTxtHeaders,
    fetchTxtHeaderById,
    postTxtHeader,
    putTxtHeader,
    deleteTxtHeader,
    loading,
    error,
    data,
  };
};
