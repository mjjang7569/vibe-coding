'use client';

import React from 'react';
import { DiariesDetail } from '../../../components/diaries-detail';
import { useDiaryBinding } from '../../../components/diaries-detail/hooks/index.binding.hook';
import { useRetrospectBinding } from '../../../components/diaries-detail/hooks/index.retrospect.binding.hook';

interface DiaryDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * 일기 상세 페이지
 * 
 * 로컬스토리지에서 일기 데이터를 읽어와 표시합니다.
 * useDiaryBinding hook을 사용하여 데이터를 바인딩합니다.
 * useRetrospectBinding hook을 사용하여 회고 데이터를 바인딩합니다.
 * 
 * @param params - 라우트 파라미터 (id: 일기 ID)
 */
const DiaryDetailPage: React.FC<DiaryDetailPageProps> = ({ params }) => {
  const { id } = params;
  const { diary, isLoading, formatDate } = useDiaryBinding(id);
  const { retrospectList } = useRetrospectBinding(id);

  const handleRetrospectInputChange = (value: string) => {
    // TODO: 실제 상태 관리 로직 구현 필요
    console.log('회고 입력값 변경:', value);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!diary) {
    return null;
  }

  return (
    <DiariesDetail
      title={diary.title}
      content={diary.content}
      emotion={diary.emotion}
      createdAt={formatDate(diary.createdAt)}
      retrospectInput=""
      onRetrospectInputChange={handleRetrospectInputChange}
      retrospectList={retrospectList}
    />
  );
};

export default DiaryDetailPage;
