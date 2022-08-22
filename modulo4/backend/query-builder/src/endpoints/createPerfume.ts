import { Request, Response } from "express"
import connection from "../database/connection"
import { TABLE_PERFUMES } from "../database/tableNames"
import { Perfume } from "../models/Perfume"

export const createPerfume = async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const name = req.body.name
    const price = req.body.price
    const brand = req.body.brand
    const ml = req.body.ml
    if (!name || !price || !brand || !ml) {
      throw new Error("Parâmetros  faltando")
    }

    if (typeof name !== "string") {
      errorCode = 422
      throw new Error("Parâmetro 'name' deve ser string.")
    }

    if (typeof price !== "number") {
      errorCode = 422
      throw new Error("Parâmetro 'price' deve ser number.")

    }

    if (price <= 0) {
      errorCode = 422
      throw new Error("Parâmetro 'price' deve ser number maior que 0.")

    }

    const newPerfurme: Perfume = {
      id: Date.now().toString(),
      name: name,
      price: price,
      brand: brand,
      ml: ml
    }

    await connection(TABLE_PERFUMES)
      .insert({
        id: newPerfurme.id,
        name: newPerfurme.name,
        price: newPerfurme.price,
        brand: newPerfurme.brand,
        ml: newPerfurme.ml
      })

    res.status(200).send({ message: "Sucesso" })
  } catch (error) {
    res.status(errorCode).send({ message: error.message })
  }
}    