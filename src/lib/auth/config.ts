import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // Session Strategy
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom Pages
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  // Providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        // Find user and verify
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          // Log failed attempt
          await prisma.securityLog.create({
            data: {
              userId: "unknown",
              event: "LOGIN_FAILED",
              details: "User not found",
              ipAddress: "TO_BE_IMPLEMENTED" // We'll add this later
            }
          })
          throw new Error("Invalid credentials")
        }

        // Verify password
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          // Log failed attempt
          await prisma.securityLog.create({
            data: {
              userId: user.id,
              event: "LOGIN_FAILED",
              details: "Invalid password"
            }
          })
          throw new Error("Invalid credentials")
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            lastLogin: new Date(),
            loginAttempts: 0 // Reset login attempts on successful login
          }
        })

        // Log successful login
        await prisma.securityLog.create({
          data: {
            userId: user.id,
            event: "LOGIN_SUCCESS"
          }
        })

        return {
          id: user.id,
          email: user.email
        }
      }
    })
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      }
  }
} 