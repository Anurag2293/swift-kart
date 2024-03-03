import { UserButton, auth } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Home() {
	const authObj = auth();

    return (
        <div className="h-screen max-w-screen-sm">
            <h1 className="text-wrap">{authObj.getToken()}</h1>
            <p>Signed In!</p>
            <Suspense fallback={<div>Loading...</div>}>
                <UserButton />
            </Suspense>
        </div>
    )
}
