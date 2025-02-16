export const FormRules = {
  required: (value: string | number) => {
    if (typeof value === "string") {
      return !!value || "Requerido";
    } else {
      return value >= 0 || "Requerido";
    }
  },
  max_length: (max: number) => (value: string) =>
    String(value)?.length <= max || `Máximo ${max} caracteres`,
};
