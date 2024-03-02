import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

export const GET = async (request: NextRequest) => {
    const { userId, getToken } = auth();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const token = await getToken({ template: "supabase" });

        // Add logic here to fetch data from Supabase and return it.

        const data = { supabaseData: 'Hello World' };

        return Response.json({ data });
    } catch (error) {
        return Response.json(error);
    }
}