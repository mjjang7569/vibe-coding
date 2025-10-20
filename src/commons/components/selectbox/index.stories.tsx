import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Selectbox, SelectOption } from './index';

const meta: Meta<typeof Selectbox> = {
  title: 'Commons/Components/Selectbox',
  component: Selectbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '완전한 키보드 네비게이션과 접근성을 지원하는 고성능 셀렉트박스 컴포넌트입니다. React.useCallback과 useMemo를 통한 성능 최적화, data-testid 지원으로 테스트 친화적이고, 모바일 터치 최적화가 적용되었습니다. 12px border-radius와 부드러운 애니메이션, 개선된 ARIA 속성으로 접근성을 대폭 향상시켰습니다.',
      },
    },
  },
  argTypes: {
    options: {
      control: false,
      description: '선택 옵션 배열',
      table: {
        type: { summary: 'SelectOption[]' },
        category: 'Data',
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
    },
    defaultValue: {
      control: 'text',
      description: '기본값',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '셀렉트박스 테마',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    'data-testid': {
      control: 'text',
      description: '테스트용 data-testid 속성',
      table: {
        category: 'Testing',
      },
    },
    onChange: { action: 'changed' },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션들
const basicOptions: SelectOption[] = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

const manyOptions: SelectOption[] = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
  { value: 'strawberry', label: '딸기' },
  { value: 'watermelon', label: '수박' },
  { value: 'mango', label: '망고' },
  { value: 'pineapple', label: '파인애플' },
  { value: 'kiwi', label: '키위' },
  { value: 'peach', label: '복숭아' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'option1', label: '활성 옵션 1' },
  { value: 'option2', label: '활성 옵션 2' },
  { value: 'option3', label: '비활성 옵션', disabled: true },
  { value: 'option4', label: '비활성 옵션 2', disabled: true },
  { value: 'option5', label: '활성 옵션 3' },
];

// 피그마에서 확인한 감정 옵션들
const emotionOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'happy', label: '행복해요' },
  { value: 'sad', label: '슬퍼요' },
  { value: 'surprised', label: '놀랐어요' },
  { value: 'angry', label: '화나요' },
  { value: 'etc', label: '기타' },
];

// 기본 셀렉트박스
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '선택해주세요',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Primary 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Secondary: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Secondary 셀렉트박스',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Tertiary 셀렉트박스',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    options: basicOptions,
    placeholder: '작은 셀렉트박스',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    options: basicOptions,
    placeholder: '중간 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    options: basicOptions,
    placeholder: '큰 셀렉트박스',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    options: basicOptions,
    placeholder: '라이트 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    options: emotionOptions,
    placeholder: '전체',
    defaultValue: 'all',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '피그마 디자인에 맞춰 구현된 다크모드 셀렉트박스입니다. 감정 필터 옵션을 표시합니다.',
      },
    },
  },
};

// States (상태) 스토리들
export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'option2',
    placeholder: '기본값이 있는 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const WithManyOptions: Story = {
  args: {
    options: manyOptions,
    placeholder: '많은 옵션이 있는 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: '비활성 옵션이 있는 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: '비활성화된 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

export const SelectedState: Story = {
  args: {
    options: basicOptions,
    value: 'option2',
    placeholder: '선택된 상태의 셀렉트박스',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <Selectbox
        options={basicOptions}
        placeholder="Primary 스타일"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="Secondary 스타일"
        variant="secondary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="Tertiary 스타일"
        variant="tertiary"
        size="medium"
        theme="light"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '개선된 스타일로 모든 variant 타입을 확인할 수 있습니다. 12px border-radius와 부드러운 애니메이션이 적용되었습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <Selectbox
        options={basicOptions}
        placeholder="작은 크기 (36px)"
        variant="primary"
        size="small"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="중간 크기 (52px)"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="큰 크기 (60px)"
        variant="primary"
        size="large"
        theme="light"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '개선된 크기별 스타일을 확인할 수 있습니다. Small(36px), Medium(52px), Large(60px) 높이가 적용되었습니다.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <Selectbox
        options={basicOptions}
        placeholder="정상 상태"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={optionsWithDisabled}
        placeholder="비활성 옵션 포함"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        value="option2"
        placeholder="선택된 상태"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="비활성화된 상태"
        variant="primary"
        size="medium"
        theme="light"
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '성능 최적화와 접근성 개선이 적용된 상태별 스타일을 확인할 수 있습니다. React.useCallback과 useMemo를 통한 최적화, ARIA 속성 강화가 적용되었습니다.',
      },
    },
  },
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Light Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
          <Selectbox
            options={basicOptions}
            placeholder="Primary (Light)"
            variant="primary"
            size="medium"
            theme="light"
          />
          <Selectbox
            options={basicOptions}
            placeholder="Secondary (Light)"
            variant="secondary"
            size="medium"
            theme="light"
          />
          <Selectbox
            options={basicOptions}
            placeholder="Tertiary (Light)"
            variant="tertiary"
            size="medium"
            theme="light"
          />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#0a0a0a', borderRadius: '12px', border: '1px solid #374151' }}>
        <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600', color: '#f9fafb' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
          <Selectbox
            options={emotionOptions}
            placeholder="전체"
            defaultValue="all"
            variant="primary"
            size="medium"
            theme="dark"
          />
          <Selectbox
            options={emotionOptions}
            placeholder="Secondary (Dark)"
            variant="secondary"
            size="medium"
            theme="dark"
          />
          <Selectbox
            options={emotionOptions}
            placeholder="Tertiary (Dark)"
            variant="tertiary"
            size="medium"
            theme="dark"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '개선된 스타일로 Light와 Dark 테마에서의 모든 variant를 확인할 수 있습니다. 12px border-radius와 개선된 그림자 효과가 적용되었습니다.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: function InteractiveExampleRender() {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    const handleChange = (value: string) => {
      setSelectedValue(value);
      console.log('Selected:', value);
    };

    return (
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          선택된 값: {selectedValue || '없음'}
        </div>
        <Selectbox
          options={manyOptions}
          value={selectedValue}
          placeholder="과일을 선택하세요"
          variant="primary"
          size="medium"
          theme="light"
          onChange={handleChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '상호작용이 가능한 예제입니다. 선택된 값을 확인할 수 있습니다.',
      },
    },
  },
};

interface FormData {
  country: string;
  city: string;
  language: string;
}

export const FormExample: Story = {
  render: function FormExampleRender() {
    const [formData, setFormData] = React.useState<FormData>({
      country: '',
      city: '',
      language: '',
    });

    const countryOptions: SelectOption[] = [
      { value: 'korea', label: '대한민국' },
      { value: 'usa', label: '미국' },
      { value: 'japan', label: '일본' },
      { value: 'china', label: '중국' },
    ];

    const cityOptions: SelectOption[] = [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'incheon', label: '인천' },
      { value: 'daegu', label: '대구' },
    ];

    const languageOptions: SelectOption[] = [
      { value: 'ko', label: '한국어' },
      { value: 'en', label: 'English' },
      { value: 'ja', label: '日本語' },
      { value: 'zh', label: '中文' },
    ];

    return (
      <div style={{ width: '400px', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>정보 입력</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              국가
            </label>
            <Selectbox
              options={countryOptions}
              value={formData.country}
              placeholder="국가를 선택하세요"
              variant="primary"
              size="medium"
              theme="light"
              onChange={(value: string) => setFormData((prev: FormData) => ({ ...prev, country: value }))}
              data-testid="form-country-select"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              도시
            </label>
            <Selectbox
              options={cityOptions}
              value={formData.city}
              placeholder="도시를 선택하세요"
              variant="primary"
              size="medium"
              theme="light"
              onChange={(value: string) => setFormData((prev: FormData) => ({ ...prev, city: value }))}
              data-testid="form-city-select"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              언어
            </label>
            <Selectbox
              options={languageOptions}
              value={formData.language}
              placeholder="언어를 선택하세요"
              variant="primary"
              size="medium"
              theme="light"
              onChange={(value: string) => setFormData((prev: FormData) => ({ ...prev, language: value }))}
              data-testid="form-language-select"
            />
          </div>

          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>입력된 값:</div>
            <pre style={{ fontSize: '12px', color: '#333' }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 사용하는 예제입니다. 여러 셀렉트박스의 상태 관리를 확인할 수 있습니다.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: function AccessibilityExampleRender() {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    const handleOpen = () => {
      console.log('드롭다운이 열렸습니다');
    };

    const handleClose = () => {
      console.log('드롭다운이 닫혔습니다');
    };

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>키보드 네비게이션</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
            <li><strong>Tab:</strong> 컴포넌트로 포커스 이동</li>
            <li><strong>Enter/Space/ArrowDown:</strong> 드롭다운 열기</li>
            <li><strong>ArrowUp/Down:</strong> 옵션 간 이동</li>
            <li><strong>Home/End:</strong> 첫/마지막 옵션으로 이동</li>
            <li><strong>Escape:</strong> 드롭다운 닫기</li>
          </ul>
        </div>
        <Selectbox
          options={basicOptions}
          value={selectedValue}
          placeholder="키보드로 조작해보세요"
          variant="primary"
          size="medium"
          theme="light"
          onChange={setSelectedValue}
          onOpen={handleOpen}
          onClose={handleClose}
          data-testid="accessibility-selectbox"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '완전한 키보드 네비게이션과 ARIA 속성으로 접근성이 향상된 예제입니다. 스크린 리더와 키보드 사용자를 위해 최적화되었습니다.',
      },
    },
  },
};

export const FigmaDesignExample: Story = {
  render: function FigmaDesignExampleRender() {
    const [selectedEmotion, setSelectedEmotion] = React.useState<string>('all');

    return (
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* 라이트 테마 */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
          <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#333' }}>Light Theme</div>
          <Selectbox
            options={emotionOptions}
            value={selectedEmotion}
            placeholder="전체"
            variant="primary"
            size="medium"
            theme="light"
            onChange={setSelectedEmotion}
          />
        </div>

        {/* 다크 테마 */}
        <div style={{ padding: '24px', backgroundColor: '#1c1c1c', borderRadius: '12px', border: '1px solid #5f5f5f' }}>
          <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>Dark Theme</div>
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#c7c7c7' }}>
            피그마 색상: 선택된 옵션 #ffffff, 일반 옵션 #c7c7c7
          </div>
          <Selectbox
            options={emotionOptions}
            value={selectedEmotion}
            placeholder="전체"
            variant="primary"
            size="medium"
            theme="dark"
            onChange={setSelectedEmotion}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '개선된 스타일이 적용된 피그마 디자인 예제입니다. 12px border-radius, 부드러운 애니메이션, 개선된 스크롤바가 적용되었습니다.',
      },
    },
  },
};

// 새로운 스토리: 최신 개선사항 강조
export const LatestImprovements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '450px' }}>
      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#374151' }}>
          최신 개선사항
        </h3>
        
        {/* 성능 최적화 */}
        <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#0369a1' }}>⚡ 성능 최적화</h4>
          <ul style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li><strong>React.useCallback:</strong> 함수 메모이제이션으로 리렌더링 최소화</li>
            <li><strong>React.useMemo:</strong> 선택된 옵션 계산 최적화</li>
            <li><strong>의존성 배열 최적화:</strong> 불필요한 effect 실행 방지</li>
          </ul>
        </div>

        {/* 테스트 지원 */}
        <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#166534' }}>🧪 테스트 지원</h4>
          <ul style={{ fontSize: '14px', color: '#166534', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li><strong>data-testid:</strong> 컨테이너, 셀렉트박스, 드롭다운, 옵션별 전용 ID</li>
            <li><strong>접근성 테스트:</strong> ARIA 속성으로 테스트 자동화 지원</li>
          </ul>
        </div>

        {/* 모바일 최적화 */}
        <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#fff7ed', borderRadius: '12px', border: '1px solid #fed7aa' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#c2410c' }}>📱 모바일 최적화</h4>
          <ul style={{ fontSize: '14px', color: '#c2410c', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li><strong>터치 최적화:</strong> touch-action, webkit-tap-highlight-color</li>
            <li><strong>반응형 크기:</strong> 모바일에서 더 적절한 크기 조정</li>
          </ul>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Selectbox
          options={manyOptions}
          placeholder="성능 최적화된 스크롤바 확인"
          variant="primary"
          size="medium"
          theme="light"
          data-testid="performance-example"
        />
        <Selectbox
          options={basicOptions}
          placeholder="모바일 터치 최적화 확인"
          variant="primary"
          size="large"
          theme="light"
          data-testid="mobile-optimized"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '최신 성능 최적화, 테스트 지원, 모바일 최적화가 적용된 개선사항을 확인할 수 있는 예제입니다.',
      },
    },
  },
};
