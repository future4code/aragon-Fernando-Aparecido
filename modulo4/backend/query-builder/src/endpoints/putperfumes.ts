import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const putPerfumesPrice = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const price = req.body.price

        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("Parâmetro 'price' deve ser number.")
        }

        if (price <= 0) {
            errorCode = 422
            throw new Error("Parâmetro 'price' deve ser number maior que 0.")
        }


        const precoExists = await connection(TABLE_PERFUMES)
            .select()
            .where("id", "=", `${id}`)

    }


    await  connection(TABLE_PERFUMES)
        .update({
            price: putPerfumesPrice
        })
        .where({
            id: putPerfumesPrice
        })

    res.status(200).send({ message: "Preço do produto editado com sucesso." })
      }  (error) {
    res.status(errorCode).send({ message: error.message })
}