import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import type { products, product_images } from "@prisma/client";
import axios from "axios";

export const GET = async (request: NextRequest) => {
    try {
        const products = await prisma.products.findMany({});
        return NextResponse.json({products});
    } catch (error) {
        return NextResponse.json({error});
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const res = await axios.get("https://dummyjson.com/products");
        const demoProducts = res.data;
    } catch (error) {
        
    }
}