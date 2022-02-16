import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log();
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "828621372830-pd50o0n7lma05ofvbvihnfgntf19g7s0.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  jwt: {
    encryption: true,
  },
  secret: "secret token",
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/home") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
});
