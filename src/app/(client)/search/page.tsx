'use client'

import { useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Category, Product } from "@prisma/client";

import { useUpdateQueryURL } from "@/query/hooks";
import Collections from "@/components/Collections";
import SortOptions from "@/components/SortOptions";

type ProductCategory = Product & {
	category: Category
}

const PRODUCTS_PER_PAGE = 15;

export default function Search() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;
	const sort = String(searchParams.get('sort')) || null;

	const updateQueryURL: any = useUpdateQueryURL();

	const { isPending, error, data, refetch: refetchProducts } = useQuery({
		queryKey: ['products'],
		queryFn: () =>
			axios
				.get(`/api/products?take=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}&sort=${sort}`)
				.then((res) => res.data)
	})

	useEffect(() => {
		refetchProducts()
	}, [page, sort])

	if (isPending) {
		return (<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
			{[...Array(PRODUCTS_PER_PAGE)].map((_, idx) => <div key={idx} className="flex flex-col gap-4 w-full">
				<div className="skeleton h-32 w-full"></div>
				<div className="skeleton h-4 w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
			</div>)}
		</div>)
	}


	if (error) {
		console.log(error);
		return 'An error has occurred: ' + error.message
	}

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 p-4">
				{data.products.map((product: ProductCategory) => {
					return (
						<div key={product.id} className="card card-compact w-full bg-base-100 shadow-xl">
							<figure className="h-64 border-b-2 border-b-primary">
								<Image
									className="object-contain"
									width={400}
									height={400}
									src={product.thumbnail || "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
									alt={product.title || "product"}
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">
									<div className="tooltip tooltip-info" data-tip={product.title}>
										{product.title?.substring(0, 20)}
									</div>
									<span className="badge badge-outline">{product.category.name}</span>
								</h2>
								<p>{product.description?.substring(0, 64)}...</p>
								<div className="card-actions justify-between items-center">
									<div className="stat-value text-xl flex">
										<span>${String(product.price)}</span>
										<div className="divider divider-horizontal" />
										{String(product.rating)}⭐
									</div>
									{String(product.discount_percentage)}
									<button className="btn btn-primary">View Details</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="flex justify-center join">
				{page > 1 && <Link
					href={updateQueryURL('page', String(page - 1))}
					className="join-item btn btn-outline"
				>
					Previous
				</Link>
				}

				{[...Array(Math.ceil(data.totalProducts / PRODUCTS_PER_PAGE))].map((_, idx) => <Link key={idx}
					href={updateQueryURL('page', String(idx + 1))}
					className={`join-item btn btn-outline ${page === idx + 1 && 'btn-active'}`}
				>
					{idx + 1}
				</Link>)}

				{page < Math.ceil(data.totalProducts / PRODUCTS_PER_PAGE) && <Link
					href={updateQueryURL('page', String(page + 1))}
					className="join-item btn btn-outline"
				>
					Next
				</Link>
				}
			</div>
		</div>
	);
}
