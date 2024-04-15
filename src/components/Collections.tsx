'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { type Category } from '@prisma/client'

import { capitalizeCategoryName } from '@/utils/captializeCategoryName'
import { getCategoryFromPathname } from "@/utils/getCategoryFromPathname"
import Link from 'next/link'

type Props = {}

const CollectionCard = ({ categoryName, pathCategory }: { categoryName: string, pathCategory: string}) => {
    return (
        <Link href={`/search/${categoryName}`} className={`w-max block ${categoryName === pathCategory && 'underline'}`}>{capitalizeCategoryName(categoryName)}</Link>
    )
}

const Collections = (props: Props) => {
    const pathname = usePathname();
    const pathCategory = getCategoryFromPathname(pathname);

    const { error, isPending, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('/api/categories').then((res) => res.json())
    })

    if (isPending) return "Loading categories..."

    if (error) return "Error fetching categories."

    return (
        <div className='hidden md:block w-max'>
            <h4 className="text-secondary">Collections</h4>
            <Link href='/search' className={`w-max block ${'all' === pathCategory && 'underline'}`}>All</Link>
            {data.categories.map((category: Category) => {
                return <CollectionCard key={category.id} categoryName={category.name} pathCategory={pathCategory} />
            })}
        </div>
    )
}

export default Collections