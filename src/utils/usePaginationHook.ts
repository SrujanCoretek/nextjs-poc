/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useEffect,
  useCallback,
  useRef,
  useReducer,
  MutableRefObject,
} from "react";

interface FetchDataResponse {
  items: any[];
  count: number;
}

type DataArrayCallback = (respData: FetchDataResponse) => any[];
interface PaginatedFetchState {
  data: any[] | null;
  error: string | null;
  hasMore: boolean;
  loading: boolean;
  totalItems: number;
  page: number;
  filterMode: boolean;
}

interface IntersectionObserverEntry {
  isIntersecting: boolean;
}

interface PaginatedFetchResult {
  loading: boolean;
  filterMode: boolean;
  data: any[] | null;
  error: string | null;
  page: number;
  resetPage: number;
  hasMore: boolean;
  setDataFilter: () => Promise<void>;
  clearDataFilter: () => void;
  getInitialState: () => void;
  resetData: () => void;
  paginate: () => void;
  filterPaginate: () => Promise<void>;
  retryErroredPage: () => void;
  lastElementRef: (node: any) => void;
}

export default function usePaginatedFetch(
  api: (page: number) => Promise<[any, null] | [null, any]>,
  dataArrayCB?: DataArrayCallback,
  startPage = 1
): PaginatedFetchResult {
  const dataRef: MutableRefObject<{ data: any[]; filterMode: boolean }> =
    useRef({ data: [], filterMode: false });
  const totalItemsRef: MutableRefObject<{ count: number }> = useRef({
    count: 1,
  });

  const initialState = useCallback(() => {
    dataRef.current.data = [];
    dataRef.current.filterMode = false;
    return {
      data: null,
      error: null,
      hasMore: true,
      loading: true,
      totalItems: 0,
      page: startPage - 1,
      filterMode: false,
    };
  }, [startPage]);

  const [state, dispatch] = useReducer(
    (
      state: PaginatedFetchState,
      update: Partial<PaginatedFetchState>
    ): PaginatedFetchState => {
      if (update) {
        return {
          ...state,
          ...update,
        };
      }
      return state;
    },
    {
      data: null,
      error: null,
      hasMore: true,
      loading: true,
      totalItems: 2,
      page: startPage - 1,
      filterMode: false,
    }
  );
  // console.log(state.error);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: any) => {
      if (state.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const visible = entries[0].isIntersecting;
          if (visible && state.hasMore) {
            paginate();
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [state.loading, state.hasMore, dataRef.current.filterMode]
  );

  const fetchData = async (retry = false) => {
    console.log("fetch Data triggered");
    if ((state.error || retry) && state.loading && !state.hasMore) return;

    const pgNo = state.page + 1;
    const count = totalItemsRef.current.count;
    const lastOffset = Math.ceil(count / 12);
    // console.log({ pgNo, lastOffset, count });

    if (pgNo > lastOffset) {
      dispatch({ loading: false, hasMore: false });
      return;
    }

    dispatch({ loading: true, page: pgNo, error: null });

    try {
      const [data, err] = await api(pgNo);
      // totalItemsRef.current.count = data.count;
      dispatch({ totalItems: data.count });
      setTotalCount(data.count);
      const st: Partial<PaginatedFetchState> = {};

      if (data) {
        const dataArr = dataArrayCB ? dataArrayCB(data) : [];
        if (dataArr && dataArr.length > 0) {
          dataRef.current.data = [...dataRef.current.data, ...dataArr];
          st.data = state.data ? [...state.data, ...dataArr] : dataArr;
          st.hasMore = true;
        } else {
          st.hasMore = false;
        }
      } else {
        console.log(err.message);
        st.error = JSON.stringify(err || {});
        st.page = pgNo - 1;
      }

      st.loading = false;
      dispatch(st as PaginatedFetchState);
    } catch (error) {
      console.error("Error fetching data:", error);
      const st: Partial<PaginatedFetchState> = {
        error: "An error occurred while fetching data",
        loading: false,
        page: pgNo - 1,
      };
      dispatch(st as PaginatedFetchState);
    }
  };

  async function fetchInitialData() {
    try {
      const pgNo = state.page + 1;
      const [data, error] = await api(pgNo);
      if (data) {
        const count = data.count;
        if (count > 0) {
          setTotalCount(count);
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchInitialData();

    return () => {
      resetData();
    };
  }, []);

  const paginate = useCallback(() => {
    if (!state.error && !state.loading && state.hasMore) {
      fetchData();
    }
  }, [state.hasMore, state.loading, state.error, dataRef.current.filterMode]);

  const retryErroredPage = useCallback(() => {
    if (!dataRef.current.filterMode && !state.loading && state.hasMore) {
      fetchData(true);
    }
  }, [state.hasMore, state.loading, dataRef.current.filterMode]);

  const filterPaginate = async () => {
    dataRef.current.filterMode = true;
    const pgNo = 1;
    const st: Partial<PaginatedFetchState> = {};
    const count = totalItemsRef.current.count;
    const calc = Math.ceil(count / 12);
    const lastOffset = calc > 0 ? calc : 1;

    if (pgNo > lastOffset) {
      state.hasMore = false;
      state.loading = false;
    }

    try {
      dispatch({ loading: true, page: pgNo, error: null });
      const [data, err] = await api(pgNo);
      // totalItemsRef.current.count = data.count;
      setTotalCount(data.count);
      const count = totalItemsRef.current.count;
      const calc = Math.ceil(count / 12);
      const lastOffset = calc > 0 ? calc : 1;
      if (pgNo > lastOffset) return;

      if (data) {
        const dataArr = dataArrayCB ? dataArrayCB(data) : [];

        if (dataArr && dataArr.length >= 0) {
          dataRef.current.data = dataArr;
          st.data = dataArr;
          st.hasMore = true;
        } else {
          st.hasMore = false;
        }
      } else {
        st.error = JSON.stringify(err || {});
        st.page = pgNo - 1;
      }
      dispatch({ loading: false });
    } catch (error) {
      console.error("Error filtering data:", error);
      st.error = "An error occurred while filtering data";
      st.page = pgNo - 1;
    }

    dispatch(st as PaginatedFetchState);
  };

  const setDataFilter = useCallback(async () => {
    if (state.loading) return;
    dataRef.current.filterMode = true;
    try {
      resetData();
      await filterPaginate();
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  }, [state.loading]);

  const clearDataFilter = useCallback(async () => {
    if (dataRef.current.filterMode) {
      resetData();
      console.log("entered clearDataFilter");

      const pgNo = 1;

      const [data, err] = await api(pgNo);
      console.log("clearDataFilter", data);
      if (data) {
        const dataArr = dataArrayCB ? dataArrayCB(data) : [];
        dataRef.current.data = dataArr;
        state.data = dataArr;
      } else {
        console.log(err);
      }

      dispatch({ data: dataRef.current.data });

      dataRef.current.filterMode = false;
    }
  }, [dataRef.current.filterMode]);

  const getInitialState = useCallback(async () => {
    resetData();
    dispatch({ loading: false });
    const pgNo = 1;

    const [data, err] = await api(pgNo);
    if (data) {
      const dataArr = dataArrayCB ? dataArrayCB(data) : [];
      dataRef.current.data = dataArr;
      state.data = dataArr;
    } else {
      console.log(err);
    }

    dispatch({ data: dataRef.current.data });

    dataRef.current.filterMode = false;
  }, [dataRef.current.filterMode]);

  const resetData = useCallback(() => {
    dispatch(initialState());
    console.log("entered resetData");
  }, [initialState]);

  const setTotalCount = (count: number) => {
    totalItemsRef.current.count = count;
    dispatch({ totalItems: count });
  };

  return {
    loading: state.loading,
    filterMode: dataRef.current.filterMode,
    data: state.data,
    hasMore: state.hasMore,
    error: state.error,
    page: state.page < startPage ? startPage : state.page,
    resetPage: 1,
    setDataFilter,
    clearDataFilter,
    resetData,
    getInitialState,
    paginate,
    retryErroredPage,
    lastElementRef,
    filterPaginate,
  };
}
