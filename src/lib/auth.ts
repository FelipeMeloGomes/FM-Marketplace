import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // @see https://github.com/prisma/prisma/issues/16117
  // @ts-ignore
  adapter: PrismaAdapter(db as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "felipemelo" },
        password: { label: "password", type: "password" },
        username: { label: "Name", type: "text", placeholder: "Felipe Melo" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Dados de login necessários");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Usuário não registrado através de credenciais");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!matchPassword) {
          throw new Error("Senha incorreta");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
};
