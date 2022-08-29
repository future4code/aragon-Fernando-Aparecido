import { BaseDatabase } from "../BaseDatabase"
import { PizzaDatabase } from "../PizzaDatabase"
import { UserDatabase } from "../UserDatabase"
import { orders, pizzas, users } from "./data"

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            console.log(error.message)
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_ORDERS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZAS};
        DROP TABLE IF EXISTS ${UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZAS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
           ingredients VARCHAR(255) NOT NULL,
           price DECIMAL(5,2) NOT NULL
                   );

        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_ORDERS}(
            id VARCHAR(255) PRIMARY KEY,
            created_at DATETIME NOT NULL,
            delivered_at DATETIME,
            pizza_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            total_price DECIMAL(5,2) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase.TABLE_USERS}(id),
            FOREIGN KEY (pizza_id) REFERENCES ${PizzaDatabase.TABLE_PIZZAS}(id)
        );
        `)
    }

    insertData = async () => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(users)

        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .insert(pizzas)

        await BaseDatabase
            .connection(PizzaDatabase.TABLE_ORDERS)
            .insert(orders)
    }
}

const migrations = new Migrations()
migrations.execute()
