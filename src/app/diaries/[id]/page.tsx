'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiariesDetail } from '../../../components/diaries-detail';
import { EmotionType } from '../../../commons/constants/enum';
import { URL_PATHS } from '../../../commons/constants/url';

interface DiaryDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * 일기 데이터 타입
 */
interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 일기 상세 페이지
 * 
 * 로컬스토리지에서 일기 데이터를 읽어와 표시합니다.
 * 
 * @param params - 라우트 파라미터 (id: 일기 ID)
 */
const DiaryDetailPage: React.FC<DiaryDetailPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬스토리지에서 일기 데이터 읽기
    const loadDiary = () => {
      try {
        const data = localStorage.getItem('diaries');
        if (data) {
          const diaries: Diary[] = JSON.parse(data);
          const foundDiary = diaries.find((d) => d.id === Number(id));
          
          if (foundDiary) {
            setDiary(foundDiary);
          } else {
            // 일기를 찾지 못하면 목록 페이지로 이동
            router.push(URL_PATHS.DIARIES.LIST);
          }
        } else {
          // 데이터가 없으면 목록 페이지로 이동
          router.push(URL_PATHS.DIARIES.LIST);
        }
      } catch (error) {
        console.error('일기 데이터 로드 실패:', error);
        router.push(URL_PATHS.DIARIES.LIST);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiary();
  }, [id, router]);

  const handleRetrospectInputChange = (value: string) => {
    // TODO: 실제 상태 관리 로직 구현 필요
    console.log('회고 입력값 변경:', value);
  };

  // 포맷팅된 날짜 생성
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}. ${month}. ${day}`;
    } catch {
      return dateString;
    }
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
      retrospectList={[]}
    />
  );
};

export default DiaryDetailPage;
