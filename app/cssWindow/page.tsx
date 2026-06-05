import React from "react";
import "./mybutton.css";
import FindIdForm from "../components/FindIdForm";
import PortalMain from "../components/PortalMain";
import PortalMainV2 from "../components/PortalMainV2";
import PortalMainV3 from "../components/PortalMainV3";
import PortalMainV4 from "../components/PortalMainV4";
import "./companyIntro.css";
import SignupForm from "./SignupForm";

const Web301 = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>쉽고 빠른 웹3, WEB2X</h1>
      </div>
      <div className="content">
        <div className="top-row">
          <div className="box">
            <p>
              블록체인 노드 설치 없이
              <br />
              API 연동만으로
            </p>
            <div className="icon api-icon">API</div>
          </div>
          <div className="box">
            <p>
              웹3 언어가 아닌
              <br />
              자바스크립트로
            </p>
            <div className="icon js-icon">JS</div>
          </div>
        </div>
        <div className="bottom-row">
          <div className="box">
            <p>
              가상화폐 수수료 대신
              <br />
              원화 결제
            </p>
            <div className="icon currency-icon">₩</div>
          </div>
          <div className="box">
            <p>
              기존 서비스 그대로
              <br />
              블록체인 지갑 설치
            </p>
            <div className="icon service-icon">👤</div>
          </div>
          <div className="box">
            <p>
              자체 구축대비
              <br />
              획기적 비용 절감
            </p>
            <div className="icon cost-icon">₩↓</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyIntro = () => {
  return (
    <div className="company-intro">
      <div className="content">
        <div className="header">
          <h1>회사소개</h1>
          <div className="logo">CPLABS 씨피랩스</div>
        </div>
        <div className="statistics">
          <div className="stat-box">
            <h2>블록체인 특허 출원</h2>
            <p>320개+</p>
          </div>
          <div className="stat-box">
            <h2>블록체인 서비스 경험</h2>
            <p>1,000만+</p>
          </div>
          <div className="stat-box">
            <h2>블록체인 사업</h2>
            <p>10년+</p>
          </div>
          <div className="stat-box">
            <h2>고객 및 파트너사</h2>
            <p>250개+</p>
          </div>
        </div>
        <div className="info-section">
          <div className="certifications">
            <h2>인증</h2>
            <ul>
              <li>2020 금융위 혁신금융서비스 지정 - 마이키핀</li>
              <li>2022 VASP 취득 | 2021 ISMS 인증 획득 - 마이키핀월렛</li>
              <li>2019 부산시 블록체인 규제자유특구 사업자 선정 - BPASS</li>
              <li>2021 과기부 규제샌드박스 승인 - 메타패스</li>
              <li>2021 GS 1등급 획득 - 메타패스</li>
              <li>2021 조달청 혁신제품 선정 - 메타패스</li>
            </ul>
          </div>
          <div className="awards">
            <h2>수상</h2>
            <ul>
              <li>2021 대한민국 SW품질대상 대상 - 메타패스</li>
              <li>블록체인 부문 과기부 장관상 3회 - 2018,2020,2021년 수상</li>
              <li>블록체인 유공표창 - 우정사업본부장상, 부산광역시장상 수상</li>
              <li>
                JB금융그룹 핀테크 경진대회 최우수상 - 핀테크 기술 사업화 부문
              </li>
              <li>
                한국경제 한경핀테크대상 최우수상 - 블록체인 기반 전자지갑 서비스
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <section className="service-section">
      <h2 className="section-title">02 국내 서비스를 위한 WEB2X</h2>
      <div className="service-cards">
        <div className="service-card">
          <div className="service-card-header">[회색 박스]</div>
          <div className="service-card-body">
            <h3>CREATIVE PROTOCOL CPLABS</h3>
            <p>국내 최고의 웹3 플랫폼 기술기업</p>
            <p>
              국내 1세대 블록체인기업 씨피랩스의 10여년의 기술 노하우 집약,
              50여건의 프로젝트를 통한 국내 기업들의 어려움 해소
            </p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-card-header">[회색 박스]</div>
          <div className="service-card-body">
            <h3>가상자산 아닌 원화결제</h3>
            <p>
              어려운 블록체인 네트워크 수수료는 모두 WEB2X에서 해결하고, 간편한
              원화결제로 회계이슈 없이 자유롭게 이용
            </p>
          </div>
        </div>
        <div className="service-card">
          <div className="service-card-header">[회색 박스]</div>
          <div className="service-card-body">
            <h3>커머스서비스 특화</h3>
            <p>
              회원관리, 등급, 쿠폰, 마켓플레이스 등 다양한 커머스에 최적화된
              월렛, NFT, SBT를 기존 서비스에 그대로 적용
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const VerificationForm = () => {
  return (
    <div className="verification-form">
      <label className="form-label" htmlFor="verification-code">
        인증번호 입력
      </label>
      <div className="input-group">
        <input
          type="text"
          id="verification-code"
          className="verification-input"
          placeholder="인증번호를 입력해주세요."
        />
        <button className="verify-button">인증</button>
      </div>
      <div className="navigation-buttons">
        <button className="nav-button back-button">뒤로</button>
        <button className="nav-button next-button">다음</button>
      </div>
    </div>
  );
};

const SolutionCard = () => {
  return (
    <div className="solution-card">
      <h2 className="solution-title">기존 블록체인 솔루션</h2>
      <ul className="solution-list">
        <li>
          블록체인 솔루션 평균 도입비용{" "}
          <span className="highlight">3억원 선</span>
        </li>
        <li>
          노드/개발자 등 유지운영 연간{" "}
          <span className="highlight">6억원 선</span>
        </li>
        <li>
          개발 적용 기간 - <span className="highlight">6개월 내외</span>
        </li>
      </ul>
    </div>
  );
};

const IdRegistration = () => {
  return (
    <div className="id-registration">
      <label className="id-label">아이디</label>
      <div className="input-group">
        <input
          type="text"
          placeholder="사용하실 아이디를 등록해주세요."
          className="id-input"
        />
        <button className="check-button">중복확인</button>
      </div>
      <p className="helper-text">
        아이디는 7~20자의 영문 소문자, 숫자, 특수문자 (-,_)만 사용 가능합니다
      </p>
    </div>
  );
};

const IdRegistration2 = () => {
  return (
    <div className="form-container">
      {/* 아이디 섹션 */}
      <div className="form-group">
        <label className="form-label">아이디</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="사용하실 아이디를 등록해주세요."
            className="form-input"
          />
          <button className="form-button">중복확인</button>
        </div>
        <p className="helper-text">
          아이디는 7~20자의 영문 소문자, 숫자, 특수문자 (-,_)만 사용 가능합니다
        </p>
      </div>

      {/* 비밀번호 섹션 */}
      <div className="form-group">
        <label className="form-label">비밀번호</label>
        <div className="input-group">
          <input
            type="password"
            placeholder="사용하실 비밀번호를 입력해주세요."
            className="form-input"
          />
          <button className="icon-button">👁</button>
        </div>
        <p className="helper-text">
          비밀번호는 8~16자 영문 대/소문자, 숫자, 특수문자(! $ - @ _)만 사용
          가능합니다.
        </p>
      </div>

      {/* 비밀번호 확인 섹션 */}
      <div className="form-group">
        <label className="form-label">비밀번호 확인</label>
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            className="form-input"
          />
          <button className="icon-button">👁</button>
        </div>
      </div>

      {/* 이메일 섹션 */}
      <div className="form-group">
        <label className="form-label">이메일</label>
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일을 등록해주세요."
            className="form-input"
          />
          <button className="form-button">인증요청</button>
        </div>
      </div>

      {/* 인증번호 섹션 */}
      <div className="form-group">
        <label className="form-label">인증번호</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="인증번호를 입력해주세요."
            className="form-input"
          />
          <button className="form-button">인증</button>
        </div>
      </div>
    </div>
  );
};

const InputFieldExamples = () => {
  return (
    <div className="input-container">
      <div className="input-group">
        <label>Default</label>
        <input type="text" className="input-field" placeholder="text" />
      </div>

      <div className="input-group">
        <label>Focus</label>
        <input type="text" className="input-field" placeholder="text" />
      </div>

      <div className="input-group">
        <label>Error</label>
        <input type="text" className="input-field error" placeholder="text" />
      </div>

      <div className="input-group">
        <label>Success</label>
        <input type="text" className="input-field success" placeholder="text" />
      </div>

      <div className="input-group">
        <label>Disabled</label>
        <input
          type="text"
          className="input-field"
          placeholder="text"
          disabled
        />
      </div>
    </div>
  );
};
const InputFieldWithTimer = () => {
  return (
    <div className="input-container">
      <div className="input-group">
        <label>Default</label>
        <div className="input-with-timer">
          <input type="text" className="input-field" placeholder="123456" />
          <span className="timer">02:57</span>
        </div>
      </div>

      <div className="input-group">
        <label>Focus</label>
        <div className="input-with-timer">
          <input
            type="text"
            className="input-field focus"
            placeholder="123456"
          />
          <span className="timer">02:57</span>
        </div>
      </div>

      <div className="input-group">
        <label>Error</label>
        <div className="input-with-timer">
          <input
            type="text"
            className="input-field error"
            placeholder="123456"
          />
          <span className="timer error">00:00</span>
        </div>
      </div>

      <div className="input-group">
        <label>Success</label>
        <div className="input-with-timer">
          <input
            type="text"
            className="input-field success"
            placeholder="123456"
          />
          <span className="timer success">00:00</span>
        </div>
      </div>
    </div>
  );
};

const ComponentExamples = () => {
  return (
    <div className="component-container">
      <div className="button-group">
        <h3>Button</h3>
        <div className="button-row">
          <span>Default</span>
          <button className="button default">title</button>
          <button className="button outline default">title</button>
        </div>
        <div className="button-row">
          <span>Hover/pressed</span>
          <button className="button hover">title</button>
          <button className="button outline hover">title</button>
        </div>
        <div className="button-row">
          <span>Disabled</span>
          <button className="button disabled" disabled>
            title
          </button>
          <button className="button outline disabled" disabled>
            title
          </button>
        </div>
      </div>

      <div className="checkbox-group">
        <h3>Checkbox</h3>
        <div className="checkbox-row">
          <span>Default</span>
          <div className="checkbox"></div>
          <div className="checkbox checked"></div>
          <div className="checkbox disabled"></div>
        </div>
      </div>

      <div className="switch-group">
        <h3>Switch</h3>
        <div className="switch-row">
          <span>Default</span>
          <div className="switch"></div>
          <div className="switch checked"></div>
          <div className="switch disabled"></div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <FindIdForm />
      <br></br>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <VerificationForm />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <SolutionCard /> */}
      {/* <ServiceSection /> */}
      <InputFieldExamples />
      <br></br>
      <br></br>
      <br></br>
      <InputFieldWithTimer />
      <br></br>
      <br></br>
      <br></br>
      <ComponentExamples />
      <br></br>
      <br></br>
      <br></br>
      {/* <SignupForm /> */}
      {/* <Web301 /> */}
      {/* <CompanyIntro /> */}
      <IdRegistration />
      <br></br>
      <br></br>
      <br></br>
      <IdRegistration2 />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <PortalMain /> */}
      {/* <PortalMainV2 /> */}
      {/* <PortalMainV3 /> */}
      <PortalMainV4 />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Home;
