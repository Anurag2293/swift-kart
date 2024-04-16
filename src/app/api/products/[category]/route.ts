import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { getSortQuery } from "@/utils/getSortQuery";

export const GET = async (request: NextRequest, {params}: {params: { category: string }}) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const skip = searchParams.get('skip');
        const take = searchParams.get('take');
        const sort = searchParams.get('sort');

        let orderBy = getSortQuery(sort);
        
        const results = await prisma.category.findFirst({
            where: {
                name: params.category
            },
            include: {
                Product: {
                    take: Number(take) || 1000,
                    skip: Number(skip) || 0,
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        discount_percentage: true,
                        rating: true,
                        stock: true,
                        brand: true,
                        thumbnail: true,
                        category_id: true,
                        category: {
                            select: {
                                name: true
                            }
                        },
                        _count: true
                    },
                    orderBy,
                },
                _count: {
                    select: {
                        Product: true
                    }
                }
            }
        }) 

        const products = results?.Product;
        const totalProducts = results?._count.Product;

        return NextResponse.json({ products, totalProducts });
    } catch (error) {
        return NextResponse.error();
    }
}