
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (request: NextRequest) => {
    try {
        const categories = await prisma.category.findMany({});
        return NextResponse.json({ categories })
    } catch (error) {
        return NextResponse.json({ error })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { categoryName } = body;

        const newCategory = await prisma.category.create({
            data: {
                name: categoryName
            }
        });

        return NextResponse.json({ newCategory });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { oldCategoryName, categoryId, newCategoryName } = body;

        if ((!oldCategoryName && !categoryId) || !newCategoryName) {
            throw new Error('Insufficient data');
        }

        let updatedCategory;
        if (categoryId) {
            updatedCategory = await prisma.category.update({
                where: {
                    id: Number(categoryId)
                },
                data: {
                    name: newCategoryName
                }
            })
        } else if (oldCategoryName) {
            updatedCategory = await prisma.category.update({
                where: {
                    name: oldCategoryName
                },
                data: {
                    name: newCategoryName
                }
            })
        }
        return NextResponse.json({ updatedCategory });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { categoryName, categoryId } = body;
        
        if (!categoryId && !categoryName) {
            throw new Error('Insufficient data');
        }

        let deletedCategory;
        if (categoryId) {
            deletedCategory = await prisma.category.delete({
                where: {
                    id: categoryId
                }
            })
        } else {
            deletedCategory = await prisma.category.delete({
                where: {
                    name: categoryName
                }
            })
        }
        return NextResponse.json({deletedCategory});
    } catch (error) {
        return NextResponse.json({error});
    }
}