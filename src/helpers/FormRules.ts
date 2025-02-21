export const FormRules = {
  required: (value: string) => !!value || "Requerido",
  max_length: (max: number) => (value: string) =>
    !value || value.length <= max || `Máximo ${max} caracteres`,
  emailFormat: (value: string) =>
    !value ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    "Formato de email inválido",
  passwordMatch: (password: string) => (value: string) =>
    !password || !value || password === value || "Las contrasenas no coinciden",
};
