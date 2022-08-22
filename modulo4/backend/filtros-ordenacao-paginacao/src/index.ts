import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { getProdutcs } from "./endpoints/getProducts";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

// Get produtcs
app.get("/products", getProdutcs)
