
export function getSortQuery(sort: string | null) {
    let orderBy: Object;

    switch (sort) {
        case 'price-asc':
            orderBy = {
                price: 'asc'
            }
            break;
        case 'price-desc':
            orderBy = {
                price: 'desc'
            }
            break;
        default:
            orderBy = {}
            break;
    }

    return orderBy;
}