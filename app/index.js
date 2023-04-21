import {
  getMedication,
  getSortMedication,
  getByCompany,
  getById,
  generateId,
  verifyId,
  addMedication,
  deleteMedication,
  updateMedication,
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

app.get(
  "/api/v1/medications/find/company/:company",
  async (request, response) => {
    let medication = await getByCompany(request.params.company);
    if (medication !== null) {
      response.status(200).json(medication);
    } else {
      response.status(400).json({ message: "Company is not in data base" });
    }
  }
);

app.get("/api/v1/medications/find/id/:id", async (request, response) => {
  let medication = await getById(request.params.id);
  if (medication !== null) {
    response.status(200).json(medication);
  } else {
    response.status(400).json({ message: "ID is not in data base" });
  }
});

app.post("/api/v1/medications/add", async (request, response) => {
  let medication = {
    company: request.body.company,
    brand_name: request.body.brand_name,
    generic_name: request.body.generic_name,
    diagnosis_code: request.body.diagnosis_code,
    nhs_number: request.body.nhs_number,
  };

  await addMedication(medication);
  response.status(200).json(medication);
});

app.delete("/api/v1/medications/delete/:id", async (request, response) => {
  const id = request.params.id;
  await deleteMedication(id);
  response.status(200).json(id);
});

app.put("/api/v1/medications/update", async (request, response) => {
  await updateMedication(request.body.medication);
  response.status(200).json(request.body.medication);
});

app.listen(7070, () => {
  console.log("express is listening on 7070 ");
});
