import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const ingredients = [
  {
    name: "Сырный бортик",
    price: 179,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Ветчина",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Острая чоризо",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Свежие томаты",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Сочные ананасы",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Кубики брынзы",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Митболы",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

const products = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Омлет с пепперони",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Кофе Латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
    categoryId: 3,
    price: 40,
  },
  {
    name: "Куриные наггетсы",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
    categoryId: 3,
    price: 40,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
    categoryId: 3,
    price: 40,
  },
  {
    name: "Додстер",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
    categoryId: 3,
    price: 40,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
    categoryId: 3,
    price: 40,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
    categoryId: 4,
    price: 40,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
    categoryId: 4,
    price: 40,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
    categoryId: 4,
    price: 40,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
    categoryId: 4,
    price: 40,
  },
  {
    name: "Ирландский Капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
    categoryId: 5,
    price: 40,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
    categoryId: 5,
    price: 40,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
    categoryId: 5,
    price: 40,
  },
  {
    name: "Кофе Американо",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
    categoryId: 5,
    price: 40,
  },
  {
    name: "Кофе Латте",
    price: 40,
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 5,
  },
];

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "John Doe",
        email: "Hs5Qb@example.com",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@ad.com",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { name: "Піцци" },
      { name: "Сніданок" },
      { name: "Закуски" },
      { name: "Коктейлі" },
      { name: "Напої" },
    ],
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/pizzas/pepperoni-fresh.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
      price: Math.floor(Math.random() * (299 - 80 + 1) + 80),
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/pizzas/cheese.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
      price: Math.floor(Math.random() * (299 - 80 + 1) + 80),
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/pizzas/chorizo-fresh.jpg",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
      price: Math.floor(Math.random() * (299 - 80 + 1) + 80),
    },
  });

  await prisma.variation.createMany({
    data: [
      // Pepperoni
      {
        productId: pizza1.id,
        size: 25,
        pizzaType: 1,
        price: 100,
      },

      {
        productId: pizza1.id,
        size: 30,
        pizzaType: 2,
        price: 154,
      },

      {
        productId: pizza1.id,
        size: 40,
        pizzaType: 2,
        price: 214,
      },

      // Cheese

      {
        productId: pizza2.id,
        size: 25,
        pizzaType: 1,
        price: 120,
      },
      {
        productId: pizza2.id,
        size: 30,
        pizzaType: 1,
        price: 178,
      },
      {
        productId: pizza2.id,
        size: 40,
        pizzaType: 1,
        price: 205,
      },

      {
        productId: pizza2.id,
        size: 25,
        pizzaType: 2,
        price: 150,
      },
      {
        productId: pizza2.id,
        size: 30,
        pizzaType: 2,
        price: 220,
      },

      {
        productId: pizza2.id,
        size: 40,
        pizzaType: 2,
        price: 240,
      },

      // Chorizo

      {
        productId: pizza3.id,
        size: 30,
        pizzaType: 1,
        price: 220,
      },
      {
        productId: pizza3.id,
        size: 40,
        pizzaType: 1,
        price: 240,
      },

      {
        productId: pizza3.id,
        size: 25,
        pizzaType: 2,
        price: 250,
      },
      {
        productId: pizza3.id,
        size: 30,
        pizzaType: 2,
        price: 75,
      },

      {
        productId: pizza3.id,
        size: 40,
        pizzaType: 2,
        price: 75,
      },

      // Інші продукти

      { productId: 1, price: 40 },
      { productId: 2, price: 40 },
      { productId: 3, price: 40 },
      { productId: 4, price: 40 },
      { productId: 5, price: 40 },
      { productId: 6, price: 40 },
      { productId: 7, price: 40 },
      { productId: 8, price: 40 },
      { productId: 9, price: 40 },
      { productId: 10, price: 40 },
      { productId: 11, price: 40 },
      { productId: 12, price: 40 },
      { productId: 13, price: 40 },
      { productId: 14, price: 40 },
      { productId: 15, price: 40 },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
