export interface IPizzaDB {
    id: string,
    name: string,
    ingredients: string,
    price: number
}

export interface IOrderDB {
    id: string,
    created_at: Date,
delivered_at: Date | null,
    pizza_id: string,
    user_id: string,
    total_price: number
}

export class Order {
    constructor(
        private id: string,
        private createdAt: Date,
        private pizzaId: string,
        private userId: string,
        private totalPrice: number,
        private deliveredAt: Date = null
    ) { }

    public getId = () => {
        return this.id
    }

    public getPizzaId = () => {
        return this.pizzaId
    }

    public getCreatedAt = () => {
        return this.createdAt
    }

    public getDeliveredAt = () => {
        return this.deliveredAt
    }

    public getUserId = () => {
        return this.userId
    }

    public getTotalPrice = () => {
        return this.totalPrice
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setPizzaId = (newPizzaId: string) => {
        this.pizzaId = newPizzaId
    }

    public setTotalPrice = (newTotalPrice: number) => {
        this.totalPrice = newTotalPrice
    }

    public setCreatedAt = (newCreatedAt: Date) => {
        this.createdAt = newCreatedAt
    }

    public setDeliveredAt = (newDeliveredAt: Date) => {
        this.deliveredAt = newDeliveredAt
    }

    public setUserId = (newUserId: string) => {
        this.userId = newUserId
    }
}

export class Pizza {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private ingredients: string
    ) { }
    public getId = () => {
        return this.id
    }


    public getName = () => {
        return this.name
    }

    public getPrice = () => {
        return this.price
    }

    public getIngredients = () => {
        return this.ingredients
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setName = (newName: string) => {
        this.name = newName
    }

    public setPrice = (newPrice: number) => {
        this.price = newPrice
    }

    public setIngredients = (newIngredients: string) => {
        this.ingredients = newIngredients
    }
}

export interface IGetPizzaInputDTO {
    token: string,
    search?: string,
    sort?: string,
    limit?: number,
    page?: number,
    offset?: number
}

export interface IDeletePizzaInputDTO {
    token: string,
    id: string
}

export interface ICreatePizzaInputDTO {
    token: string,
    name: string,
    price: number,
    ingredients: string
}

export interface ICreatePizzaOutputDTO {
    message: string,
    pizza: Pizza
}

export interface IDeletePizzaOutputDTO {
    message: string
}

export interface IGetPizzaOutputDTO {
    pizzas: Pizza[]
}

export interface ICreateOrderInputDTO {
    token: string,
    pizzaId: string
}

export interface ICreateOrderOutputDTO {
    message: string
}

export interface IGetOrderOutputDTO {
    orders: Order[]
}

export interface IGetOrderByIdOutputDTO {
    order: Order
}

export interface IGetOrderByIdInputDTO {
    token: string,
    orderId: string
}

export interface IGetOrderInputDTO {
    token: string,
    search?: string,
    sort?: string,
    limit?: number,
    page?: number,
    offset?: number
}

export interface IConfirmDeliveryInputDTO {
    token: string,
    orderId: string
}

export interface IConfirmDeliveryOutputDTO {
    message: string
}
