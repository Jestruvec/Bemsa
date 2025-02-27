import { ref } from "vue";

const showNavDrawer = ref(true);

export function useNavDrawer() {
  const toggleNavDrawer = () => {
    showNavDrawer.value = !showNavDrawer.value;
  };

  return { showNavDrawer, toggleNavDrawer };
}
