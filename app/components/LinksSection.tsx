import React from "react";
import "./LinksSection.css";

const LinksSection = () => {
  return (
    <section className="links-section">
      <h2 className="links-header">
        웹투엑스를 더 쉽고 간편하게 확인하고 싶다면, 아래 내용을 확인해보세요.
      </h2>
      <div className="links-cards">
        <div className="link-card">
          <span className="link-text">웹투엑스 1분 영상</span>
          <span className="link-arrow">➜</span>
        </div>
        <div className="link-card">
          <span className="link-text">서비스 소개서</span>
          <span className="link-arrow">➜</span>
        </div>
        <div className="link-card">
          <span className="link-text">웹투엑스 문의하기</span>
          <span className="link-arrow">➜</span>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
