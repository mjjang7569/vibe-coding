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
  const [totalPages, setTotalPages] = useState(10);
  const [selectValue, setSelectValue] = useState('');

  const selectOptions = [
    { value: 'all', label: '전체' },
    { value: 'daily', label: '일상' },
    { value: 'travel', label: '여행' },
    { value: 'food', label: '맛집' },
  ];

  const handleSearch = (value: string) => {
    console.log('Search:', value);
    // 검색 로직 구현
  };

  const handleSelectChange = (value: string) => {
    console.log('Select changed:', value);
    setSelectValue(value);
    // 셀렉트 변경 로직 구현
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed:', page);
    setCurrentPage(page);
    // 페이지 변경 로직 구현
  };

  const handleWriteDiary = () => {
    console.log('Write diary clicked');
    // 일기쓰기 페이지로 이동하는 로직 구현
  };

  return (
    <Diaries
      currentPage={currentPage}
      totalPages={totalPages}
      onSearch={handleSearch}
      onSelectChange={handleSelectChange}
      onPageChange={handlePageChange}
      onWriteDiary={handleWriteDiary}
      selectOptions={selectOptions}
      selectValue={selectValue}
    />
  );
}
