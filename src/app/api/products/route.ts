
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const POST = async (request: NextRequest) => {
    try {
        // const res = await axios.get('https://dummyjson.com/products?limit=100');
        // const demoProducts: any[] = res.data.products;

        return NextResponse.json({  });
    } catch (error) {
        return NextResponse.json({ error });
    }
}