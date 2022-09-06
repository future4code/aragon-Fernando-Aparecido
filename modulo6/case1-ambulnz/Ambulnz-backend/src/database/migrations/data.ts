import { IOrderDB, IPizzaDB } from "../../models/Pizza"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "101",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
        role: USER_ROLES.ADMIN
    },
    {
        id: "102",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
        role: USER_ROLES.NORMAL
    },
    {
        id: "103",
        name: "Ciclana",
        email: "ciclana@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
        role: USER_ROLES.NORMAL
    }
]

export const pizzas: IPizzaDB[] = [
    {
        id: "201",
        name: "Margherita",
        price: 5,
        ingredients: "tomato, mozzarella"
    },
    {
        id: "202",
        name: "Bufala",
        price: 6,
        ingredients: "tomato ,mozarella di bufala"
    },
    {
        id: "203",
        name: "Romana",
        price: 5,
        ingredients: "tomato, mozzarella, anchovies, oregano, oil"
    },
    {
        id: "204",
        name: "Diavola",
        price: 7.5,
        ingredients: "tomato, mozzarella, spicy salami"
    },
    {
        id: "205",
        name: "Pizza Bianca",
        price: 5,
        ingredients: "mozzarella,            oregano"
    }
]

export const orders: IOrderDB[] = [
    {
        id: "301",
        created_at: new Date("2022/08/24 16:28:00 GMT-03:00"),
        delivered_at: new Date("2022/08/24 17:35:00 GMT-03:00"),
        pizza_id: "202",
        total_price: 6,
        user_id: "101"
    },
    {
        id: "302",
        created_at: new Date("2022/08/23 16:40:27 GMT-03:00"),
        delivered_at: null,
        pizza_id: "205",
        total_price: 5,
        user_id: "102"
    },
    {
        id: "303",
        created_at: new Date("2022/08/24 16:28:00 GMT-03:00"),
        delivered_at: null,
        pizza_id: "204",
        total_price: 7,
        user_id: "103"
    }
]

