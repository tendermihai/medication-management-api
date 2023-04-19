import { getMedication, getSortMedication } from "./repository.js";
import express, { json, request, response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/v1/medications/all", async (request, response) => {
  let medications = await getMedication();
  response.status(200).json(medications);
});

app.get("/api/v1/medications/sort:field", async (request, response) => {
  let medications = await getSortMedication(request.params.field);
  response.status(200).json(medications);
});

app.listen(7070, () => {
  console.log("express is listening on 7070 ");
});
