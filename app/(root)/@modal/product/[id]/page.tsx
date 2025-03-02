import { ChooseProductModal } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return products.map((product) => ({ id: product.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number((await params).id) },
    select: { name: true, description: true },
  });

  if (!product) {
    return {
      title: "Product not found",
      description: "This product could not be found.",
    };
  }

  return {
    title: `${product.name} | Next Pizza`,
    description: product.description,
  };
}

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
