import React from "react";
import "./PortalMainV2.css";

const PortalMainV2 = () => {
  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">WEB2X</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#">솔루션</a>
            </li>
            <li>
              <a href="#">고객지원</a>
            </li>
            <li>
              <a href="#">프로젝트</a>
            </li>
            <li>
              <a href="#">소개</a>
            </li>
          </ul>
        </nav>
        <button className="login-button">로그인</button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>웹2X의 시작</h1>
          <p>블록체인을 API로 적용한 서비스를 경험하세요.</p>
          <button className="hero-button">WEB2X 확인 보기</button>
        </div>
        <div className="hero-image">[회색 박스]</div>
      </section>

      <section className="promo-section">
        <div className="promo-card">
          <h3>개발자라면, 개발가이드</h3>
          <button className="promo-button">바로가기</button>
        </div>
        <div className="promo-card">
          <h3>지금 받아보면 기분이 한결!</h3>
          <button className="promo-button">할인 받기</button>
        </div>
      </section>

      <section className="links-section">
        <button className="link-button">WEB2X 1분 영상</button>
        <button className="link-button">서비스 소개</button>
        <button className="link-button">필투엑스 문의하기</button>
      </section>

      <section className="features-section">
        <h2>쉽고 빠른 웹3, WEB2X</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>API 연동으로</h3>
            <p>블록체인 노드 없이 API 연동으로</p>
          </div>
          <div className="feature-card">
            <h3>저비용제로</h3>
            <p>기존 언어가 아닌 자바스크립트로</p>
          </div>
          <div className="feature-card">
            <h3>기능 소개</h3>
            <p>가상화폐 수수료 대신 정액 결제</p>
          </div>
          <div className="feature-card">
            <h3>기존 서비스</h3>
            <p>기존 서비스 그대로 블록체인 제공</p>
          </div>
          <div className="feature-card">
            <h3>자체 구축</h3>
            <p>자체 구축 대비 최저 비용 제공</p>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h2>국내 서비스를 위한 WEB2X</h2>
        <div className="service-cards">
          <div className="service-card">[회색 박스]</div>
          <div className="service-card">[회색 박스]</div>
          <div className="service-card">[회색 박스]</div>
        </div>
      </section>

      <section className="cost-section">
        <h2>최강 가성비 WEB2X</h2>
        <div className="cost-cards">
          <div className="cost-card">
            <p>기존 블록체인 솔루션</p>
            <ul>
              <li>블록체인 적용 준비 완료 3개월 선</li>
              <li>블록체인 메인넷 서비스 6개월 선</li>
              <li>기존 비용 3~6개월 내외</li>
            </ul>
          </div>
          <div className="cost-card">
            <p>WEB2X API 사용 시</p>
            <ul>
              <li>웹 200만 회 이상 일간 2천4백만 회</li>
              <li>연간 비용 절감률 97% 달성 효과</li>
              <li>기존 서비스 유지</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="footer">
        <h2>회사소개</h2>
        <div className="footer-cards">
          <div className="footer-card">[회색 박스]</div>
          <div className="footer-card">[회색 박스]</div>
          <div className="footer-card">[회색 박스]</div>
        </div>
      </section>
    </div>
  );
};

export default PortalMainV2;
