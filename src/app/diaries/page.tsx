'use client';

import React, { useState } from 'react';
import { Diaries } from '@/components/diaries';

/**
 * Diaries Page Component
 * 
 * 일기 목록을 보여주는 페이지입니다.
 */
export default function DiariesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10);

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    // 검색 로직 구현
  };

  const handleSelectChange = (value: string) => {
    console.log('Select changed:', value);
    // 셀렉트 변경 로직 구현
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed:', page);
    setCurrentPage(page);
    // 페이지 변경 로직 구현
  };

  return (
    <Diaries
      currentPage={currentPage}
      totalPages={totalPages}
      onSearch={handleSearch}
      onSelectChange={handleSelectChange}
      onPageChange={handlePageChange}
    />
  );
}
