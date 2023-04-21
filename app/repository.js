import fs from "fs";
import path from "path";

export function getMedication() {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const medications = JSON.parse(data);
        resolve(medications);
      }
    });
  });
}

export async function getSortMedication(field) {
  let medications = await getMedication();
  for (let i = 0; i < medications.length - 1; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      if (medications[i][field] > medications[j][field]) {
        let aux = medications[i];
        medications[i] = medications[j];
        medications[j] = aux;
      }
    }
  }

  return medications;
}

export async function getByCompany(company) {
  let medications = await getMedication();
  for (let i = 0; i < medications.length; i++) {
    if (medications[i].company === company) {
      return medications[i];
    }
  }
  return null;
}

export async function getById(id) {
  let medications = await getMedication();
  for (let i = 0; i < medications.length; i++) {
    if (medications[i].id === +id) {
      return medications[i];
    }
  }
  return null;
}

export async function verifyId(medications, id) {
  for (let i = 0; i < medications.length; i++) {
    if (medications[i].id == id) {
      return true;
    }
  }

  return false;
}

export async function generateId() {
  let medications = await getMedication();

  let id = Math.random() * 1000000 + 10000 + "";

  while (verifyId(medications, id) == true) {
    id = Math.random() * 1000000 + 10000 + "";
  }

  return id.replace(".", "");
}

export function save(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("data.json", JSON.stringify(data), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function addMedication(medication) {
  let medications = await getMedication();
  medication.id = await generateId();
  medications.push(medication);
  await save(medications);
}

export async function deleteMedication(id) {
  let data = await getMedication();

  let filter = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].id != id) {
      filter.push(data[i]);
    }
  }
  save(filter);
}

export async function updateMedication(editableMedication) {
  let data = await getMedication();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == editableMedication.id) {
      if (editableMedication.company) {
        data[i].company = editableMedication.company;
      }

      if (editableMedication.brand_name) {
        data[i].brand_name = editableMedication.brand_name;
      }

      if (editableMedication.generic_name) {
        data[i].generic_name = editableMedication.generic_name;
      }

      if (editableMedication.diagnosis_code) {
        data[i].diagnosis_code = editableMedication.diagnosis_code;
      }

      if (editableMedication.nhs_number) {
        data[i].nhs_number = editableMedication.nhs_number;
      }
    }
  }
  save(data);
}
