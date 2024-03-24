"use client";

import React from "react";

export const TextToSpeech = () => {
  const [speech, setSpeech] = React.useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const text = (target.elements[0] as HTMLInputElement).value;
    const voice_id = (target.elements[1] as HTMLInputElement).value;

    handleTextToSpeech(text, voice_id);
  };

  const handleTextToSpeech = async (text: string, voice_id: string) => {
    try {
      const payload = {
        text,
        voice_id,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      };

      const res = await fetch("http://localhost:8080/text-to-speech", options);

      const data = await res.json();

      console.log("DATA", data);

      setSpeech(data);
    } catch (error) {
      console.error("ERROR FETCHING API", error);
    }
  };

  console.log("SPEECH", speech);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Text to Speech</h1>

        <input type="text" placeholder="Enter text" className="text-gray-700" />
        <input
          type="text"
          placeholder="Enter voice id"
          defaultValue="EXAVITQu4vr4xnSDxMaL"
          className="text-gray-700"
        />

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Text to Speech
        </button>
      </form>

      <pre>
        {JSON.stringify(
          {
            model_id: "eleven_multilingual_v2",
            text: "oi tudo bem?",
            voice_settings: {
              similarity_boost: 0.8,
              stability: 0.5,
            },
          },
          null,
          2
        )}
      </pre>

      <div></div>
    </section>
  );
};
