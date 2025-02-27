import { ref } from "vue";
import { supabase } from "@/utils/supabase";
import type { Txt } from "@/types";
import { useApprovalsCrud } from "@/composables";
import { TxtStatusEnum } from "@/enums";

export const useTxtsCrud = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<any[]>([]);

  const fetch = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: txts, error: fetchError } = await supabase.from("txts")
        .select(`
        *,
        txt_headers (
          id,
          type,
          sequenceNumber,
          date,
          consecutive
        ),
        txt_summaries (
          id,
          type,
          sequenceNumber,
          totalOperations,
          totalOperationsAmount
        ),
        txt_details (
          id,
          alias,
          type,
          sequenceNumber,
          emisorAccountType,
          emisorAccountNumber,
          currencyCode,
          receivingBank,
          amount,
          aplicationDate,
          paymentMethod,
          receiverAccountType,
          receiverAccountNumber,
          filler,
          reference,
          speiSpidReference,
          operationClass
        ),
        approvals (
          id,
          status,
          created_at,
          user_profiles (
            name,
            lastName,
            avatarUrl
          )
        ),
        user_profiles (
          name,
          lastName,
          avatarUrl
        )
      `);

      if (fetchError) throw new Error(fetchError.message);

      data.value = txts || [];
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
      let { data: txt, error: fetchError } = await supabase
        .from("txts")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      data.value.push(txt);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const post = async (txtData: Txt) => {
    loading.value = true;
    error.value = null;

    try {
      const { txt_headers, txt_details, txt_summaries, ...rest } = txtData;
      const { data: txt, error: postError } = await supabase
        .from("txts")
        .insert([rest])
        .select();

      if (postError) throw new Error(postError.message);

      const id = txt[0]?.id;

      if (!id) {
        throw new Error("No se pudo obtener el ID del nuevo txt");
      }

      await supabase.from("txt_headers").insert([{ ...txt_headers, id }]);
      await supabase
        .from("txt_details")
        .insert(txt_details.map((detail) => ({ ...detail, txtId: id })));
      await supabase.from("txt_summaries").insert([{ ...txt_summaries, id }]);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const put = async (id: string, txtData: Txt) => {
    loading.value = true;
    error.value = null;

    try {
      const {
        txt_headers,
        txt_details,
        txt_summaries,
        approvals,
        user_profiles,
        ...rest
      } = txtData;
      const { error: putError } = await supabase
        .from("txts")
        .update(rest)
        .eq("id", id);

      if (putError) throw new Error(putError.message);

      if (txtData.approvals) {
        const { put, error: putApprovalError } = useApprovalsCrud();

        await put(txtData.approvals.id, TxtStatusEnum.waiting);
        if (putApprovalError.value) throw new Error(putApprovalError.value);
      }

      const { error: putTxtHeaderError } = await supabase
        .from("txt_headers")
        .update(txt_headers)
        .eq("id", id);
      if (putTxtHeaderError) throw new Error(putTxtHeaderError.message);

      for (const detail of txt_details) {
        if (detail.id) {
          const { error: putTxtDetailError } = await supabase
            .from("txt_details")
            .update(detail)
            .eq("id", detail.id);

          if (putTxtDetailError) throw new Error(putTxtDetailError.message);
        } else {
          const { error: postTxtDetailError } = await supabase
            .from("txt_details")
            .insert({ ...detail, txtId: txtData.id });

          if (postTxtDetailError) throw new Error(postTxtDetailError.message);
        }
      }

      const { error: putTxtSummaryError } = await supabase
        .from("txt_summaries")
        .update(txt_summaries)
        .eq("id", id);
      if (putTxtSummaryError) throw new Error(putTxtSummaryError.message);
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
        .from("txts")
        .delete()
        .eq("id", id);

      if (deleteError) throw new Error(deleteError.message);
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
