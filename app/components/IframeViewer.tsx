import { useEffect, useRef, useState } from "react";

const IframeViewer = ({
  css,
  js,
}: {
  css?: string;
  js?: string;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [jsString, setJsString] = useState<string>("");

  useEffect(() => {
    if (!js) {
      const doc = iframeRef.current?.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write("");
        doc.close();
      }
      setJsString("");
      return;
    }

    // 코드펜스 언어 prefix 제거 (tsx, jsx 등)
    const withoutPrefix = js.replace(/^[a-z]+\n/, "");

    // import 구문 및 export 구문 제거 (Babel standalone에서 resolve 불가)
    const cleaned = withoutPrefix
      .replace(/^import\s[\s\S]*?from\s['"][^'"]+['"];?\s*$/gm, "")
      .replace(/^export\s+default\s+\w+;?\s*$/gm, "")
      .replace(/^export\s+default\s+/gm, "")
      .replace(/^export\s+(const|let|var|function|class)\s+/gm, "$1 ")
      .trim();

    setJsString(cleaned);
  }, [js]);

  useEffect(() => {
    // CSS 없어도 JSX만 있으면 미리보기 표시
    if (!jsString) return;

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <style>${css ?? ""}</style>
  </head>
  <body>
    <div id="preview-contents"></div>
    <script type="text/babel">
      ${jsString}
      const root = ReactDOM.createRoot(document.getElementById("preview-contents"));
      root.render(<App />);
    </script>
  </body>
</html>`;

    const doc = iframeRef.current?.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [jsString, css]);

  return <iframe ref={iframeRef} id="iframe-preview" />;
};

export default IframeViewer;
