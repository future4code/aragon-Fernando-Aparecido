import axios from "axios"
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/order").then((res) => {
            setOrders(res.data.orders)
        })
    }, [])
    return (
        <>
            <header>
                <p> Ambulnz</p>
            </header>
            <main>
                <h1>
                    "Pagina de Pedidos "
                </h1>
                <ul>
                    {orders.map((order) => (
                        <li>
                            <p> {order.id}</p>
                            <p>{order.totalPrice} </p>
                            <p> {order.pizzaId}</p>
                            <p> {order.userId}</p>
                            <p> {order.deliveredAt}</p>

                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

