import express, { Request, Response } from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import connection from "./database/connection";
import { table_responsibles, table_tasks, table_users } from "./database/tables";
import { STATUS_LIST } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

app.get("/users", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const { search } = req.query
    if (!search) {
      const allUsers = await connection("Users").select("*")
      return res.status(200).send({ message: "sucesso", users: allUsers })
    }
    const searchUsers = await connection("Users").select("*")
      .where("name", "LIKE", `%${search}%`)
      .orWhere("nickname", "LIKE", `%${search}%`)
    res.status(200).send({ message: "sucesso", users: searchUsers })
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end()
    }
    else { res.status(errorCode).send(error.message) }
  }
})

app.get("/tasks", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const { search } = req.query
    if (!search) {
      const allTasks = await connection("Tasks").select("*")
      return res.status(200).send({ message: "sucesso", tasks: allTasks })
    }
    const searchTasks = await connection("Tasks").select("*")
      .where("title", "LIKE", `%${search}%`)
      .orWhere("description", "LIKE", `%${search}%`)
    res.status(200).send({ message: "sucesso", tasks: searchTasks })
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end()
    }
    else { res.status(errorCode).send(error.message) }
  }
})

app.get("/tasks/:tasksId/users", async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const { taskId } = req.params;
    const taskById = await connection(table_tasks)
      .select("*")
      .where({ id: taskId });
    if (!taskById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid task.");
    };
    const usersByTask = await connection(table_responsibles)
      .where({ taskId });
    const allUsersToTask = [];
    for (let user of usersByTask) {
      const result = await connection(table_users)
        .select("id", "nickname")
        .where({ id: user.userId });
      allUsersToTask.push(result);
    };
    res.status(200).send({
      message: "Sucesso!",
      users: allUsersToTask
    });
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end();
    } else {
      res.status(errorCode).send(error.message);
    };
  };
});

app.post("/tasks/:taskId/users", async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const taskById = await connection(table_tasks)
      .select("*")
      .where({ id: taskId });
    if (!taskById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid task.");
    };
    const userById = await connection(table_users)
      .select("*")
      .where({ id: userId });
    if (!userById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid user.");
    };
    const responsibility = await connection(table_responsibles)
      .select("*")
      .where({ userId })
      .andWhere({ taskId })
    if (responsibility[0]) {
      errorCode = 409;
      throw new Error("User has already been added to task.");
    };
    await connection(table_responsibles)
      .insert({ userId, taskId });
    res.status(201).send({
      message: "Usuário adicionado na tabela task com sucesso !"
    });
  } catch (err: any) {
    if (err.statusCode === 200) {
      res.status(500).end();
    } else {
      res.status(errorCode).send(err.message);
    };
  };
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { userId } = req.params;
    const { nickname } = req.body;
    if (!nickname) {
      errorCode = 422;
      throw new Error("Missing data in order to update user.");
    };
    if (typeof nickname !== "string") {
      errorCode = 422;
      throw new Error("Invalid nickname");
    };
    if (nickname.length < 4) {
      errorCode = 422;
      throw new Error("New nickname should have at least 3 characters.");
    };
    const userById = await connection(table_users)
      .select("*")
      .where({ id: userId });
    if (!userById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid user.");
    };
    await connection(table_users)
      .update({ nickname })
      .where({ id: userId });
    res.status(200).send({
      message: "Usuário atualizado com sucesso!"
    });
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end();
    } else {
      res.status(errorCode).send(error.message);
    };
  };
});

app.put("/tasks/:taskId", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    if (!status) {
      errorCode = 422;
      throw new Error("Missing data in order to update task.");
    };
    if (!(status in STATUS_LIST)) {
      errorCode = 422;
      throw new Error("Invalid status.");
    };
    const taskById = await connection(table_tasks)
      .select("*")
      .where({ id: taskId });
    if (!taskById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid task.");
    };
    await connection(table_tasks)
      .update({ status })
      .where({ id: taskId });
    res.status(200).send({
      message: "Estatos atualizado com sucesso da tasks!"
    });
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end();
    } else {
      res.status(errorCode).send(error.message);
    };
  };
});

app.delete("/tasks/:taskId", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { taskId } = req.params;
    const taskById = await connection(table_tasks)
      .select("*")
      .where({ id: taskId });
    if (!taskById[0]) {
      errorCode = 409;
      throw new Error("Id doesn´t match a valid task.");
    };
    await connection(table_responsibles)
      .delete()
      .where({ taskId: taskId });
    await connection(table_tasks)
      .delete()
      .where({ id: taskId });
    res.status(200).send({
      message: "Task removido com sucesso!"
    });
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end();
    } else {
      res.status(errorCode).send(error.message);
    };
  };
});

