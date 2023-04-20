import {
  getMedication,
  getSortMedication,
  getByCompany,
} from "./repository.js";
import express, { json, request, response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/v1/medications/all", async (request, response) => {
  let medications = await getMedication();
  response.status(200).json(medications);
});

app.get("/api/v1/medications/sort/:field", async (request, response) => {
  let medications = await getSortMedication(request.params.field);
  response.status(200).json(medications);
});

app.get("/api/medications/find/company/:company", async (request, response) => {
  let medication = await getByCompany(request.params.company);
  if (medication !== null) {
    response.status(200).json(medication);
  } else {
    response.status(400).json({ message: "Company is not in data base" });
  }
});

app.listen(7070, () => {
  console.log("express is listening on 7070 ");
});
