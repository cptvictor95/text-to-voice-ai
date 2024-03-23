import { rootRouter } from "./root";

export const textToSpeechRouter = rootRouter.get(
  "/text-to-speech",
  (req, res) => {
    res.send("Text to speech API route online");
  }
);
