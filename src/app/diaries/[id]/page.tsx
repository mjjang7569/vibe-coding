'use client';

import React from 'react';
import { DiariesDetail } from '../../../components/diaries-detail';

interface DiaryDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * 일기 상세 페이지
 * 
 * @param params - 라우트 파라미터 (id: 일기 ID)
 */
const DiaryDetailPage: React.FC<DiaryDetailPageProps> = ({ params }) => {
  const { id } = params;

  // TODO: 실제 데이터 fetching 로직 구현 필요
  const mockDiaryData = {
    title: `일기 제목 - ${id}`,
    content: `이것은 ${id}번 일기의 내용입니다.\n여러 줄의 내용을 작성할 수 있으며,\nwireframe 구조에 따라 1168 * 169px 영역에 표시됩니다.`,
    retrospectInput: '',
    retrospectList: [
      '오늘 하루 중 가장 기억에 남는 일은...',
      '내일은 더 나은 하루가 되길 바란다.',
    ],
  };

  const handleRetrospectInputChange = (value: string) => {
    // TODO: 실제 상태 관리 로직 구현 필요
    console.log('회고 입력값 변경:', value);
  };

  return (
    <DiariesDetail
      title={mockDiaryData.title}
      content={mockDiaryData.content}
      retrospectInput={mockDiaryData.retrospectInput}
      onRetrospectInputChange={handleRetrospectInputChange}
      retrospectList={mockDiaryData.retrospectList}
    />
  );
};

export default DiaryDetailPage;
