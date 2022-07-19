import { Request, Response } from "express-serve-static-core";
import { connect } from "http2";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const getPerfumes = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const query = req.query.q
        const sort = req.query.sort || "id"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset = limit * (page - 1)

        if (query) {
            const [result] = await connection
                .raw(`SELECT * FROM ${TABLE_PERFUMES}
                 WHERE id LIKE "%${query}%"
                 OR nome LIKE "%${query}%"
                 ORDER BY ${sort} ${order}
                 LIMIT ${limit}
                 OFFSET ${offset};`)

            return res.status(200).send({ getPerfumes: result })

        }
    }         catch(error) {
        res.status(errorCode).send({ message: error.message })
    }
}
