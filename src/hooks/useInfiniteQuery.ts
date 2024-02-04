import { useInfiniteQuery } from 'react-query';

interface InfiniteQueryHookType {
  queryKey: string[];
  queryFn: (params: any) => Promise<any>;
}

const useInfiniteQueryHook = ({ queryKey, queryFn }: InfiniteQueryHookType) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return {
        pages: data.pages.map((pageData) => pageData.data).flat(),
        pageParams: data.pageParams
      };
    }
  });
};

export default useInfiniteQueryHook;
