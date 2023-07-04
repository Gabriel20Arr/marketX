import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email: profileEmail, credentials }) {
  //     let { name, email: profileEmail, sessionToken } = profile;

  //     let nombre = name;
  //     let correo = profileEmail;
  //     let contraseña = sessionToken;

  //     const modifiedUser = {
  //       ...user,
  //       name: nombre,
  //       email: correo,
  //       sessionToken: contraseña,
  //     };

  //     return Promise.resolve(modifiedUser);
  //   },
  // },
});
