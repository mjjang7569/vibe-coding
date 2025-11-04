'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';

/**
 * Pagination Variant Types
 */
export type PaginationVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Pagination Size Types
 */
export type PaginationSize = 'small' | 'medium' | 'large';

/**
 * Pagination Theme Types
 */
export type PaginationTheme = 'light' | 'dark';

/**
 * Pagination Props Interface
 */
export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 페이지네이션 변형 타입
   * @default 'primary'
   */
  variant?: PaginationVariant;

  /**
   * 페이지네이션 크기
   * @default 'medium'
   */
  size?: PaginationSize;

  /**
   * 페이지네이션 테마
   * @default 'light'
   */
  theme?: PaginationTheme;

  /**
   * 현재 페이지 번호
   * @default 1
   */
  currentPage?: number;

  /**
   * 전체 페이지 수
   * @default 1
   */
  totalPages?: number;

  /**
   * 페이지 변경 핸들러
   */
  onPageChange?: (page: number) => void;

  /**
   * 표시할 페이지 번호 개수
   * @default 5
   */
  visiblePages?: number;

  /**
   * 이전/다음 버튼 표시 여부
   * @default true
   */
  showNavigation?: boolean;

  /**
   * 첫 페이지/마지막 페이지 버튼 표시 여부
   * @default false
   */
  showFirstLast?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;
}

/**
 * Pagination Component
 * 
 * 다양한 variant, size, theme를 지원하는 페이지네이션 컴포넌트입니다.
 * 
 * @example
 * ```tsx
 * <Pagination 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      visiblePages = 5,
      showNavigation = true,
      showFirstLast = false,
      disabled = false,
      className = '',
      ...restProps
    },
    ref
  ) => {
    // 페이지 번호 배열 생성
    // 요구사항: 1,2,3,4,5 형태로 정확히 visiblePages 개수만큼만 표시
    const generatePageNumbers = () => {
      const pages: number[] = [];
      
      // 디버깅: 현재 상태 출력
      console.log('[Pagination Debug]', {
        currentPage,
        totalPages,
        visiblePages,
      });
      
      // 현재 페이지가 속한 그룹의 시작 페이지 계산
      // 예: visiblePages=5일 때, 1~5페이지는 1부터, 6~10페이지는 6부터
      const pageGroup = Math.ceil(currentPage / visiblePages);
      const startPage = (pageGroup - 1) * visiblePages + 1;
      const endPage = Math.min(startPage + visiblePages - 1, totalPages);
      
      console.log('[Pagination Debug] Calculated:', {
        pageGroup,
        startPage,
        endPage,
      });
      
      // 페이지 번호들 생성
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      console.log('[Pagination Debug] Generated pages:', pages);
      
      return pages;
    };

    const pageNumbers = generatePageNumbers();

    // 현재 페이지가 속한 그룹과 네비게이션 활성화 상태 계산
    const currentGroup = Math.ceil(currentPage / visiblePages);
    const totalGroups = Math.ceil(totalPages / visiblePages);
    const isFirstGroup = currentGroup === 1;
    const isLastGroup = currentGroup >= totalGroups;

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
      if (disabled || page < 1 || page > totalPages || page === currentPage) {
        return;
      }
      onPageChange?.(page);
    };

    // 이전 페이지 그룹으로 이동 (5개 단위)
    const handlePrevious = () => {
      if (isFirstGroup) return;
      
      // 이전 그룹의 마지막 페이지로 이동
      const prevGroupLastPage = (currentGroup - 1) * visiblePages;
      
      if (prevGroupLastPage >= 1) {
        handlePageChange(prevGroupLastPage);
        console.log('[Pagination] 이전 그룹으로 이동:', {
          currentPage,
          currentGroup,
          targetPage: prevGroupLastPage
        });
      }
    };

    // 다음 페이지 그룹으로 이동 (5개 단위)
    const handleNext = () => {
      if (isLastGroup) return;
      
      // 다음 그룹의 첫 페이지로 이동
      const nextGroupFirstPage = currentGroup * visiblePages + 1;
      
      if (nextGroupFirstPage <= totalPages) {
        handlePageChange(nextGroupFirstPage);
        console.log('[Pagination] 다음 그룹으로 이동:', {
          currentPage,
          currentGroup,
          targetPage: nextGroupFirstPage
        });
      }
    };

    // 첫 페이지로 이동
    const handleFirst = () => {
      handlePageChange(1);
    };

    // 마지막 페이지로 이동
    const handleLast = () => {
      handlePageChange(totalPages);
    };

    // CSS 클래스 조합
    const paginationClasses = [
      styles.pagination,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 페이지가 1개 이하면 렌더링하지 않음
    if (totalPages <= 1) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={paginationClasses}
        {...restProps}
      >
        {/* 첫 페이지 버튼 */}
        {showFirstLast && currentPage > 1 && (
          <button
            className={styles.navButton}
            onClick={handleFirst}
            disabled={disabled}
            aria-label="첫 페이지로 이동"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 18L3 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* 이전 페이지 그룹 버튼 (5개 단위) */}
        {showNavigation && (
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={disabled || isFirstGroup}
            aria-label="이전 페이지 그룹으로 이동"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* 페이지 번호들 */}
        <div className={styles.pageNumbers}>
          {pageNumbers.map((pageNum) => {
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                className={[
                  styles.pageButton,
                  isActive && styles.active,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handlePageChange(pageNum)}
                disabled={disabled}
                aria-label={`${pageNum}페이지로 이동`}
                aria-current={isActive ? 'page' : undefined}
                data-testid={`page-button-${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* 다음 페이지 그룹 버튼 (5개 단위) */}
        {showNavigation && (
          <button
            className={styles.navButton}
            onClick={handleNext}
            disabled={disabled || isLastGroup}
            aria-label="다음 페이지 그룹으로 이동"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* 마지막 페이지 버튼 */}
        {showFirstLast && currentPage < totalPages && (
          <button
            className={styles.navButton}
            onClick={handleLast}
            disabled={disabled}
            aria-label="마지막 페이지로 이동"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18L21 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
