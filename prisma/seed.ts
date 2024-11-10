import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const ingredients = [
  {
    name: "Сирний бортик",
    price: 179,
    imageUrl: "/ingredients/1.png",
  },
  {
    name: "Сливочна моцарела",
    price: 79,
    imageUrl: "/ingredients/2.png",
  },
  {
    name: "Сири чеддер і пармезан",
    price: 79,
    imageUrl: "/ingredients/16.png",
  },
  {
    name: "Гострий перець халапеньо",
    price: 59,
    imageUrl: "/ingredients/3.png",
  },
  {
    name: "Ніжне курча",
    price: 79,
    imageUrl: "/ingredients/14.png",
  },
  {
    name: "Шампіньйони",
    price: 59,
    imageUrl: "/ingredients/4.png",
  },
  {
    name: "Шинка",
    price: 79,
    imageUrl: "/ingredients/13.png",
  },
  {
    name: "Пікантна пеппероні",
    price: 79,
    imageUrl: "/ingredients/12.png",
  },
  {
    name: "Гостра чорізо",
    price: 79,
    imageUrl: "/ingredients/8.png",
  },
  {
    name: "Мариновані огірки",
    price: 59,
    imageUrl: "/ingredients/17.png",
  },
  {
    name: "Свіжі помідори",
    price: 59,
    imageUrl: "/ingredients/18.png",
  },
  {
    name: "Червона цибуля",
    price: 59,
    imageUrl: "/ingredients/19.png",
  },
  {
    name: "Соковиті ананаси",
    price: 59,
    imageUrl: "/ingredients/20.png",
  },
  {
    name: "Італійські трави",
    price: 39,
    imageUrl: "/ingredients/21.png",
  },
  {
    name: "Солодкий перець",
    price: 59,
    imageUrl: "/ingredients/22.png",
  },
  {
    name: "Кубики бринзи",
    price: 79,
    imageUrl: "/ingredients/23.png",
  },
  {
    name: "Мітболи",
    price: 79,
    imageUrl: "/ingredients/24.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

const products = [
  {
    name: "Омлет з ветчиною та грибами",
    description:
      "Гарячий ситний омлет з піджаристою скоринкою, ветчина, шампіньйони та моцарела",
    imageUrl: "/products/omlet-with-ham-and-mashroom.png",
    categoryId: 2,
    price: 99,
  },
  {
    name: "Омлет з беконом",
    description:
      "Ситний і збалансований сніданок — омлет з піджаристою скоринкою, пікантна пеппероні, помідори та моцарела",
    imageUrl: "/products/omlet-with-beacon.png",
    categoryId: 2,
    price: 99,
  },
  {
    name: "Сирники зі згущеним молоком",
    description:
      "Ніжні сирники, приготовані в печі, з порційним згущеним молоком",
    imageUrl: "/products/cheesecakes.png",
    categoryId: 2,
    price: 100,
  },
  {
    name: "Кава Латте",
    description:
      "Коли хочеться ніжної молочної піни, на допомогу приходить класичне латте",
    imageUrl: "/products/coffe-latte.png",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Кава Капучино",
    description:
      "Король серед кавових напоїв — класичне капучино. Для любителів збалансованого кавово-молочного смаку",
    imageUrl: "/products/coffe-cappuccino.png",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Кава Американо",
    description:
      "Пара ковтків гарячого Американо, і ви будете готові покоряти цей день",
    imageUrl: "/products/coffe-americano.png",
    categoryId: 2,
    price: 40,
  },
  {
    name: "Курячі нагетси",
    description: "Ніжне куряче м'ясо в хрусткій паніровці",
    imageUrl: "/products/chicken-nuggets.png",
    categoryId: 3,
    price: 139,
  },
  {
    name: "Картопля з печі з соусом 🌱",
    description:
      "Запечена в печі картопля з пряними спеціями. В комплекті сирний соус",
    imageUrl: "/products/kartofel-s-sousom.png",
    categoryId: 3,
    price: 169,
  },
  {
    name: "Картопля з печі 🌱👶",
    description:
      "Запечена в печі картопля — звичний смак і мало масла. В складі пряні спеції",
    imageUrl: "/products/kartofel.png",
    categoryId: 3,
    price: 139,
  },
  {
    name: "Курячі крильця барбекю",
    description: "Курячі крильця зі спеціями та ароматом копчення",
    imageUrl: "/products/chiken-bbq.png",
    categoryId: 3,
    price: 210,
  },
  {
    name: "Кока-Кола",
    imageUrl: "/products/coca-cola.png",
    categoryId: 4,
    price: 49,
  },
  {
    name: "Спрайт",
    imageUrl: "/products/sprite.png",
    categoryId: 4,
    price: 49,
  },
  {
    name: "Фанта",
    imageUrl: "/products/fanta.png",
    categoryId: 4,
    price: 49,
  },
  {
    name: "Живчик",
    imageUrl: "/products/zivchik.png",
    categoryId: 4,
    price: 49,
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
      name: "Пепероні фреш",
      imageUrl: "/pizzas/pepperoni-fresh.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
      price: 100,
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сирна",
      imageUrl: "/pizzas/cheese.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 18),
      },
      price: 100,
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чорізо фреш",
      imageUrl: "/pizzas/chorizo-fresh.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 10),
      },
      price: 100,
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Двійне курча 👶",
      imageUrl: "/pizzas/double-chiken.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 10),
      },
      price: 100,
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Шинка та сир",
      imageUrl: "/pizzas/ham-and-cheese.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 15),
      },
      price: 100,
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Діабло 🌶️🌶️",
      imageUrl: "/pizzas/diablo.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(7, 17),
      },
      price: 100,
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Чотири сезони",
      imageUrl: "/pizzas/four-seasons.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 8),
      },
      price: 100,
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Маргарита 🌱",
      imageUrl: "/pizzas/margarita.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 8),
      },
      price: 100,
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Курча барбекю",
      imageUrl: "/pizzas/chicken-bbq.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 18),
      },
      price: 100,
    },
  });

  await prisma.variation.createMany({
    data: [
      // Pepperoni
      {
        productId: pizza1.id,
        size: 25,
        pizzaType: 1,
        price: 220,
      },

      {
        productId: pizza1.id,
        size: 30,
        pizzaType: 2,
        price: 240,
      },

      {
        productId: pizza1.id,
        size: 40,
        pizzaType: 2,
        price: 260,
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
        price: 150,
      },
      {
        productId: pizza2.id,
        size: 40,
        pizzaType: 1,
        price: 180,
      },

      {
        productId: pizza2.id,
        size: 25,
        pizzaType: 2,
        price: 120,
      },
      {
        productId: pizza2.id,
        size: 30,
        pizzaType: 2,
        price: 180,
      },

      {
        productId: pizza2.id,
        size: 40,
        pizzaType: 2,
        price: 160,
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
        price: 280,
      },

      {
        productId: pizza3.id,
        size: 40,
        pizzaType: 2,
        price: 300,
      },

      // Double chiken
      {
        productId: pizza4.id,
        size: 30,
        pizzaType: 1,
        price: 220,
      },
      {
        productId: pizza4.id,
        size: 40,
        pizzaType: 1,
        price: 240,
      },

      {
        productId: pizza4.id,
        size: 25,
        pizzaType: 2,
        price: 250,
      },
      {
        productId: pizza4.id,
        size: 30,
        pizzaType: 2,
        price: 275,
      },

      {
        productId: pizza4.id,
        size: 40,
        pizzaType: 2,
        price: 280,
      },

      // Ham and cheese
      {
        productId: pizza5.id,
        size: 30,
        pizzaType: 1,
        price: 300,
      },
      {
        productId: pizza5.id,
        size: 40,
        pizzaType: 1,
        price: 320,
      },

      {
        productId: pizza6.id,
        size: 25,
        pizzaType: 1,
        price: 150,
      },
      {
        productId: pizza6.id,
        size: 30,
        pizzaType: 1,
        price: 180,
      },
      {
        productId: pizza6.id,
        size: 40,
        pizzaType: 1,
        price: 210,
      },
      {
        productId: pizza6.id,
        size: 25,
        pizzaType: 2,
        price: 160,
      },
      {
        productId: pizza6.id,
        size: 30,
        pizzaType: 2,
        price: 190,
      },
      {
        productId: pizza6.id,
        size: 40,
        pizzaType: 2,
        price: 220,
      },

      // BBQ Chicken
      {
        productId: pizza7.id,
        size: 30,
        pizzaType: 1,
        price: 250,
      },
      {
        productId: pizza7.id,
        size: 40,
        pizzaType: 1,
        price: 270,
      },
      {
        productId: pizza7.id,
        size: 25,
        pizzaType: 2,
        price: 270,
      },
      {
        productId: pizza7.id,
        size: 30,
        pizzaType: 2,
        price: 300,
      },
      {
        productId: pizza7.id,
        size: 40,
        pizzaType: 2,
        price: 330,
      },

      // Veggie Supreme
      {
        productId: pizza8.id,
        size: 25,
        pizzaType: 1,
        price: 180,
      },
      {
        productId: pizza8.id,
        size: 30,
        pizzaType: 1,
        price: 210,
      },
      {
        productId: pizza8.id,
        size: 40,
        pizzaType: 1,
        price: 240,
      },
      {
        productId: pizza8.id,
        size: 25,
        pizzaType: 2,
        price: 190,
      },
      {
        productId: pizza8.id,
        size: 30,
        pizzaType: 2,
        price: 220,
      },
      {
        productId: pizza8.id,
        size: 40,
        pizzaType: 2,
        price: 250,
      },

      // Four Cheese
      {
        productId: pizza9.id,
        size: 30,
        pizzaType: 1,
        price: 280,
      },
      {
        productId: pizza9.id,
        size: 40,
        pizzaType: 1,
        price: 310,
      },
      {
        productId: pizza9.id,
        size: 25,
        pizzaType: 2,
        price: 290,
      },
      {
        productId: pizza9.id,
        size: 30,
        pizzaType: 2,
        price: 320,
      },
      {
        productId: pizza9.id,
        size: 40,
        pizzaType: 2,
        price: 350,
      },

      // Інші продукти

      // Сніданок
      { productId: 1, price: 129 },
      { productId: 2, price: 100 },
      { productId: 3, price: 100 },
      { productId: 4, price: 40 },
      { productId: 5, price: 40 },
      { productId: 6, price: 40 },
      { productId: 7, price: 210 },
      { productId: 8, price: 169 },
      { productId: 9, price: 139 },
      { productId: 10, price: 169 },

      { productId: 11, price: 49 },
      { productId: 12, price: 49 },
      { productId: 13, price: 49 },
      { productId: 14, price: 49 },
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
