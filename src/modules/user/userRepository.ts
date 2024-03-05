import { User } from "@modules/user/userModel";

const Users: User[] = [
  {
    id: 1,
    name: "Kenneth",
    email: "kbenwell0@exblog.jp",
    password: 'dH5"5V4F',
    imageUrl: "https://robohash.org/ducimusenimcorrupti.png?size=50x50&set=set1",
  },
  {
    id: 2,
    name: "Theresa",
    email: "tbatte1@ted.com",
    password: "xN5*Gr.Fmjm8b,}",
    imageUrl: "https://robohash.org/rerumnumquamnecessitatibus.png?size=50x50&set=set1",
  },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[] | null> => {
    return Users;
  },
};
