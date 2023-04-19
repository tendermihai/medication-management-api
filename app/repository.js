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
