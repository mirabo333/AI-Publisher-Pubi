import { useEffect, useState } from "react";

const IframeViewer = ({
  css,
  js,
}:
{
  css?: string;
  js?: string;
}) => {
  const [iFrame, setIFrame] = useState<any>(null);
  const [jsString, setJsString] = useState<string>("");


  useEffect(() => {
    const frame: HTMLIFrameElement = document.getElementById(
      "iframe-preview"
    ) as HTMLIFrameElement;
  
    setIFrame(frame.contentWindow?.document || null);
  }, []);

  useEffect(() => {
    if (!js) {
      if(iFrame) {
        iFrame.open();
        iFrame.write("");
        iFrame.close();
      }
      return;
    }

    const sIdx = js.indexOf("const");
    const eIdx = js.indexOf("export");
    const result = js.slice(sIdx, eIdx - 1);

    setJsString(result);
  }, [js]);

  useEffect(() => {
    if (!jsString || !css) {
      return;
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Component Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      </head>
      <body>
        <div id="preview-contents"></div>
        <script type="text/babel">
          ${jsString}
  
          const root = ReactDOM.createRoot(document.getElementById("preview-contents"));
          root.render(<App />);
        </script>
        <style>
          ${css}
        </style>
      </body>
    </html>`;
    
    setPreview(html);
  }, [jsString, css]);

  const setPreview = (html: string) => {
    if (iFrame) {
      iFrame.open();
      iFrame.write(html);
      iFrame.close();
    }
  };
  return <iframe id="iframe-preview" />;
};

export default IframeViewer;
