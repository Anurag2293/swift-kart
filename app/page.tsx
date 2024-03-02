import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
	const authObj = auth();

    return (
        <div className="h-screen">
            <h1>{authObj.getToken()}</h1>
            <Link href="/sign-in">Sign In</Link>
            <UserButton />
        </div>
    )
}
