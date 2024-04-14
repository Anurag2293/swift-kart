'use client'

import { signOut } from "next-auth/react";

export default function GoogleSignOutButton() {
    return (
        <li onClick={() => signOut()}><a>Logout</a></li>
    )
}
