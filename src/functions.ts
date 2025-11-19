import { eq } from "drizzle-orm";
import { db } from "./db/index";
import { users, products, favorites, cart } from "./db/schema";


export async function createUser(userData: {
    name: string;
    email: string;
    birthDate: Date;
}) {
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
}

export async function deleteUser(id: string) {
    const [deletedUser] = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();
    return deletedUser;
}

export async function updateUser(id: string, userData: {
    name?: string;
    email?: string;
    birthDate?: Date;
}) {
    const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning()
    return updatedUser;
}

export async function getUsers() {
    return await db.select().from(users);
}




export async function createProduct(productData: {
    image: string;
    name: string;
    description: string;
}) {
    const [newProduct] = await db.insert(products).values(productData).returning();
    return newProduct;
}

export async function deleteProduct(id: string) {
    const [deletedProduct] = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();
    return deletedProduct;
}

export async function updateProducts(id: string, productData: {
    image?: string;
    name?: string;
    description?: string;
}) {
    const [updatedProduct] = await db
        .update(products)
        .set(productData)
        .where(eq(products.id, id))
        .returning()
    return updatedProduct;
}

export async function getProducts() {
    return await db.select().from(products);
}






export async function getUsersWithFavoritesProducts() {
    return await db.query.users.findMany({
        with: {
            favorites: {
                with: {
                    products: true,
                },
            },
        },
    });
};
