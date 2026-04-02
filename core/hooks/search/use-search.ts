// import { useDebouncedValue } from "@mantine/hooks";
// import { useEffect, useState } from "react";
import { marketplaceApi } from "@/core/api/sdk";
import { useAppContext } from "@/core/context";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(payload: {
    currentPage: number;
    pageSize: number;
    searchQuery: string;
    location: string;
}) {
    const {
        setMarketPlaceProducts,
        setMarketPlaceProductsTotalPages,
        setMarketPlaceProductsCurrentPage,
        setMarketPlaceProductsHasNextPage,
    } = useAppContext();

    return useQuery({
        queryKey: ['search-products', payload.searchQuery,
             payload.location, 
            payload.currentPage],

        enabled: payload.searchQuery.trim().length >= 2,

        queryFn: async () => {
            const response = await marketplaceApi.marketplaceControllerFetchSearchFeed(
                payload.currentPage,
                payload.pageSize,
                payload.searchQuery,
                payload.location === 'Plateau' ? '' : payload.location
            );

            const { products, totalPages } = response.data;

            setMarketPlaceProducts(products);
            setMarketPlaceProductsTotalPages(totalPages);
            setMarketPlaceProductsCurrentPage(payload.currentPage);

            const hasNext = payload.currentPage < totalPages;
            setMarketPlaceProductsHasNextPage(hasNext);

            return response.data;
        },
        staleTime: 1000 * 30,
        placeholderData: (previousData) => previousData,
     
    });
}


