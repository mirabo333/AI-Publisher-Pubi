"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
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

interface IMESSAGE {
  role: string;
  content: string;
}

// const questionList = [
//   "좀 전 ui코드에 이 이미지와 동일한 ui에 추가 반영해줘",
//   "좀 전 ui 코드 다시 보여줘",
//   "지금 그 컴포넌트를 사용해서 이미지를 웹 ui로 구현해줘",
//   "두번 이상 사용되는 css의 값을 변수나 mixin으로 변경해줘",
//   "웹 페이지 ui에서 버튼 disabled 처리된 걸로 보여줘",
// ];

export default function Home() {
  const [question, setQuestion] = useState("");
  // const [chatHistory, setChatHistory] = useState<IMESSAGE[] | []>([]);
  const [questionHisroty, setQuestionHistory] = useState<string[]>([]);
  const [presetIndex, setPresetIndex] = useState<number>(0);

  const [base64Image, setBase64Image] = useState<string>("");
  const [response, setResponse] = useState<string | undefined>("");

  // const [file, setFile] = useState<File | null>(null);
  // const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [leftOpen, setLeftOpen] = useState<boolean>(true);
  // const [resetCode, setResetCode] = useState<boolean>(false);

  const PUBI = `</PUBI>`;

  const leftSideRef = useRef(null);

  // TODO: question 적용 여부 확인 후 삭제
  // const handleQuestionSubmit = async (event: MouseEvent) => {
  //   event.preventDefault();

  //   if (!question.trim()) return;

  //   const userMessage: IMESSAGE = { role: "user", content: question };
  //   setChatHistory([...chatHistory, userMessage]);

  //   console.log(userMessage, "::: userMessage");

  //   try {
  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userMessage),
  //     });

  //     const data = await response.json();

  //     const assistantMessage: IMESSAGE = {
  //       role: "assistant",
  //       content: data.answer,
  //     };

  //     console.log(response, ":::response");

  //     if (response.ok) {
  //       setChatHistory((prevChatHistory) => [
  //         ...prevChatHistory,
  //         assistantMessage,
  //       ]);
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     const errorMessage: IMESSAGE = {
  //       role: "assistant",
  //       content: "Sorry, something went wrong. Please try again later.",
  //     };
  //     setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
  //   }

  //   setQuestion("");
  // };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //   }
  // };

  const setImage = (file?: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(",")[1];
        if (base64) {
          setBase64Image(base64);
        }
        console.log(base64, "::: base64");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    setBase64Image("");
    setQuestion("");
    // 코드 리셋
    // setResponse("");
  };

  const handleReset = () => {
    setResponse("");
    setPreview(null);
    setBase64Image("");
    setQuestion("");
    // setResetCode(true);
  };

  // 질문하기
  const handleSubmit = async () => {
    if (!question && !base64Image) return;

    // 질문 초기화
    setQuestion("");

    const userMessage: IMESSAGE = { role: "user", content: question };
    // setChatHistory([...chatHistory, userMessage]);
    setQuestionHistory([...questionHisroty, userMessage.content]);

    console.log(userMessage, "::: userMessage");

    if (base64Image) {
      console.log(question, 56789);
      // question = `기존 코드에서 추가하는 거야 ${question}`;
    }
    const formData: any = {
      question: question ? question : "",
      image: base64Image ? base64Image : "",
    };

    try {
      // 로딩
      setLoading(true);

      const response = await fetch("/api/imageai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log(JSON.stringify(data), 676767676666);
      setResponse(data.answer);

      // const assistantMessage: IMESSAGE = {
      //   role: "assistant",
      //   content: data.answer,
      // };

      // console.log(assistantMessage, ":::assistantMessage");

      // if (response.ok) {
      //   setChatHistory((prevChatHistory) => [
      //     ...prevChatHistory,
      //     assistantMessage,
      //   ]);
      // } else {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing the request.");
    }

    setLoading(false);
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
      const base64 = reader.result?.toString().split(",")[1];
      if (base64) {
        setBase64Image(base64);
      }
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
    if (questionHisroty.length == 0) {
      return;
    } 
    else if(presetIndex > 0) {
      const index = presetIndex - 1;
      handleTextChange(questionHisroty[index]);
      setPresetIndex(index);
    }
    else {
      return;
    }
  }

  const handleArrowDown = () => {
    if (questionHisroty.length == 0) {
      return;
    }
    else if (presetIndex < questionHisroty.length - 1) {
      const index = presetIndex + 1;
      handleTextChange(questionHisroty[index])
      setPresetIndex(index)
    }
    else {
      setPresetIndex(questionHisroty.length)
      handleTextChange("")
    }
  }

  const handleKeyPress = (e: any) => {
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

  const handleClickQuestion = (e: any) => {
    const question = e.target.innerText.replace("#", "").trim();
    setQuestion(question);
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
    setPresetIndex(questionHisroty.length);
  }, [questionHisroty])

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
          {/* <button className={styles.reset_btn} onClick={() => setIsOpen(true)}>
            tour guide
          </button> */}

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
            {/* TODO: 질문 내용 */}
            {/* <>
              {chatHistory.map((msg, i) => {
                <div key={i}>{msg.content}</div>;
              })}
            </> */}
            {/* <div className={`${styles.questions} tour-quesion`}>
              <ul>
                {questionList.map((question, i) => (
                  <li key={i} onClick={handleClickQuestion}>
                    # {question}
                  </li>
                ))}
              </ul>
            </div> */}
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
