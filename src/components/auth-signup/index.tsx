'use client';

import React from 'react';
import Input from '@/commons/components/input';
import Button from '@/commons/components/button';
import styles from './styles.module.css';

/**
 * 회원가입 컴포넌트
 * 모던한 디자인으로 구현된 회원가입 UI
 */
export default function AuthSignup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>새로운 계정을 만들어보세요</p>
        </div>

        {/* 폼 */}
        <form className={styles.form}>
          {/* 이메일 */}
          <div className={styles.formGroup}>
            <Input
              id="email"
              type="email"
              variant="primary"
              size="large"
              theme="light"
              placeholder="이메일을 입력하세요"
              label="이메일"
              className={styles.inputWidth}
            />
          </div>

          {/* 비밀번호 */}
          <div className={styles.formGroup}>
            <Input
              id="password"
              type="password"
              variant="primary"
              size="large"
              theme="light"
              placeholder="비밀번호를 입력하세요"
              label="비밀번호"
              className={styles.inputWidth}
            />
          </div>

          {/* 비밀번호 재입력 */}
          <div className={styles.formGroup}>
            <Input
              id="passwordConfirm"
              type="password"
              variant="primary"
              size="large"
              theme="light"
              placeholder="비밀번호를 다시 입력하세요"
              label="비밀번호 확인"
              className={styles.inputWidth}
            />
          </div>

          {/* 이름 */}
          <div className={styles.formGroup}>
            <Input
              id="name"
              type="text"
              variant="primary"
              size="large"
              theme="light"
              placeholder="이름을 입력하세요"
              label="이름"
              className={styles.inputWidth}
            />
          </div>

          {/* 회원가입 버튼 */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              size="large"
              theme="light"
              className={styles.buttonWidth}
            >
              회원가입
            </Button>
          </div>

          {/* 로그인 페이지로 이동 */}
          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <a href="/auth/login" className={styles.loginLink}>
              로그인하기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

