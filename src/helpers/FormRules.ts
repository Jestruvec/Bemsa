export const FormRules = {
  required: (value: string) => !!value || "Requerido",
  max_length: (max: number) => (value: string) =>
    !value || value.length <= max || `Máximo ${max} caracteres`,
};
