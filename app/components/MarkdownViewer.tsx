import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import "../assets/styles/trial.scss";

const MarkdownViewer = ({ text }: { text?: string }) => {

  return ( 
    <>
      <div className="markdown-view">
        {/* eslint-disable-next-line */}
        <ReactMarkdown children={text} rehypePlugins={[rehypeHighlight]} />
      </div>
    </>
  );
};

export default MarkdownViewer;
