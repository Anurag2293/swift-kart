'use client'
import { useUpdateQueryURL } from "@/query/hooks"
import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"

type Props = {}

const SortOptions = (props: Props) => {
    const searchParams = useSearchParams();
    const sort = String(searchParams.get('sort')) || null;
    const updateQueryURL = useUpdateQueryURL()
    
    return (
        <div className="hidden md:flex flex-col gap-y-2">
            <h4 className="text-secondary">Sort</h4>
            <Link
                href={updateQueryURL('sort', 'null')}
                className={`btn btn-outline ${sort === 'null' && 'btn-active'}`}
            >
                Relevance
            </Link>
            <Link
                href={updateQueryURL('sort', 'price-asc')}
                className={`btn btn-outline ${sort === 'price-asc' && 'btn-active'}`}
            >
                Price: Low to High
            </Link>
            <Link
                href={updateQueryURL('sort', 'price-desc')}
                className={`btn btn-outline ${sort === 'price-desc' && 'btn-active'}`}
            >
                Price: High to Low
            </Link>
        </div>
    )
}

export default SortOptions