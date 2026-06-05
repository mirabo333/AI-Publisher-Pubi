import React from "react";
import "./SignupForm.css";

const SignupForm = () => {
  return (
    <div className="signup-form-container">
      <form className="signup-form">
        <h2>회원가입</h2>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="사용하실 아이디를 등록해주세요."
            />
            <button type="button">중복확인</button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="사용하실 비밀번호를 입력해주세요."
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 등록해주세요."
            />
            <button type="button">인증요청</button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="verificationCode">인증번호</label>
          <div className="input-group">
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              placeholder="인증번호를 입력해주세요."
            />
            <button type="button">인증</button>
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="agreeTerms" />
            이용약관 (필수)
          </label>
          <label>
            <input type="checkbox" name="agreePrivacy" />
            개인정보 처리방침 (필수)
          </label>
          <label>
            <input type="checkbox" name="agreeMarketing" />
            마케팅 정보 수신 동의 (선택)
          </label>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">
            취소
          </button>
          <button type="submit" className="submit-button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
