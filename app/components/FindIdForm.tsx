import React from "react";
import "./FindIdForm.css";

const FindIdForm = () => {
  return (
    <div className="find-id-form">
      <h1 className="form-title">아이디 찾기</h1>
      <p className="form-description">
        아이디를 찾기 위해 이메일 인증을 진행합니다.
      </p>

      <div className="form-group">
        <label className="form-label" htmlFor="email-verification">
          이메일 인증
        </label>
        <div className="input-group">
          <input
            type="email"
            id="email-verification"
            className="form-input"
            placeholder="가입한 이메일을 입력해주세요."
          />
          <button className="form-button request-button">인증요청</button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="code-verification">
          인증번호 입력
        </label>
        <div className="input-group">
          <input
            type="text"
            id="code-verification"
            className="form-input"
            placeholder="인증번호를 입력해주세요."
          />
          <button className="form-button verify-button">인증</button>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-button back-button">뒤로</button>
        <button className="nav-button next-button">다음</button>
      </div>
    </div>
  );
};

export default FindIdForm;
