import { ref } from "vue";

const showNavDrawer = ref(true);

export function useNavDrawer() {
  return { showNavDrawer };
}
