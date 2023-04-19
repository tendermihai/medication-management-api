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
  for (let i = 0; i < medications.length; i++) {
    for (let j = 0; j < medications.length; j++) {
      if (medications[i][field] > medications[j][field]) {
        let aux = medications[i];
        medications[i] = medications[j];
        medications[j] = aux;
      }
    }
  }
  return medications;
}
