
export function getCategoryFromPathname(pathname: string): string {
    const category = pathname.split('/').at(-1);
    if (category === 'search') {
        return 'all';
    }
    return category || 'all';
}