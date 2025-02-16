interface NavItem {
  id: string;
  description: string;
  url: string;
  icon: string;
  children?: NavItem[];
}

export const UserSystemModules: NavItem[] = [
  {
    id: new Date().toString().randomUUID(),
    description: "Administracion",
    url: "/administration",
    icon: "mdi-table",
    children: [
      {
        id: new Date().toString().randomUUID(),
        description: "Usuarios",
        url: "/administration/users",
        icon: "mdi-account-multiple",
      },
      {
        id: new Date().toString().randomUUID(),
        description: "Roles",
        url: "/administration/roles",
        icon: "mdi-account-cog",
      },
      {
        id: new Date().toString().randomUUID(),
        description: "Txt",
        url: "/administration/txt",
        icon: "mdi-text-account",
      },
    ],
  },
];
