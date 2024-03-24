import express from "express";
import { textToSpeechRouter } from "./routes/text-to-speech";

import cors from "cors";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API online");
});

app.use([...textToSpeechRouter]);

app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
