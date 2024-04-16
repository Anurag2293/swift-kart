import SearchProducts from '@/components/SearchProducts'
import React from 'react'

type Props = {
    params: {
        category: string
    }
}

const SearchCategory = (props: Props) => {
    const queryBaseUrl = `/api/products/${props.params.category}`;

    return <SearchProducts queryBaseUrl={queryBaseUrl} />
}

export default SearchCategory