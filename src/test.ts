import { desc } from "drizzle-orm";
import { createUser, deleteUser, updateUser, getUsers, getUsersWithFavoritesProducts, createProduct, deleteProduct } from "./functions";

async function testFunctions() {
    try {
        const user1 = await createUser({
            name: "Ivan",
            email: "ehznla@mail.ru",
            birthDate: new Date("2008-11-25")
        });
        console.log("Создан ", user1);

        const user2 = await createUser({
            name: "Masha",
            email: "rmghst@mail.ru",
            birthDate: new Date("2007-02-18")
        });
        console.log("Создан", user2);

        const user3 = await createUser({
            name: "Ilya",
            email: "dhsudaj@mail.ru",
            birthDate: new Date("1999-10-23")
        });
        console.log("Создан: ", user3);

        const deletedUser = await deleteUser(user2.id);
        console.log('Удален:', deletedUser);

        const updatedUser = await updateUser(user1.id, {
            name: "Misha"
        });
        console.log("Обновлен: ", updatedUser)

        const users = await getUsers();
        console.log('Все пользователи:', users);

       


        const product1 = await createProduct({
            image: "",
            name: "shirt",
            description: "n jdfjd njdn jdnjcndjcnj jdn vndjvnjdcnjd j njd nvjk"
        })
        console.log("Создан: ", product1)

        const product2 = await createProduct({
            image: "",
            name: "jeans",
            description: "sjkf jjkfbs jbsfhu byfhijs"
        })
        console.log("Создан: ", product2)

        const deletedProduct = await deleteProduct(product1.id);
        console.log("Удален: ", deletedProduct)

        const usersWithFavoritesProducts = await getUsersWithFavoritesProducts();
        usersWithFavoritesProducts.forEach((user, index) => {
            if (user.favorites.length > 0) {
                console.log(`${index + 1}. ${user.name}`);
                console.log(`Избранных товаров: ${user.favorites.length}`);

                user.favorites.forEach(fav => {
                    console.log(`ID: ${fav.products.id}`);
                    console.log(`Товар: ${fav.products.name}`);
                    console.log(`Описание: ${fav.products.description}`);
                    console.log(`Добавлен: ${fav.timeAdded}`);
                });
                console.log();
            }
        })
        console.log("Пользователи с их избранными товарами: ", usersWithFavoritesProducts)
    }
    catch (error) {
        console.error("Ошибка: ", error);
    }
}

testFunctions();