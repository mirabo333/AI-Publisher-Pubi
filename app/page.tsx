"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/assets/styles/main.module.scss";
import Image from "next/image";
import AddImage from "@/app/assets/images/add_image.png";
import CLIPICON from "@/app/assets/images/ic-clip.png";
import CodeBox from "./components/CodeBox";
import SENDICON from "@/app/assets/images/ic-send.svg";

import SIDEBARICON from "@/app/assets/images/ic-toggle.png";
import { useTour } from "@reactour/tour";
import { FaReact, FaSass } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import Loading from "./components/Loading";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Provider = "openai" | "anthropic" | "gemini";

const PROVIDERS: { value: Provider; label: string }[] = [
  { value: "anthropic", label: "Anthropic (Claude)" },
  { value: "openai",    label: "OpenAI (GPT-4o)" },
  { value: "gemini",    label: "Google (Gemini)" },
];

interface IMESSAGE {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<IMESSAGE[]>([]);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [presetIndex, setPresetIndex] = useState<number>(0);

  const [provider, setProvider] = useState<Provider>("anthropic");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);

  const [base64Image, setBase64Image] = useState<string>("");
  const [imageMimeType, setImageMimeType] = useState<string>("image/jpeg");
  const [response, setResponse] = useState<string | undefined>("");

  const [preview, setPreview] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [leftOpen, setLeftOpen] = useState<boolean>(true);

  const PUBI = `</PUBI>`;
  const leftSideRef = useRef(null);

  // localStorage에서 설정 복원
  useEffect(() => {
    const savedProvider = localStorage.getItem("ai_provider") as Provider | null;
    const savedKey = localStorage.getItem("ai_api_key") ?? "";
    if (savedProvider) setProvider(savedProvider);
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleProviderChange = (val: Provider) => {
    setProvider(val);
    localStorage.setItem("ai_provider", val);
  };

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("ai_api_key", val);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const setImage = (file?: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.onloadend = () => {
        const result = reader.result?.toString();
        const mimeMatch = result?.match(/^data:([^;]+);base64,/);
        if (mimeMatch) setImageMimeType(mimeMatch[1]);
        const base64 = result?.split(",")[1];
        if (base64) setBase64Image(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    setBase64Image("");
    setImageMimeType("image/jpeg");
    setQuestion("");
  };

  const handleReset = () => {
    setResponse("");
    setPreview(null);
    setBase64Image("");
    setImageMimeType("image/jpeg");
    setQuestion("");
    setChatHistory([]);
    setQuestionHistory([]);
    setPresetIndex(0);
  };

  // 질문하기
  const handleSubmit = async () => {
    if (!question && !base64Image) return;

    const currentQuestion = question;
    setQuestion("");

    // 질문 히스토리 누적 (화살표 키 이동용)
    const newQuestionHistory = [...questionHistory, currentQuestion];
    setQuestionHistory(newQuestionHistory);
    setPresetIndex(newQuestionHistory.length);

    try {
      setLoading(true);

      const response = await fetch("/api/imageai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          image: base64Image,
          imageMimeType,
          chatHistory,
          provider,
          apiKey,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // 스트리밍으로 실시간 업데이트
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setResponse(fullText);
      }

      // 대화 히스토리 누적 (이미지는 현재 턴에만 필요, 히스토리엔 텍스트만 저장)
      const userMessage: IMESSAGE = { role: "user", content: currentQuestion || "[이미지 첨부]" };
      const assistantMessage: IMESSAGE = { role: "assistant", content: fullText };
      setChatHistory((prev) => [...prev, userMessage, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing the request.");
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newFile: File | undefined = event.target.files?.[0];

    setImage(newFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const newFile: File | undefined = event.dataTransfer.files?.[0];

    // setImage(newFile);
    const newFile = event.dataTransfer.files?.[0];

    const files = event.dataTransfer.files;
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result?.toString();
      const mimeMatch = result?.match(/^data:([^;]+);base64,/);
      if (mimeMatch) setImageMimeType(mimeMatch[1]);
      const base64 = result?.split(",")[1];
      if (base64) setBase64Image(base64);
    };

    if (files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
    }

    if (newFile) {
      // setFile(newFile);
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

  // const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleTextChange = (value: string) => {
    // console.log(1);
    setQuestion(value);
  };

  const handleArrowUp = () => {
    if (questionHistory.length == 0) {
      return;
    } 
    else if(presetIndex > 0) {
      const index = presetIndex - 1;
      handleTextChange(questionHistory[index]);
      setPresetIndex(index);
    }
    else {
      return;
    }
  }

  const handleArrowDown = () => {
    if (questionHistory.length == 0) {
      return;
    }
    else if (presetIndex < questionHistory.length - 1) {
      const index = presetIndex + 1;
      handleTextChange(questionHistory[index])
      setPresetIndex(index)
    }
    else {
      setPresetIndex(questionHistory.length)
      handleTextChange("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case "Enter":
        handleSubmit();
        break;
      case "ArrowUp":
        handleArrowUp()
        break;
      case "ArrowDown":
        handleArrowDown()
        break;
    }
  };

  // left side bar toggle
  const handleToggleSideBar = () => {
    setLeftOpen(!leftOpen);
  };

const { setIsOpen } = useTour();
  const [isFirst, setIsFirst] = useState<boolean | null>(true);

  useEffect(() => {
    const firstVisit = localStorage.getItem("isFirst") !== "false";
    // const firstVisit = true;

    if (firstVisit) {
      setIsFirst(true);
      setIsOpen(true);
      localStorage.setItem("isFirst", "false");
    } else {
      setIsFirst(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    setPresetIndex(questionHistory.length);
  }, [questionHistory])

  return (
    <>
      <div
        className={`${styles.left_container} ${!leftOpen ? styles.open : ""}`}
      >
        {/* <div
          className="tenor-gif-embed"
          data-postid="10893156"
          data-share-method="host"
          data-aspect-ratio="1.68919"
          data-width="100%"
        >
          <a href="https://tenor.com/view/mgm-cat-gif-10893156">Mgm Cat GIF</a>
          from <a href="https://tenor.com/search/mgm-gifs">Mgm GIFs</a>
        </div>
        <script
          type="text/javascript"
          async
          src="https://tenor.com/embed.js"
        ></script> */}
        <Image
          src={SIDEBARICON}
          width={64}
          height={64}
          alt="sidebar icon"
          className={styles.sidebar_icon}
          onClick={handleToggleSideBar}
        />
        <div className={styles.left_wrap} ref={leftSideRef}>
          <div className={styles.logo}>
            <Image src={AddImage} alt="image" width={50} />
            <span>{`=>`}</span>
            <h1>{PUBI}</h1>
          </div>

          <button className={styles.reset_btn} onClick={handleReset}>
            RESET
          </button>

          {/* API 설정 */}
          <div className={styles.api_settings}>
            <select
              value={provider}
              onChange={(e) => handleProviderChange(e.target.value as Provider)}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <div className={styles.key_input_wrap}>
              <input
                type={showKey ? "text" : "password"}
                placeholder="API Key 입력"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
              />
              <button onClick={() => setShowKey(!showKey)} type="button">
                {showKey ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={`${styles.left_content} add-img`}>
            <div
              className={`${styles.image_area}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {preview ? (
                <>
                  <Image src={preview} alt="Preview" width={150} height={150} />
                  <button onClick={handleDelete}>
                    <FaRegTrashCan />
                  </button>
                </>
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>

            <div
              className={`${styles.inputs} ${
                activeInput ? styles.active : ""
              } tour-input`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label>
                <Image src={CLIPICON} width={20} height={20} alt="파일 첨부" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              <input
                placeholder="Enter text here"
                value={question}
                onChange={(e) => handleTextChange(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={() => setActiveInput(true)}
                onBlur={() => setActiveInput(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              <button className={styles.submit_btn} onClick={handleSubmit}>
                <SENDICON /> SUBMIT
              </button>
            </div>
            <div className={styles.codelang_wrap}>
              <FaReact />
              <BiLogoTypescript />
              <FaSass />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.right_container} tour-results`}>
        <div
          className={`${styles.right_box} ${
            loading ? styles.loading : ""
          }  show-code`}
        >
          {loading ? <Loading /> : <CodeBox code={response} />}
        </div>
      </div>
    </>
  );
}
