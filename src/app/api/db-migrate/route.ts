import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";


export const POST = async () => {
    try {
        
        return NextResponse.json({})
    } catch (error) {
        return NextResponse.error()
    }
}