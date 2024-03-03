import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import type { categories } from "@prisma/client";
import axios from "axios";

export const GET = async () => {
    try {
        const categories = await prisma.categories.findMany();
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const { categoryName } = await request.json();
        const newCategory = await prisma.categories.create({
            data: {
                name: categoryName
            }
        });
        return NextResponse.json({newCategory});
    } catch (error) {
        return NextResponse.json({error});
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const { id, oldName, newName } = await request.json();
        if (!newName) {
            throw new Error("No new name provided!");
        }
        if (id) {
            const updatedCategory = await prisma.categories.update({
                where: {
                    id
                },
                data: {
                    name: newName
                }
            })
            return NextResponse.json({ updatedCategory });
        }
        if (oldName) {
            const updatedCategory = await prisma.categories.update({
                where: {
                    name: oldName
                },
                data: {
                    name: newName
                }
            })
            return NextResponse.json({ updatedCategory });
        }
        throw new Error("Provide valid identifier for the category");
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id, name } = await request.json();
        if (!id && !name) {
            throw new Error("Provide atleast id or name to delete");
        }
        if (id) {
            const deletedCategory = await prisma.categories.delete({
                where: {
                    id
                }
            })
            return NextResponse.json({ deletedCategory });
        }
        const deletedCategory = await prisma.categories.delete({
            where: {
                name
            }
        })
        return NextResponse.json({ deletedCategory });
    } catch (error) {
        return NextResponse.json({ error });
    }
}