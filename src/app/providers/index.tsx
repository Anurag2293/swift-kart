'use client'

import { AuthProvider } from "./auth-provider"
import { QueryProvider } from "./QueryProvider"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryProvider>
    )
}