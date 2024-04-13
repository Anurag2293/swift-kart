'use client'

import { SessionProvider, SessionProviderProps } from "next-auth/react"

const AuthProvider = ({ children, session }: { children: React.ReactNode, session: SessionProviderProps['session']}) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider;