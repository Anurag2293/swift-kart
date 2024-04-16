
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateQueryURL = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

    const updateQueryURL = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (value !== 'null') {
				params.set(name, value)
			} else {
				params.delete(name)
			}

			return pathname + '?' + params.toString()
		},
		[searchParams, pathname]
	)

    return updateQueryURL;
}