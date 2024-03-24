import dotenv from "dotenv";
import { Request, Response } from "express";

import fs from "fs";
import { WritableStream } from "node:stream/web";

dotenv.config();

const API_KEY = process.env.ELEVEN_LABS_API_KEY!;
const MODEL_ID = "eleven_multilingual_v2";

export const textToSpeechController = async (req: Request, res: Response) => {
  const { payload } = req.body;

  const body = {
    model_id: MODEL_ID,
    text: payload.text,
    voice_settings: {
      similarity_boost: 0.8,
      stability: 0.5,
    },
  };
  const stringifiedBody = JSON.stringify(body);

  const options = {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: stringifiedBody,
  };

  try {
    try {
      const result = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${payload.voice_id}`,
        options
      );

      if (result.headers.get("Content-Type")?.startsWith("audio/mpeg")) {
        const blob = await result.blob();

        const filename = `${payload.text.split(" ").slice(0, 2).join("-")}.mp3`; // Adjust filename as needed
        const writeStream = fs.createWriteStream(filename);
        const writableStream = new WritableStream({
          write(chunk: any) {
            writeStream.write(chunk);
          },
          close() {
            writeStream.end();
          },
          abort() {
            writeStream.destroy();
          },
        });

        await new Promise((resolve, reject) => {
          blob.stream().pipeTo(writableStream);

          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        console.log("MP3 file saved successfully!");
        // You can send a response to your frontend here
        res.send({ message: "MP3 file generated successfully" });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors appropriately (e.g., send an error response to frontend)
      res.status(500).send({ message: "Error generating audio" });
    }
  } catch (error: any) {
    console.error("API ERROR", error);
    res.status(500).send({
      error: "Unexpected Error generating speech on API",
      message: error.message,
    });
  }
};
