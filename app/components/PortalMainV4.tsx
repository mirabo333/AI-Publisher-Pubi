import React from "react";
import "./PortalMainV3.css";
import LinksSection from "./LinksSection";

const MainPage = () => {
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

      <LinksSection />
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
            <div className="feature-icon">[아이콘]</div>
          </div>
          <div className="feature-card">
            <h3>저비용제로</h3>
            <p>기존 언어가 아닌 자바스크립트로</p>
            <div className="feature-icon">[아이콘]</div>
          </div>
          <div className="feature-card">
            <h3>가상화폐 수수료 대신</h3>
            <p>정액 결제</p>
            <div className="feature-icon">[아이콘]</div>
          </div>
          <div className="feature-card">
            <h3>기존 서비스 그대로</h3>
            <p>블록체인 제공 설치</p>
            <div className="feature-icon">[아이콘]</div>
          </div>
          <div className="feature-card">
            <h3>자체 구축 대비</h3>
            <p>획기적 비용 절감</p>
            <div className="feature-icon">[아이콘]</div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h2>국내 서비스를 위한 WEB2X</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>CREATIVE PROTOCOL CPLABS</h3>
            <p>국내 최고의 웹3 플랫폼 기술기업</p>
            <div className="service-icon">[아이콘]</div>
          </div>
          <div className="service-card">
            <h3>가상자산 아닌 원화결제</h3>
            <p>편리한 원화결제로 블록체인 기술을 자유롭게 이용</p>
            <div className="service-icon">[아이콘]</div>
          </div>
          <div className="service-card">
            <h3>커머스 서비스 특화</h3>
            <p>결제, 쿠폰, 마켓플레이스 등 다양한 서비스에 적용</p>
            <div className="service-icon">[아이콘]</div>
          </div>
        </div>
      </section>

      <section className="cost-section">
        <h2>최강 가성비 WEB2X</h2>
        <div className="cost-cards">
          <div className="cost-card">
            <h3>기존 블록체인 솔루션</h3>
            <ul>
              <li>블록체인 적용 준비 완료 3개월 선</li>
              <li>노드/개발자 등 유지관리 연간 6억원 선</li>
              <li>개발 적용 기간 - 6개월 내외</li>
            </ul>
          </div>
          <div className="cost-card">
            <h3>WEB2X API 사용 시</h3>
            <ul>
              <li>웹 200만 회 이상 연간 2천4백만 원</li>
              <li>자체 구축 운영대비 97% 절감 효과</li>
              <li>개발 적용 기간 - 즉시</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2>회사소개</h2>
        <div className="footer-cards">
          <div className="footer-card">
            <h3>트로피 수상</h3>
            <p>[아이콘]</p>
          </div>
          <div className="footer-card">
            <h3>최고의 기술력</h3>
            <p>[아이콘]</p>
          </div>
          <div className="footer-card">
            <h3>파트너와 협력</h3>
            <p>[아이콘]</p>
          </div>
        </div>
        <div className="footer-info">
          <p>블록체인의 도입부터 운영까지, WEB2X와 함께 하세요.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
