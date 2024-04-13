import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const skip = searchParams.get('skip');
        const take = searchParams.get('take');

        const products = await prisma.product.findMany({
            take: Number(take) || 1000,
            skip: Number(skip) || 0
        });

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { title, description, price, discountPercentage, rating, stock, brand, thumbnail, categoryId, categoryName } 
            = body.product;

        if (!categoryId && !categoryName) {
            throw new Error('Insufficient data!');
        }

        let category;
        if (categoryId) {
            category = await prisma.category.findFirst({ 
                where: {
                    id: categoryId
                }
            })
        } else {
            category = await prisma.category.findFirst({ 
                where: {
                    name: categoryName
                }
            })
        }

        if (!category) {
            throw new Error('Category doesn\'t exists!')
        }

        const newProduct = await prisma.product.create({
                data: {
                    title,
                    description,
                    price,
                    discount_percentage: discountPercentage,
                    rating,
                    stock,
                    brand,
                    thumbnail,
                    category_id: category.id 
                }
            })
        return NextResponse.json({newProduct});
    } catch (error) {
        return NextResponse.json({error});
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { productId } = body;
        const deleteProduct = await prisma.product.delete({
            where: {
                id: productId
            }
        });
        return NextResponse.json({deleteProduct});
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}