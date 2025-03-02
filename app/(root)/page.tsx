import React, { Suspense } from "react";
import { findPizzas } from "@/lib";
import { GetSearchParams } from "@/lib/find-pizzas";
import {
  Filters,
  FiltersDrawer,
  ProductsGroupList,
  TopBar,
} from "./_components";
import { Container } from "@/components/shared";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categoires = await findPizzas(searchParams);
  return (
    <>
      <TopBar
        categories={categoires.filter((cat) => cat.products.length > 0)}
      />
      {/* <Stories /> */}
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/* Фільтрація */}
          <div className="w-[250px] hidden lg:block">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товарів */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categoires.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  products={category.products}
                  categoryId={category.id}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
      <FiltersDrawer />
    </>
  );
}
