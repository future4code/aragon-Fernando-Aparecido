export class Purchase {
    constructor(private id: string, private userId: string, private productId: string, private quantity: number, private totalPrice: number) {
        this.id = id
        this.userId = userId
        this.productId = productId
        this.quantity = quantity
        this.totalPrice = totalPrice
    }
    getId() {
        return this.id
    }

    getUserId() {
        return this.userId
    }

    getProductId() {
        return this.productId
    }

    getQuantity() {
        return this.quantity
    }

    getTotalPrice() {
        return this.totalPrice
    }
}

export class PurchaseDB {
    constructor(private id: string, private user_id: string, private product_id: string, private quantity: number, private total_price: number) {
        this.id = id
        this.user_id = user_id
        this.product_id = product_id
        this.quantity = quantity
        this.total_price = total_price
    }
    getId() {
        return this.id
    }

    getUserId() {
        return this.user_id
    }

    getProductId() {
        return this.product_id
    }

    getQuantity() {
        return this.quantity
    }

    getTotalPrice() {
        return this.total_price
    }

    setId(newId: string) {
        this.id = newId
    }

    setUserId(newUserId: string) {
        this.user_id = newUserId
    }

    setProductId(newProductId: string) {
        this.product_id = newProductId
    }

    setQuantity(newQuantity: number) {
        this.quantity = newQuantity
    }

    setTotalPrice(newTotalPrice: number) {
        this.total_price = newTotalPrice
    }
}

export type TPurchaseDB = {
    id: string,
    user_id: string,
    product_id: string
    quantity: number
    total_price: number
}

