import type { PageResult } from "@/domain/entities/PageResult";

export function useInfiniteItems<T>() {
    const items = ref<T[]>([]);
    const currentPage = ref(1);
    const totalPages = ref<number | null>(null);
    const isLoading = ref(false);

    function handlePageResult(data: PageResult<T>) {
        items.value.push(...data.results);
        currentPage.value = data.page + 1;
        totalPages.value = data.totalPages;
    }

    function reset() {
        items.value = [];
        currentPage.value = 1;
        totalPages.value = null;
        isLoading.value = false;
    }

    async function fetchNextPage(fetchFn: (page: number) => Promise<void>) {
        if (isLoading.value || (totalPages.value && currentPage.value > totalPages.value)) return;

        isLoading.value = true;
        await fetchFn(currentPage.value);
        isLoading.value = false;
    }

    const hasMorePages = computed(() => {
        if (totalPages.value === null) return false;
        return currentPage.value <= totalPages.value;
    });

    return {
        items: readonly(items),
        isLoading: readonly(isLoading),

        hasMorePages,
        handlePageResult,
        fetchNextPage,
        reset
    }
}