"use client";

import { useEffect, useState, useOptimistic } from "react";
import styles from "@/app/assets/styles/main.module.scss";

interface IMESSAGE {
  role: string;
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<IMESSAGE[]>([]);

  const [response, setResponse] = useState<string | undefined>("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    const quest = question;
    setQuestion("");
    const result = await fetch(`/api/tf`, {
      method: "POST",
      body: JSON.stringify({ question: quest, imgUrl: preview }),
      // headers: { "Content-Type": "application/json" },
    });

    const res = await result.json();
    const { message } = res;
    // const { message }: { message: IMESSAGE } = await result.json();
    // const history = chatHistory;
    // history.push(message);
    console.log(res);

    setResponse(message.content);
    // setChatHistory(history);
  };

  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];

    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);

        // console.log(reader.result);
      };
      reader.readAsDataURL(newFile);
      // setImg(re as string);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files?.[0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {preview ? (
              <img src={preview} alt="Preview" style={{ maxWidth: "100%" }} />
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              // style={{ display: "none" }}
            />
          </div>
          <input
            placeholder="Enter text here"
            value={question}
            onChange={handleTextChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <button onClick={handleSubmit}>submit</button>
        </div>

        <div className={styles.right}>
          <code>{response}</code>
        </div>

        <div className={styles.right}>{/* chat history */}</div>
      </div>
    </main>
  );
}
