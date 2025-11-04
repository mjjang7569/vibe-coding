/**
 * 일기 수정 기능 통합 테스트
 * 
 * TDD 기반으로 일기 수정 기능을 테스트합니다.
 * - 실제 로컬스토리지 데이터 사용 (Mock 데이터 사용 안 함)
 * - data-testid 기반 식별
 * - timeout 미설정 (기본값 사용)
 * 
 * 테스트 시나리오:
 * 1. 일기 상세 페이지 접속
 * 2. 수정 버튼 클릭하여 수정 모드 진입
 * 3. 수정 모드에서 회고 입력창이 비활성화되었는지 확인
 * 4. emotion, title, content 수정
 * 5. 수정하기 버튼 클릭
 * 6. 수정 완료 후 상세보기 모드로 돌아가는지 확인
 * 7. 수정된 내용이 로컬스토리지에 저장되었는지 확인
 */

import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('일기 수정 기능', () => {
  const testDiary = {
    id: 1,
    title: '테스트 일기 제목',
    content: '테스트 일기 내용입니다.',
    emotion: EmotionType.Happy,
    createdAt: '2024. 07. 12'
  };

  const updatedDiary = {
    emotion: EmotionType.Sad,
    title: '수정된 일기 제목',
    content: '수정된 일기 내용입니다.'
  };

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/');
    await page.evaluate((diary) => {
      localStorage.setItem('diaries', JSON.stringify([diary]));
    }, testDiary);
  });

  test('일기 수정 성공 시나리오', async ({ page }) => {
    // 1. 일기 상세 페이지 접속
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 초기 상태 확인: 수정 전 화면
    await expect(page.locator('h1').first()).toContainText(testDiary.title);
    
    // 2. 수정 버튼 클릭
    const editButton = page.locator('button', { hasText: '수정' });
    await editButton.click();

    // 3. 수정 모드로 변경되었는지 확인
    // - 감정 선택 라디오 버튼이 보이는지 확인
    await page.waitForSelector('[data-testid="emotion-radio-group"]');
    
    // - 제목 입력 필드가 보이는지 확인
    const titleInput = page.locator('[data-testid="edit-title-input"]');
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveValue(testDiary.title);
    
    // - 내용 입력 필드가 보이는지 확인
    const contentInput = page.locator('[data-testid="edit-content-input"]');
    await expect(contentInput).toBeVisible();
    await expect(contentInput).toHaveValue(testDiary.content);
    
    // - 수정하기/취소 버튼이 보이는지 확인
    await expect(page.locator('button', { hasText: '수정하기' })).toBeVisible();
    await expect(page.locator('button', { hasText: '취소' })).toBeVisible();

    // 4. 수정 모드에서 회고 입력창 비활성화 확인
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    await expect(retrospectInput).toBeDisabled();
    await expect(retrospectInput).toHaveAttribute('placeholder', '수정중일땐 회고를 작성할 수 없어요.');
    
    // 회고 입력 버튼도 비활성화 확인
    const retrospectSubmitButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(retrospectSubmitButton).toBeDisabled();

    // 5. emotion, title, content 수정
    // 감정 변경 (행복해요 -> 슬퍼요)
    const sadRadio = page.locator(`[data-testid="emotion-radio-${EmotionType.Sad}"]`);
    await sadRadio.click();
    
    // 제목 변경
    await titleInput.fill(updatedDiary.title);
    
    // 내용 변경
    await contentInput.fill(updatedDiary.content);

    // 6. 수정하기 버튼 클릭
    const submitButton = page.locator('button', { hasText: '수정하기' });
    await submitButton.click();

    // 7. 수정 완료 후 상세보기 모드로 돌아가는지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    
    // - 감정 선택 라디오 버튼이 사라졌는지 확인
    await expect(page.locator('[data-testid="emotion-radio-group"]')).not.toBeVisible();
    
    // - 수정된 제목이 표시되는지 확인
    await expect(page.locator('h1').first()).toContainText(updatedDiary.title);
    
    // - 수정된 내용이 표시되는지 확인
    const contentArea = page.locator('.contentText').first();
    await expect(contentArea).toContainText(updatedDiary.content);
    
    // - 수정된 감정이 표시되는지 확인
    const emotionText = page.locator('.emotionText').first();
    await expect(emotionText).toContainText('슬퍼요');

    // 8. 회고 입력창이 다시 활성화되었는지 확인
    await expect(retrospectInput).not.toBeDisabled();
    await expect(retrospectInput).toHaveAttribute('placeholder', '회고를 남겨보세요.');

    // 9. 로컬스토리지에 수정된 내용이 저장되었는지 확인
    const savedDiaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : [];
    });

    expect(savedDiaries).toHaveLength(1);
    expect(savedDiaries[0].title).toBe(updatedDiary.title);
    expect(savedDiaries[0].content).toBe(updatedDiary.content);
    expect(savedDiaries[0].emotion).toBe(updatedDiary.emotion);
    expect(savedDiaries[0].id).toBe(testDiary.id);
    expect(savedDiaries[0].createdAt).toBe(testDiary.createdAt);
  });

  test('취소 버튼 클릭 시 수정 모드 종료', async ({ page }) => {
    // 1. 일기 상세 페이지 접속
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 2. 수정 버튼 클릭
    const editButton = page.locator('button', { hasText: '수정' });
    await editButton.click();

    // 3. 수정 모드로 변경되었는지 확인
    await page.waitForSelector('[data-testid="emotion-radio-group"]');

    // 4. 일부 필드 수정
    const titleInput = page.locator('[data-testid="edit-title-input"]');
    await titleInput.fill('임시 수정 제목');

    // 5. 취소 버튼 클릭
    const cancelButton = page.locator('button', { hasText: '취소' });
    await cancelButton.click();

    // 6. 상세보기 모드로 돌아갔는지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
    await expect(page.locator('[data-testid="emotion-radio-group"]')).not.toBeVisible();

    // 7. 원래 내용이 그대로 유지되는지 확인
    await expect(page.locator('h1').first()).toContainText(testDiary.title);

    // 8. 로컬스토리지에 변경사항이 저장되지 않았는지 확인
    const savedDiaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : [];
    });

    expect(savedDiaries[0].title).toBe(testDiary.title);
  });

  test('수정 모드에서 필수 필드 유효성 검사', async ({ page }) => {
    // 1. 일기 상세 페이지 접속
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 2. 수정 버튼 클릭
    const editButton = page.locator('button', { hasText: '수정' });
    await editButton.click();
    await page.waitForSelector('[data-testid="emotion-radio-group"]');

    // 3. 제목을 빈 값으로 변경
    const titleInput = page.locator('[data-testid="edit-title-input"]');
    await titleInput.fill('');

    // 4. 수정하기 버튼이 비활성화되었는지 확인
    const submitButton = page.locator('button', { hasText: '수정하기' });
    await expect(submitButton).toBeDisabled();

    // 5. 제목을 다시 입력
    await titleInput.fill('새로운 제목');

    // 6. 내용을 빈 값으로 변경
    const contentInput = page.locator('[data-testid="edit-content-input"]');
    await contentInput.fill('');

    // 7. 수정하기 버튼이 비활성화되었는지 확인
    await expect(submitButton).toBeDisabled();

    // 8. 내용을 다시 입력
    await contentInput.fill('새로운 내용');

    // 9. 수정하기 버튼이 활성화되었는지 확인
    await expect(submitButton).not.toBeDisabled();
  });
});

