import { ref } from "vue";
import type { Role } from "@/types";

export const RolesArray = ref<Role[]>([
  {
    id: "1",
    name: "Administrator",
    description: "",
    permissions: [],
  },
  {
    id: "2",
    name: "Dinamico",
    description: "",
    permissions: [],
  },
]);
