interface NavItem {
  id: string;
  description: string;
  url: string;
  icon: string;
  children?: NavItem[];
}

export const UserSystemModules: NavItem[] = [
  {
    id: crypto.randomUUID(),
    description: "Administracion",
    url: "/administration",
    icon: "mdi-table",
    children: [
      {
        id: crypto.randomUUID(),
        description: "Usuarios",
        url: "/administration/users",
        icon: "mdi-account-multiple",
      },
      {
        id: crypto.randomUUID(),
        description: "Roles",
        url: "/administration/roles",
        icon: "mdi-account-cog",
      },
      {
        id: crypto.randomUUID(),
        description: "Txt",
        url: "/administration/txt",
        icon: "mdi-text-account",
      },
    ],
  },
];
