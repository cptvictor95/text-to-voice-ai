import express from "express";
import { textToSpeechRouter } from "./routes/text-to-speech";

const app = express();

const port = 8080;

app.get("/", (req, res) => {
  res.send("API online");
});

app.use(textToSpeechRouter);

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
