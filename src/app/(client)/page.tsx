import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
	return (
		<div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content">
				<div className="max-w-md">
					<h1 className="mb-5 text-5xl font-bold">Swift Kart</h1>
					<p className="mb-5">Welcome to Swift Kart, the best ecommerce platform. Get best quality and deals, everthing at a discounted price.</p>
					<button className="btn btn-primary">
						<Link href="/search">
							See Products
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
