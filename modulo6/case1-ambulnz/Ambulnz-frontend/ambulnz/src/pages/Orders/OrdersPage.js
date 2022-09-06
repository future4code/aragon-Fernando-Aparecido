import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/cordinator";

export default function OrdersPage() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    useEffect(() => { 
const token = window.localStorage.getItem("amb-token")

        if (!token) {
          goToLoginPage(navigate);
        }
    
    
      }, [])
    
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

