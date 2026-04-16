// import { useDebouncedValue } from "@mantine/hooks";
// import { useEffect, useState } from "react";
import { marketplaceApi } from "@/core/api/sdk";
import { useAppContext } from "@/core/context";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(payload: {
    currentPage: number;
    pageSize: number;
    searchQuery: string;
    state?: string;
    city?: string;
    category?: string;
    inStock?: boolean;
    isNegotiable?: boolean;
    latitude?: number;
    longitude?: number;
}) {
    const {
        setMarketPlaceProducts,
        setMarketPlaceProductsTotalPages,
        setMarketPlaceProductsCurrentPage,
        setMarketPlaceProductsHasNextPage,
    } = useAppContext();

    return useQuery({
        queryKey: ['search-products', 
            payload.searchQuery,
            payload.state,
            payload.city,
            payload.category,
            payload.currentPage,
            payload.inStock,
            payload.isNegotiable,
            payload.latitude,
            payload.longitude
        ],

        enabled: payload.searchQuery.trim().length >= 2 || !!payload.state || !!payload.category,

        queryFn: async () => {
            const searchLocation = (payload.state === 'Nigeria' || !payload.state) ? undefined : payload.state;
            const response = await marketplaceApi.marketplaceControllerFetchSearchFeed(
                payload.currentPage,
                payload.pageSize,
                payload.searchQuery,
                searchLocation,
                payload.city,
                payload.category,
                payload.inStock,
                payload.isNegotiable,
                payload.latitude,
                payload.longitude
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


