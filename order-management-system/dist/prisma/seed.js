"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: "John Doe",
            address: "123 Main St",
            email: "johndoe@gmail.com",
            password: "password",
        },
    });
    await prisma.cart.create({
        data: {
            userId: 1,
            cartTotalPrice: 0,
        },
    });
    await prisma.product.create({
        data: {
            name: "Apple",
            description: "A fruit",
            price: 1.00,
            stock: 100,
        },
    });
    await prisma.product.create({
        data: {
            name: "Banana",
            description: "A fruit",
            price: 0.50,
            stock: 100,
        },
    });
    await prisma.product.create({
        data: {
            name: "Orange",
            description: "A fruit",
            price: 0.75,
            stock: 100,
        },
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map