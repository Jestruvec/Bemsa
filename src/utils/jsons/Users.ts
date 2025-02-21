import { ref } from "vue";
import type { User } from "@/types";

export const Users = ref<User[]>([
  {
    id: "2",
    email: "johnwick@gmail.com",
    name: "John",
    lastName: "Wick",
    password: "123",
    roleId: "1",
    imgUrl:
      "https://elcomercio.pe/resizer/v2/CZYHJJPYRJEC7KR5ZZLX7GDYSY.jpg?auth=a97e3c74dde8e62fe605c8429745992f2ad9bbb3805fb18ce666c2043bdc18f0&width=1200&height=810&quality=90&smart=true",
    role: {
      id: "1",
      description: "",
      name: "Admin",
      permissions: [],
    },
  },
  {
    id: "1",
    email: "dwaynejohnson@gmail.com",
    name: "Dwayne",
    lastName: "Johnson",
    password: "123",
    roleId: "2",
    imgUrl: "",
    role: {
      id: "2",
      description: "",
      name: "Dinamico",
      permissions: [],
    },
  },
  {
    id: "3",
    email: "tonystark@gmail.com",
    name: "Tony",
    lastName: "Stark",
    password: "123",
    roleId: "2",
    imgUrl:
      "https://preview.redd.it/x8aaxbjh8r6a1.jpg?auto=webp&s=4ef3171b50ac01823da12dddc2bde4968f598dff",
    role: {
      id: "2",
      description: "",
      name: "Dinamico",
      permissions: [],
    },
  },
  {
    id: "4",
    email: "peterparker@gmail.com",
    name: "Peter",
    lastName: "Parker",
    password: "123",
    roleId: "3",
    imgUrl:
      "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/F5PQN4NOFBEJNPF7XXESLIKH5E.jpg",
    role: {
      id: "3",
      description: "",
      name: "Dinamico",
      permissions: [],
    },
  },
  {
    id: "5",
    email: "brucewayne@gmail.com",
    name: "Bruce",
    lastName: "Wayne",
    password: "123",
    roleId: "1",
    imgUrl:
      "https://queenstudios.shop/cdn/shop/files/3.QueenStudiosBruceWayne_620x.png?v=1727835010",
    role: {
      id: "1",
      description: "",
      name: "Dinamico",
      permissions: [],
    },
  },
]);
