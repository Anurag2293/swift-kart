import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

import prisma from "@/lib/db";

declare module "next-auth" {
    interface Session {
        user: {
            userId: string
        } & DefaultSession['user']
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ profile }) {
            try {
                if (!profile) {
                    throw new Error('Profile doesn\'t exists');
                }
                // console.log({ profile });
                const userExists = await prisma.user.findFirst({
                    where: {
                        email: profile.email || ""
                    }
                });
                
                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            email: profile.email || "",
                            name: profile.name || ""
                        }
                    })
                }

                return true;
            } catch (error) {
                console.log({error});
                return false;
            }
        },
        async session({ session }) {
            try {
                if (!session) {
                    throw new Error('Session doesn\'t exists');
                }
                const sessionUser = await prisma.user.findFirst({
                    where: {
                        email: session.user.email
                    }
                });
                session.user.userId = sessionUser?.id || "";
            } catch (error) {
                console.log({error});
            } finally {
                return session;
            }
        }
    }
});