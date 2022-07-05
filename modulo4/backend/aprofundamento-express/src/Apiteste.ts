import axios from "axios";
axios.get("http://localhost:3003/Tarefa/u1").then((res)=>{
console.log(res.data)
}) 