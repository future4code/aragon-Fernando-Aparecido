import axios from "axios";
axios.get("http://localhost:3003/").then((res)=>{
console.log(res.data)
})