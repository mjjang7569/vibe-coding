'use client';

import React from 'react';
import Input from '@/commons/components/input';
import Button from '@/commons/components/button';
import styles from './styles.module.css';

/**
 * 로그인 컴포넌트
 * 모던한 디자인으로 구현된 로그인 UI
 */
export default function AuthLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>계정에 로그인하세요</p>
        </div>

        {/* 폼 */}
        <form 
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
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

          {/* 로그인 버튼 */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              size="large"
              theme="light"
              className={styles.buttonWidth}
            >
              로그인
            </Button>
          </div>

          {/* 회원가입 페이지로 이동 */}
          <div className={styles.footer}>
            <span className={styles.footerText}>계정이 없으신가요?</span>
            <a href="/auth/signup" className={styles.signupLink}>
              회원가입하기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

