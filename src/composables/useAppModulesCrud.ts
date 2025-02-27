import { ref } from "vue";
import { supabase } from "@/utils";

export const useAppModulesCrud = () => {
  const loading = ref(true);
  const error = ref<string | null>(null);
  const data = ref<any[] | null>([]);

  const fetchAppModules = async () => {
    loading.value = true;
    error.value = null;

    try {
      let { data: app_modules, error: fetchError } = await supabase
        .from("app_modules")
        .select("*");

      if (fetchError) throw new Error(fetchError.message);

      data.value = app_modules || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, data, error, fetchAppModules };
};
