'use client'

import { signIn } from "next-auth/react";

export default function GoogleAuthButton() {
    
	return (
		<button className="btn btn-info" onClick={() => signIn("google")}>Sign In</button>
	);
}
