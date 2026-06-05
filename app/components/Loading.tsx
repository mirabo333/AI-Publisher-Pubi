import Image from "next/image";
import LOADINGGIF from "@/app/assets/images/cat-loading.gif";
import LOADINGGIF2 from "@/app/assets/images/dancing-cat.gif";

const Loading = () => {
  const images = [LOADINGGIF, LOADINGGIF2];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="isLoading-wrap">
      <div className="loading-container">
        <div className="loading">
          <div className="loading__letter">p</div>
          <div className="loading__letter">r</div>
          <div className="loading__letter">o</div>
          <div className="loading__letter">c</div>
          <div className="loading__letter">e</div>
          <div className="loading__letter">s</div>
          <div className="loading__letter">s</div>
          <div className="loading__letter">i</div>
          <div className="loading__letter">n</div>
          <div className="loading__letter">g</div>
          <div className="loading__letter">.</div>
          <div className="loading__letter">.</div>
          <div className="loading__letter">.</div>
        </div>
      </div>
      <Image src={randomImage} width={211} height={374} alt="loading" />
    </div>
  );
};

export default Loading;
