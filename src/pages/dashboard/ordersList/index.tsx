import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { useGetData } from "@/hooks/useApi";

import { OrdersTable } from "../components/OrdersTable";

export function DashboardOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceSearch = useDebouncedCallback((value) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 500);

  // fetch Courses
  const { data: response } = useGetData(`dashboard/orders?${searchParams.toString()}`);
  const { data } = response || {};
  const { orders } = data || {};
  return (
    <main>
      <section className="shadow-custom rounded-xl py-6  mb-10">
        <header className="flex justify-between items-center px-6 mb-5">
          <h1 className=" text-2xl font-semibold ">Orders</h1>
          <div className="flex gap-2 justify-end items-center">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                debounceSearch(value);
              }}
              className="min-w-48 bg-gray-100"
            />
          </div>
        </header>
        <OrdersTable orders={orders} />
      </section>
      <Paginate pageCount={3} />
    </main>
  );
}
