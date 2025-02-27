export const tableNames = {
  app_modules: "app_modules",
  approvals: "approvals",
  roles: "roles",
  txt_details: "txt_details",
  txt_headers: "txt_headers",
  txt_summaries: "txt_summaries",
  txts: "txts",
  user_profile_modules: "user_profile_modules",
  user_profiles: "user_profiles",
} as const;

export type TableName = keyof typeof tableNames;
