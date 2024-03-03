"use client"

import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
    return
    <Suspense>
        <div className="h-screen flex justify-center items-center">
            <SignUp />
        </div>
    </Suspense>
}