import { Container, Filters, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import React, { Suspense } from "react";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas";
import { Stories } from "@/shared/components/shared/stories";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categoires = await findPizzas(searchParams);
  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піцци" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categoires.filter((cat) => cat.products.length > 0)}
      />
      <Stories />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/* Фільтрація */}
          <div className="w-[250px]">
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
    </>
  );
}
