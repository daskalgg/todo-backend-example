const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");

const app = express();
const PORT = 8080;

const db = database.initdb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function getId(req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid id param : ${id}`);
}

// Get all TODOs
app.get("/api/all", async (req, res) => {
  const alltodos = await db.models.todo.findAll();
  res.status(200).send(alltodos);
});

// Create a new TODO
app.post("/api/create", async (req, res) => {
  console.log(req.body);
  let todo = await db.models.todo.create(req.body);
  res.status(201).send(todo);
});

app.put("/api/update", async (req, res) => {
  await db.models.todo.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  console.log("UPDATE", req.body);
  res.status(200).end();
});

app.delete("/api/delete/:id", async (req, res) => {
  const id = getId(req);
  await db.models.todo
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(400).send("Bad request on delete", error);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}.`);
});
