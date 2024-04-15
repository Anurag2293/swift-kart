import Collections from "@/components/Collections";
import SortOptions from "@/components/SortOptions";

export default function SearchLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: {
        category: string
    }
}>) {
    console.log({params})
    return (
        <div className="flex justify-between gap-x-4 p-4">
            <Collections />
            {children}
            <SortOptions />
        </div>
    );
}
