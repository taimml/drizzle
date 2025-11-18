import { time } from "drizzle-orm/mysql-core";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    image: varchar("image", { length: 500 }),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", {length: 255}).notNull()
});

export const users = pgTable("users", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    birthDate: timestamp("birth_date"),
});

export const favorites = pgTable("favorites", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id").notNull().references(() => users.id),
    productId: varchar("product_id").notNull().references(() => products.id),
    timeAdded: timestamp("time_added").defaultNow(),
});

export const cart = pgTable("cart", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id").notNull().references(() => users.id),
    productId: varchar("product_id").notNull().references(() => products.id),
    quantity: integer("quantity").notNull().default(1),
})