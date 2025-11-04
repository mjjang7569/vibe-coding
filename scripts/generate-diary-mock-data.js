/**
 * 일기 Mock 데이터 생성 스크립트
 * 
 * 이 스크립트는 브라우저 콘솔에서 실행할 수 있습니다.
 * 120개의 일기 mock 데이터를 생성하고 로컬 스토리지에 저장합니다.
 * 
 * 사용법:
 * 1. 브라우저의 개발자 도구를 엽니다 (F12 또는 Cmd+Option+I)
 * 2. Console 탭으로 이동합니다
 * 3. 아래 코드를 전체 복사하여 붙여넣고 Enter를 누릅니다
 */

(function() {
  const EmotionTypes = ['Happy', 'Sad', 'Angry', 'Surprise', 'Etc'];
  
  // 일기 제목 템플릿
  const titleTemplates = [
    '행복했던 하루',
    '오늘의 일상',
    '기억하고 싶은 순간',
    '감사한 하루',
    '힘들었던 하루',
    '재미있었던 일',
    '특별한 경험',
    '평범한 일상',
    '소중한 추억',
    '즐거웠던 순간',
    '새로운 시작',
    '따뜻한 하루',
    '뜻깊은 하루',
    '편안한 휴식',
    '바쁜 하루',
    '여유로운 하루',
    '의미있는 만남',
    '달콤한 시간',
    '잊지 못할 순간',
    '마음 따뜻한 하루',
  ];
  
  // 일기 내용 템플릿
  const contentTemplates = [
    '오늘은 정말 특별한 하루였다. 아침부터 기분이 좋아서 하루 종일 활기차게 보냈다. 친구들과 만나서 즐거운 시간을 보냈고, 맛있는 음식도 먹었다. 이런 날이 더 많았으면 좋겠다.',
    '평범한 하루였지만 나름대로 의미있는 시간이었다. 새로운 것을 배우고, 작은 성취감을 느꼈다. 때로는 이런 평온한 일상이 가장 소중하다는 것을 깨닫는다.',
    '오늘은 조금 힘든 하루였다. 여러 일들이 뜻대로 풀리지 않아서 스트레스를 받았다. 하지만 이것도 지나갈 것이라 믿고 긍정적으로 생각하려고 노력했다.',
    '예상치 못한 일이 일어났다. 처음에는 당황스러웠지만, 결국 좋은 경험이 되었다. 인생은 항상 놀라움으로 가득하다.',
    '오늘은 가족들과 함께 시간을 보냈다. 오랜만에 다같이 모여 이야기를 나누고 웃으며 즐거운 시간을 가졌다. 가족의 소중함을 다시 한번 느꼈다.',
    '일에 집중한 하루였다. 많은 일을 처리하느라 바빴지만, 그만큼 보람도 느꼈다. 피곤하지만 뿌듯한 마음으로 하루를 마무리한다.',
    '친구와 오랜만에 만나서 수다를 떨었다. 학창시절 이야기부터 요즘 근황까지 이야기꽃을 피웠다. 좋은 친구가 있다는 것이 감사하다.',
    '새로운 도전을 시작했다. 조금 두렵기도 하지만 설레기도 한다. 앞으로 어떻게 될지 기대된다.',
    '조용한 하루를 보냈다. 집에서 책을 읽고 음악을 들으며 나만의 시간을 가졌다. 이런 여유로운 시간도 필요하다.',
    '운동을 하고 건강한 음식을 먹으며 몸을 돌보는 하루였다. 건강의 소중함을 느끼며, 앞으로도 꾸준히 관리해야겠다고 다짐했다.',
  ];
  
  // 랜덤 날짜 생성 (최근 6개월)
  function getRandomDate() {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    
    const randomTime = sixMonthsAgo.getTime() + 
      Math.random() * (now.getTime() - sixMonthsAgo.getTime());
    
    return new Date(randomTime).toISOString();
  }
  
  // 랜덤 배열 요소 선택
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // Mock 데이터 생성
  function generateMockDiaries(count = 120) {
    const diaries = [];
    
    for (let i = 1; i <= count; i++) {
      const emotion = getRandomElement(EmotionTypes);
      const baseTitle = getRandomElement(titleTemplates);
      const title = `${baseTitle} #${i}`;
      const content = getRandomElement(contentTemplates);
      const createdAt = getRandomDate();
      
      diaries.push({
        id: i,
        title: title,
        content: content,
        emotion: emotion,
        createdAt: createdAt
      });
    }
    
    // 날짜순으로 정렬 (최신순)
    diaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // ID 재할당 (정렬 후)
    diaries.forEach((diary, index) => {
      diary.id = index + 1;
    });
    
    return diaries;
  }
  
  // 로컬 스토리지에 저장
  function saveMockData(count = 120) {
    try {
      const mockDiaries = generateMockDiaries(count);
      localStorage.setItem('diaries', JSON.stringify(mockDiaries));
      
      console.log(`✅ ${count}개의 일기 mock 데이터가 생성되어 로컬 스토리지에 저장되었습니다!`);
      console.log('📊 데이터 통계:');
      
      // 감정별 통계
      const emotionStats = {};
      mockDiaries.forEach(diary => {
        emotionStats[diary.emotion] = (emotionStats[diary.emotion] || 0) + 1;
      });
      
      console.table(emotionStats);
      console.log('🔍 저장된 데이터 미리보기 (처음 5개):');
      console.table(mockDiaries.slice(0, 5));
      
      return mockDiaries;
    } catch (error) {
      console.error('❌ 데이터 저장 중 오류 발생:', error);
      return null;
    }
  }
  
  // 데이터 확인
  function checkStoredData() {
    try {
      const stored = localStorage.getItem('diaries');
      if (stored) {
        const diaries = JSON.parse(stored);
        console.log(`📦 현재 로컬 스토리지에 ${diaries.length}개의 일기가 저장되어 있습니다.`);
        console.log('🔍 저장된 데이터 미리보기 (처음 3개):');
        console.table(diaries.slice(0, 3));
        return diaries;
      } else {
        console.log('📦 로컬 스토리지에 저장된 일기가 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('❌ 데이터 확인 중 오류 발생:', error);
      return null;
    }
  }
  
  // 데이터 삭제
  function clearMockData() {
    try {
      localStorage.removeItem('diaries');
      console.log('🗑️ 로컬 스토리지의 일기 데이터가 삭제되었습니다.');
    } catch (error) {
      console.error('❌ 데이터 삭제 중 오류 발생:', error);
    }
  }
  
  // 전역 객체에 함수들을 노출
  window.DiaryMockData = {
    generate: saveMockData,
    check: checkStoredData,
    clear: clearMockData,
    generateOnly: generateMockDiaries
  };
  
  console.log('🎉 일기 Mock 데이터 스크립트가 로드되었습니다!');
  console.log('📝 사용 가능한 명령어:');
  console.log('  • DiaryMockData.generate(120) - 120개의 mock 데이터 생성 및 저장');
  console.log('  • DiaryMockData.check() - 현재 저장된 데이터 확인');
  console.log('  • DiaryMockData.clear() - 저장된 데이터 삭제');
  console.log('  • DiaryMockData.generateOnly(120) - 데이터 생성만 (저장 X)');
  console.log('');
  console.log('💡 팁: 자동으로 120개의 데이터를 생성하려면 아래 명령어를 실행하세요:');
  console.log('  DiaryMockData.generate(120)');
  
})();

