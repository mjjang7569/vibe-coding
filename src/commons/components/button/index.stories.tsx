import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, size, theme를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '버튼 테마',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '기본 버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    fullWidth: false,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    children: 'Primary 버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary 버튼',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary 버튼',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    children: '작은 버튼',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    children: '중간 버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    children: '라이트 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    children: '다크 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// States (상태) 스토리들
export const Disabled: Story = {
  args: {
    children: '비활성화된 버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: '전체 너비 버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" size="medium" theme="light">
        Primary
      </Button>
      <Button variant="secondary" size="medium" theme="light">
        Secondary
      </Button>
      <Button variant="tertiary" size="medium" theme="light">
        Tertiary
      </Button>
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
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary" size="small" theme="light">
        Small
      </Button>
      <Button variant="primary" size="medium" theme="light">
        Medium
      </Button>
      <Button variant="primary" size="large" theme="light">
        Large
      </Button>
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

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ padding: '16px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Light Theme</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="medium" theme="light">
            Primary
          </Button>
          <Button variant="secondary" size="medium" theme="light">
            Secondary
          </Button>
          <Button variant="tertiary" size="medium" theme="light">
            Tertiary
          </Button>
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#0a0a0a' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Dark Theme</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="medium" theme="dark">
            Primary
          </Button>
          <Button variant="secondary" size="medium" theme="dark">
            Secondary
          </Button>
          <Button variant="tertiary" size="medium" theme="dark">
            Tertiary
          </Button>
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
  render: () => {
    const handleClick = () => {
      alert('버튼이 클릭되었습니다!');
    };

    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'start' }}>
        <Button variant="primary" size="medium" theme="light" onClick={handleClick}>
          클릭하세요!
        </Button>
        <Button variant="secondary" size="medium" theme="light" onClick={handleClick}>
          이것도 클릭하세요!
        </Button>
        <Button variant="tertiary" size="medium" theme="light" onClick={handleClick}>
          또는 이것!
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트가 동작하는 예제입니다.',
      },
    },
  },
};
