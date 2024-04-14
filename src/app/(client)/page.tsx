'use client'

import { useCallback, useEffect } from "react";

import Image from 'next/image'
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation'

import type { Category, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ProductCategory = Product & {
	category: Category
}

const PRODUCTS_PER_PAGE = 15;

export default function Home() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;

	const { isPending, error, data, refetch: refetchProducts } = useQuery({
		queryKey: ['products'],
		queryFn: () =>
			axios
				.get(`/api/products?take=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`)
				.then((res) => res.data)
	})

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	useEffect(() => {
		refetchProducts()
	}, [page])

	if (isPending) return 'Loading...'

	if (error) {
		console.log(error);
		return 'An error has occurred: ' + error.message
	}

	console.log({ data })

	return (
		<div className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{data.products.map((product: ProductCategory) => {
					return (
						<div key={product.id} className="card card-compact w-full bg-base-100 shadow-xl">
							<figure className="h-64">
								<Image
									className="object-contain hover:object-scale-down hover:transition hover:ease-in-out hover:delay-75"
									width={400}
									height={400}
									src={product.thumbnail || "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
									alt={product.title || "product"}
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">
									{product.title?.substring(0, 20)}
									<span className="badge badge-outline">{product.category.name}</span>
								</h2>
								<p>{product.description?.substring(0, 64)}...</p>
								<div className="card-actions justify-end">
									<button className="btn btn-primary">View Details</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="flex justify-center join">
				{page > 1 && <Link
					href={pathname + '?' + createQueryString('page', String(page - 1))}
					className="join-item btn btn-outline"
				>
					Previous
				</Link>
				}

				{[...Array(Math.ceil(data.totalProducts / PRODUCTS_PER_PAGE))].map((_, idx) => <Link key={idx}
					href={pathname + '?' + createQueryString('page', String(idx + 1))}
					className={`join-item btn btn-outline ${page === idx + 1 && 'btn-active'}`}
				>
					{idx + 1}
				</Link>)}

				{page < Math.ceil(data.totalProducts / PRODUCTS_PER_PAGE) && <Link
					href={pathname + '?' + createQueryString('page', String(page + 1))}
					className="join-item btn btn-outline"
				>
					Next
				</Link>
				}
			</div>
		</div>
	);
}
