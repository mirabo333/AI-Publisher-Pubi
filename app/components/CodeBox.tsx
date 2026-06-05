import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import IframeViewer from "./IframeViewer";
import COPYICON from "@/app/assets/images/ic-copy.svg";

const CODE = {
  JS: "jsx",
  CSS: "scss",
} as const;
type TCode = (typeof CODE)[keyof typeof CODE];
type TCodeBlock = {
  [key in TCode]: string;
};

const CodeBox = ({ code = "" }: { code?: string }) => {
  const [tab, setTab] = useState<TCode>(CODE.JS);
  const [previewCss, setPreviewCss] = useState<string>("");
  const [codeBlock, setCodeBlock] = useState<TCodeBlock>({
    [CODE.JS]: "",
    [CODE.CSS]: "",
  });

  useEffect(() => {
    const result: TCodeBlock = { [CODE.JS]: "", [CODE.CSS]: "" };
    const blocks = code?.split("```") || [];

    console.log(code, "::: code");
    console.log(result, "::: result");
    console.log(blocks, "::: blocks");

    console.warn(CODE, "::: CODE");

    if (!code) {
      if (codeBlock[CODE.CSS] || codeBlock[CODE.JS]) {
        setCodeBlock(result);
      }
      return;
    }

    blocks.forEach((block) => {
      switch (block.slice(0, 3)) {
        case "jsx":
        case "tsx":
          result[CODE.JS] = block;
          break;
        case "scs":
          result[CODE.CSS] = block.slice(0, 4) == "scss" ? block : "";
          break;
        case "css":
          setPreviewCss(block);
          break;
      }
    });

    setCodeBlock(result);
    // eslint-disable-next-line
  }, [code]);

  const handleTabClick = (tabKey: TCode) => {
    setTab(tabKey);
  };

  const handleCopy = async () => {
    try {
      const text = codeBlock[tab];
      await navigator.clipboard.writeText(text);
      alert(`${tab} copied to clipboard!`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="codebox container">
        <div className="preview tour-preview">
          <span>PREVIEW</span>
          <IframeViewer css={previewCss} js={codeBlock[CODE.JS]}></IframeViewer>
        </div>
        <div className="tour-codebox">
          <ul className="tab-nav">
            {Object.values(CODE).map((value) => (
              <li
                key={`codebox-tab-key-${value}`}
                className={tab == value ? "on" : ""}
                onClick={() => handleTabClick(value)}
              >
                {value}
              </li>
            ))}
          </ul>
          <div className="tab-content">
            {codeBlock[tab] && (
              <button className="copy-btn" onClick={handleCopy}>
                <COPYICON />
              </button>
            )}
            <MarkdownViewer text={"```" + codeBlock[tab] + "```"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeBox;
