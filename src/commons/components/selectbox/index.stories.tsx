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
        component: '다양한 variant, size, theme를 지원하는 셀렉트박스 컴포넌트입니다. 옵션 선택, 키보드 네비게이션, 접근성을 지원합니다.',
      },
    },
  },
  argTypes: {
    options: {
      control: false,
      description: '선택 옵션 배열',
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
    options: basicOptions,
    placeholder: '다크 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
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
        story: '모든 variant 타입을 확인할 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Selectbox
        options={basicOptions}
        placeholder="작은 크기"
        variant="primary"
        size="small"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="중간 크기"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Selectbox
        options={basicOptions}
        placeholder="큰 크기"
        variant="primary"
        size="large"
        theme="light"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 size 옵션을 확인할 수 있습니다.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
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
        story: '모든 상태를 확인할 수 있습니다.',
      },
    },
  },
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>Light Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
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
      <div style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#ccc' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
          <Selectbox
            options={basicOptions}
            placeholder="Primary (Dark)"
            variant="primary"
            size="medium"
            theme="dark"
          />
          <Selectbox
            options={basicOptions}
            placeholder="Secondary (Dark)"
            variant="secondary"
            size="medium"
            theme="dark"
          />
          <Selectbox
            options={basicOptions}
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
        story: 'Light와 Dark 테마에서의 모든 variant를 확인할 수 있습니다.',
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
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          접근성 예제: 키보드로 Tab을 사용하여 포커스를 이동하고, Enter나 Space로 옵션을 열을 수 있습니다.
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
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션과 접근성 기능을 테스트할 수 있는 예제입니다.',
      },
    },
  },
};
