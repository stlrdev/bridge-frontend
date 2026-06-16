import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {
  BackendLoginResponse,
  mapUserTypeToRole,
} from "@/features/auth/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// Access token lifetime from backend: 60 minutes
const ACCESS_TOKEN_LIFETIME_MS = 60 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await axios.post<{
            success: boolean;
            data: BackendLoginResponse;
          }>(`${BASE_URL}/auth/login/`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (!response.data.success) return null;

          const { user, tokens } = response.data.data;

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: mapUserTypeToRole(user.userType),
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            merchantId: user.merchantId ?? undefined,
            clientOrganizationId: user.clientOrganizationId ?? undefined,
            accessTokenExpiry: Date.now() + ACCESS_TOKEN_LIFETIME_MS,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in: persist credentials from authorize()
      if (user) {
        return {
          ...token,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          role: (user as any).role,
          merchantId: (user as any).merchantId,
          clientOrganizationId: (user as any).clientOrganizationId,
          accessTokenExpiry: (user as any).accessTokenExpiry,
        };
      }

      // Access token still valid
      if (Date.now() < (token.accessTokenExpiry as number)) {
        return token;
      }

      // Access token expired — attempt silent refresh
      try {
        const response = await axios.post<{
          success: boolean;
          data: { access: string; refresh?: string };
        }>(`${BASE_URL}/auth/token/refresh/`, {
          refresh: token.refreshToken,
        });

        if (!response.data.success) throw new Error("Refresh failed");

        return {
          ...token,
          accessToken: response.data.data.access,
          refreshToken: response.data.data.refresh ?? token.refreshToken,
          accessTokenExpiry: Date.now() + ACCESS_TOKEN_LIFETIME_MS,
        };
      } catch {
        // Refresh failed — force re-login
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.merchantId = token.merchantId as string | undefined;
      session.user.clientOrganizationId = token.clientOrganizationId as
        | string
        | undefined;
      session.error = token.error as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
