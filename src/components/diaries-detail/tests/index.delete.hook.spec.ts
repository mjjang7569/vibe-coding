/**
 * 일기 삭제 기능 통합 테스트
 * 
 * TDD 기반으로 일기 삭제 기능을 테스트합니다.
 * - 실제 로컬스토리지 데이터 사용 (Mock 데이터 사용 안 함)
 * - data-testid 기반 식별
 * - timeout 500ms 이하 설정
 * 
 * 테스트 시나리오:
 * 1. 삭제 버튼 클릭 시 삭제 모달 표시
 * 2. 취소 버튼 클릭 시 모달 닫기
 * 3. 삭제 버튼 클릭 시 일기 삭제 및 /diaries로 리다이렉트
 * 4. 삭제된 일기가 목록에서 제거됨 확인
 */

import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('DiariesDetail - 일기 삭제 기능', () => {
  // 테스트 데이터 준비
  const testDiary = {
    id: 999,
    title: '삭제 테스트 일기',
    content: '이 일기는 삭제 테스트를 위한 일기입니다.',
    emotion: EmotionType.Happy,
    createdAt: new Date().toISOString()
  };

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 일기 추가
    await page.goto('/');
    
    await page.evaluate((diary) => {
      const existingDiaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      const updatedDiaries = [...existingDiaries, diary];
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
    }, testDiary);
  });

  test('삭제 버튼 클릭 시 삭제 모달이 표시되어야 함', async ({ page }) => {
    // Given: 일기 상세 페이지에 접속
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });

    // When: 삭제 버튼 클릭
    const deleteButton = page.locator('button', { hasText: '삭제' });
    await deleteButton.click();

    // Then: 삭제 모달이 표시되어야 함
    const modal = page.locator('[data-testid="delete-modal"]');
    await expect(modal).toBeVisible();

    // 모달 내용 확인
    await expect(page.locator('[data-testid="delete-modal-title"]')).toHaveText('일기 삭제');
    await expect(page.locator('[data-testid="delete-modal-description"]')).toHaveText('일기를 삭제 하시겠어요?');
  });

  test('삭제 모달에서 취소 버튼 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // Given: 일기 상세 페이지에서 삭제 모달이 열린 상태
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    const deleteButton = page.locator('button', { hasText: '삭제' });
    await deleteButton.click();
    
    const modal = page.locator('[data-testid="delete-modal"]');
    await expect(modal).toBeVisible();

    // When: 취소 버튼 클릭
    const cancelButton = page.locator('[data-testid="delete-modal-cancel"]');
    await cancelButton.click();

    // Then: 모달이 닫혀야 함
    await expect(modal).not.toBeVisible();
  });

  test('삭제 모달에서 삭제 버튼 클릭 시 일기가 삭제되고 목록 페이지로 이동해야 함', async ({ page }) => {
    // Given: 일기 상세 페이지에서 삭제 모달이 열린 상태
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    const deleteButton = page.locator('button', { hasText: '삭제' });
    await deleteButton.click();
    
    const modal = page.locator('[data-testid="delete-modal"]');
    await expect(modal).toBeVisible();

    // When: 삭제 버튼 클릭
    const confirmDeleteButton = page.locator('[data-testid="delete-modal-confirm"]');
    await confirmDeleteButton.click();

    // Then: /diaries 페이지로 리다이렉트되어야 함
    await page.waitForURL('**/diaries', { timeout: 500 });
    expect(page.url()).toContain('/diaries');

    // 로컬스토리지에서 해당 일기가 삭제되었는지 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });

    const deletedDiary = diaries.find((d: { id: number }) => d.id === testDiary.id);
    expect(deletedDiary).toBeUndefined();
  });

  test('삭제된 일기는 목록에서도 표시되지 않아야 함', async ({ page }) => {
    // Given: 일기 상세 페이지에서 일기 삭제
    await page.goto(`/diaries/${testDiary.id}`);
    await page.waitForSelector('[data-testid="diaries-detail-container"]', { timeout: 500 });
    
    const deleteButton = page.locator('button', { hasText: '삭제' });
    await deleteButton.click();
    
    const confirmDeleteButton = page.locator('[data-testid="delete-modal-confirm"]');
    await confirmDeleteButton.click();

    // When: /diaries 페이지로 이동 완료
    await page.waitForURL('**/diaries', { timeout: 500 });

    // Then: 삭제된 일기가 목록에 표시되지 않아야 함
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const diaryCount = await diaryCards.count();

    for (let i = 0; i < diaryCount; i++) {
      const card = diaryCards.nth(i);
      const cardId = await card.getAttribute('data-testid');
      expect(cardId).not.toBe(`diary-card-${testDiary.id}`);
    }
  });
});

