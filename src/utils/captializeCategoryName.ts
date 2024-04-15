
export function capitalizeCategoryName(category: string) {
    return category.split('-').map((sub) => sub.charAt(0).toUpperCase() + sub.substring(1)).join(' ');
}