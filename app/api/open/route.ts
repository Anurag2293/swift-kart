import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        return NextResponse.json({ data: 'Hello World'});
    } catch (error) {
        return NextResponse.json(error);
    }
}