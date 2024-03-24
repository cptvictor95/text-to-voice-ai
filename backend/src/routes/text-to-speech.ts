import { textToSpeechController } from "../controllers/textToSpeechController";
import { rootRouter } from "./root";

export const checkTextToSpeech = rootRouter.get(
  "/text-to-speech",
  (req, res) => {
    res.send("Text to speech API route online");
  }
);

export const makeTextToSpeech = rootRouter.post(
  "/text-to-speech",
  textToSpeechController
);

export const textToSpeechRouter = [checkTextToSpeech, makeTextToSpeech];
