/**
 * 페이지네이션 테스트용 일기 데이터 생성 스크립트
 * 
 * 브라우저 콘솔에서 실행하세요:
 * 
 * // 30개 생성 (3페이지)
 * generateDiaries(30)
 * 
 * // 100개 생성 (9페이지)
 * generateDiaries(100)
 */

function generateDiaries(count) {
  const emotions = ['Happy', 'Sad', 'Angry', 'Surprise', 'Etc'];
  const titles = [
    '행복했던 하루', '오늘의 일상', '기억하고 싶은 순간',
    '감사한 하루', '힘들었던 하루', '재미있었던 일'
  ];
  const contents = [
    '오늘은 정말 특별한 하루였다.',
    '평범한 하루였지만 의미있는 시간이었다.',
    '새로운 것을 배우고 성취감을 느꼈다.'
  ];
  
  const diaries = [];
  for (let i = 1; i <= count; i++) {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    
    // 최근 6개월 내 랜덤 날짜
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    const randomDate = new Date(
      sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
    );
    
    diaries.push({
      id: i,
      title: `${randomTitle} #${i}`,
      content: randomContent,
      emotion: randomEmotion,
      createdAt: randomDate.toISOString()
    });
  }
  
  // 날짜 순으로 정렬 (최신순)
  diaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // ID 재할당
  diaries.forEach((diary, index) => {
    diary.id = index + 1;
  });
  
  // 로컬스토리지에 저장
  localStorage.setItem('diaries', JSON.stringify(diaries));
  
  // 결과 출력
  console.log(`✅ ${count}개의 일기가 생성되었습니다!`);
  console.log(`📄 예상 페이지 수: ${Math.ceil(count / 12)}페이지 (12개씩)`);
  console.log(`🔄 페이지를 새로고침하세요.`);
  
  // 감정별 통계
  const stats = {};
  diaries.forEach(diary => {
    stats[diary.emotion] = (stats[diary.emotion] || 0) + 1;
  });
  console.log('📊 감정별 통계:', stats);
  
  return diaries;
}

// 자동 실행 예시 (원하는 개수로 변경)
console.log('=== 페이지네이션 테스트 데이터 생성 스크립트 ===');
console.log('사용법:');
console.log('  generateDiaries(30)  // 30개 생성 → 3페이지');
console.log('  generateDiaries(100) // 100개 생성 → 9페이지');
console.log('  generateDiaries(50)  // 50개 생성 → 5페이지');

