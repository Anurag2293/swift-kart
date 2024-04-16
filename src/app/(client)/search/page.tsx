import SearchProducts from "@/components/SearchProducts";

export default function Search() {
	const queryBaseUrl = '/api/products'
	return <SearchProducts queryBaseUrl={queryBaseUrl} />
}
