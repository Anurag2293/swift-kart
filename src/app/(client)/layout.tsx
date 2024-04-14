import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Swift Kart",
	description: "Ecommerce at it's best!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
			<body className={inter.className}>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
