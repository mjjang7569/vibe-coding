import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '피그마 디자인 시스템에 기반한 입력 컴포넌트입니다. 일반적인 input 스타일(border-radius: 8px)로 Searchbar와 구분되는 디자인이며, 라이트/다크 모드와 다양한 variant, size를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 컴포넌트 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력 컴포넌트 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '입력 컴포넌트 테마',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘',
    },
    value: {
      control: 'text',
      description: '입력값',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 입력 컴포넌트 (피그마 디자인 반영)
export const Default: Story = {
  args: {
    label: '기본 입력',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    readOnly: false,
    error: false,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    label: 'Primary 입력',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마 디자인 노드 0:825에 기반한 Primary 스타일입니다. 일반적인 input 형태(border-radius: 8px)와 정확한 색상 값이 적용됩니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary 입력',
    placeholder: 'Secondary 스타일 입력',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tertiary 입력',
    placeholder: 'Tertiary 스타일 입력',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    label: '작은 입력',
    placeholder: '작은 크기 입력',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    label: '중간 입력',
    placeholder: '중간 크기 입력',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    label: '큰 입력',
    placeholder: '큰 크기 입력',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    label: '라이트 테마',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마 디자인 노드 0:825 (라이트모드)에 기반한 input 스타일입니다.',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    label: '다크 테마',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '피그마 디자인 노드 0:8550 (다크모드)에 기반한 input 스타일입니다.',
      },
    },
  },
};

// States (상태) 스토리들
export const WithLabel: Story = {
  args: {
    label: '라벨이 있는 입력',
    placeholder: '라벨과 함께 사용',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '도움말이 있는 입력',
    placeholder: '도움말과 함께 사용',
    helperText: '도움말 텍스트입니다',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const WithError: Story = {
  args: {
    label: '에러가 있는 입력',
    placeholder: '에러 상태로 표시',
    error: true,
    errorMessage: '에러 메시지입니다',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력',
    placeholder: '비활성화된 상태',
    disabled: true,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const ReadOnly: Story = {
  args: {
    label: '읽기 전용 입력',
    placeholder: '읽기 전용 상태',
    readOnly: true,
    value: '읽기 전용 값',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// 아이콘이 있는 입력
export const WithLeftIcon: Story = {
  args: {
    label: '아이콘이 있는 입력',
    placeholder: '입력해주세요.',
    leftIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '왼쪽 아이콘이 포함된 입력창입니다.',
      },
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    label: '오른쪽 아이콘이 있는 입력',
    placeholder: '오른쪽 아이콘과 함께',
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
      </svg>
    ),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: '양쪽 아이콘이 있는 입력',
    placeholder: '양쪽 아이콘과 함께',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
      </svg>
    ),
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// 피그마 디자인 input 스토리
export const FigmaInputLight: Story = {
  args: {
    label: '피그마 라이트 테마',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마 디자인 노드 0:825 (라이트모드)에 기반한 input 스타일입니다. 8px 둥근 형태와 정확한 색상 값이 적용됩니다.',
      },
    },
  },
};

export const FigmaInputDark: Story = {
  args: {
    label: '피그마 다크 테마',
    placeholder: '입력해주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '피그마 디자인 노드 0:8550 (다크모드)에 기반한 input 스타일입니다. 검은색 배경과 #333333 테두리 색상이 적용됩니다.',
      },
    },
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input
        label="Primary 입력"
        placeholder="입력해주세요."
        variant="primary"
        size="medium"
        theme="light"
      />
      <Input
        label="Secondary 입력"
        placeholder="Secondary 스타일"
        variant="secondary"
        size="medium"
        theme="light"
      />
      <Input
        label="Tertiary 입력"
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
        story: '모든 variant 타입을 확인할 수 있습니다. Primary는 피그마 디자인(노드 0:825, 0:8550)에 맞춰 input 스타일이 적용되었습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input
        label="Small 입력"
        placeholder="입력해주세요."
        variant="primary"
        size="small"
        theme="light"
      />
      <Input
        label="Medium 입력"
        placeholder="입력해주세요."
        variant="primary"
        size="medium"
        theme="light"
      />
      <Input
        label="Large 입력"
        placeholder="입력해주세요."
        variant="primary"
        size="large"
        theme="light"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 size 옵션을 확인할 수 있습니다. 피그마 디자인에 맞춰 8px 둥근 형태가 적용됩니다.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input
        label="정상 상태"
        placeholder="정상 입력"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Input
        label="에러 상태"
        placeholder="에러 입력"
        error={true}
        errorMessage="에러가 발생했습니다"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Input
        label="비활성화 상태"
        placeholder="비활성화 입력"
        disabled={true}
        variant="primary"
        size="medium"
        theme="light"
      />
      <Input
        label="읽기 전용 상태"
        placeholder="읽기 전용 입력"
        readOnly={true}
        value="읽기 전용 값"
        variant="primary"
        size="medium"
        theme="light"
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Input
            label="Primary (Light)"
            placeholder="입력해주세요."
            variant="primary"
            size="medium"
            theme="light"
          />
          <Input
            label="Secondary (Light)"
            placeholder="라이트 테마 Secondary"
            variant="secondary"
            size="medium"
            theme="light"
          />
          <Input
            label="Tertiary (Light)"
            placeholder="라이트 테마 Tertiary"
            variant="tertiary"
            size="medium"
            theme="light"
          />
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#ccc' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Input
            label="Primary (Dark)"
            placeholder="입력해주세요."
            variant="primary"
            size="medium"
            theme="dark"
          />
          <Input
            label="Secondary (Dark)"
            placeholder="다크 테마 Secondary"
            variant="secondary"
            size="medium"
            theme="dark"
          />
          <Input
            label="Tertiary (Dark)"
            placeholder="다크 테마 Tertiary"
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
        story: 'Light와 Dark 테마에서의 모든 variant를 확인할 수 있습니다. Primary variant는 피그마 디자인(노드 0:825, 0:8550)에 맞춰 input 스타일이 적용되었습니다.',
      },
    },
  },
};

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const WithFormExample: Story = {
  render: function WithFormExampleRender() {
    const [formData, setFormData] = React.useState<FormData>({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const [errors, setErrors] = React.useState<FormErrors>({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev: FormData) => ({ ...prev, [field]: e.target.value }));
      
      // 간단한 유효성 검사
      if (field === 'email' && e.target.value && !e.target.value.includes('@')) {
        setErrors((prev: FormErrors) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다' }));
      } else if (field === 'password' && e.target.value.length < 6) {
        setErrors((prev: FormErrors) => ({ ...prev, password: '비밀번호는 최소 6자 이상이어야 합니다' }));
      } else if (field === 'confirmPassword' && e.target.value !== formData.password) {
        setErrors((prev: FormErrors) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }));
      } else {
        setErrors((prev: FormErrors) => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div style={{ width: '400px', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>회원가입</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input
            label="사용자명"
            placeholder="사용자명을 입력하세요"
            value={formData.username}
            onChange={handleChange('username')}
            variant="primary"
            size="medium"
            theme="light"
          />
          
          <Input
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            errorMessage={errors.email}
            variant="primary"
            size="medium"
            theme="light"
          />
          
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            errorMessage={errors.password}
            helperText="최소 6자 이상 입력해주세요"
            variant="primary"
            size="medium"
            theme="light"
          />
          
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            variant="primary"
            size="medium"
            theme="light"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 사용하는 예제입니다. 유효성 검사와 다양한 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// 피그마 디자인 비교 스토리
export const FigmaDesignComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '500px' }}>
      <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
          피그마 디자인 적용된 Input 컴포넌트
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              라이트모드 (노드 0:825 기반)
            </div>
            <Input
              label="라이트 테마 Input"
              placeholder="입력해주세요."
              variant="primary"
              size="medium"
              theme="light"
            />
            <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
              • 일반 input 형태 (border-radius: 8px)<br/>
              • 배경: #ffffff<br/>
              • 테두리: #c7c7c7<br/>
              • 플레이스홀더: #ababab<br/>
              • 텍스트: #1c1c1c
            </div>
          </div>
          
          <div style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', color: '#ccc', marginBottom: '8px' }}>
              다크모드 (노드 0:8550 기반)
            </div>
            <Input
              label="다크 테마 Input"
              placeholder="입력해주세요."
              variant="primary"
              size="medium"
              theme="dark"
            />
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
              • 일반 input 형태 (border-radius: 8px)<br/>
              • 배경: #000000<br/>
              • 테두리: #333333<br/>
              • 플레이스홀더: #c7c7c7<br/>
              • 텍스트: #ffffff
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '피그마 디자인 노드 0:825 (라이트모드)와 0:8550 (다크모드)를 기반으로 구현한 input 스타일입니다. Searchbar와 구분되는 일반적인 input 형태와 정확한 색상 값이 적용되었습니다.',
      },
    },
  },
};
