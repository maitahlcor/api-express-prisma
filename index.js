const express = require("express");
const { PrismaClient } = require("@prisma/client");
const morgan = require("morgan");

const app = express();
const prisma = new PrismaClient();

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

const PORT = process.env.PORT ?? 3001;

app.get("/api/persons", async (req, res) => {
  const persons = await prisma.persons.findMany();

  return res.json(persons);
});

app.post("/api/persons", async (req, res) => {
  try {
    const { name, phone_number } = req.body;

    if (name === "" || phone_number === 0) {
      return res
        .status(406)
        .json({ message: "error: number and name required" });
    }

    const persons = await prisma.persons.findMany();
    if (persons.find((person) => person.name === name)) {
      return res
        .status(409)
        .json({ message: "error: name already registered" });
    }

    const contactCreated = await prisma.persons.create({
      data: {
        name,
        phone_number,
      },
    });
    return res.json(contactCreated);
  } catch (err) {
    console.error(err);
  }
});

app.get("/info", async (req, res) => {
  try {
    const persons = await prisma.persons.findMany();
    const people = persons.length;
    const currentDate = new Date();
    return res.send(
      `Phonebook has info for ${people} people<br><br>Time: ${currentDate}`
    );
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const person = await prisma.persons.findMany({
    where: {
      id: id,
    },
  });
  if (Object.keys(person).length === 0)
    return res.status(404).json({ message: "Person not found" });

  return res.json(person);
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const personToDelete = await prisma.persons.delete({
    where: {
      id: id,
    },
  });
  console.log(`contact with id ${id} deleted`);
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});