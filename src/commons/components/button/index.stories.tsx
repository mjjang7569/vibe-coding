import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, size, theme를 지원하는 버튼 컴포넌트입니다. 색상 토큰 시스템을 활용하며, 향상된 인터랙션과 접근성을 제공합니다. Light 테마에서 Primary 버튼은 검은색 배경(#000000)과 흰색 텍스트를 사용하며, Dark 테마에서는 밝은 회색 배경(#f2f2f2)과 검은색 텍스트를 사용합니다. Medium 크기의 버튼은 18px 폰트 크기를 사용합니다.',
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
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '8px'
      }}>
        <div style={{ 
          marginBottom: '16px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#111827' 
        }}>
          Light Theme
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#0a0a0a',
        border: '1px solid #27272a',
        borderRadius: '8px'
      }}>
        <div style={{ 
          marginBottom: '16px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#f9fafb' 
        }}>
          Dark Theme
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
        story: 'Light와 Dark 테마에서의 모든 variant를 확인할 수 있습니다. 업데이트된 색상 토큰과 스타일링이 적용되었습니다.',
      },
    },
    layout: 'padded',
  },
};

// 인터랙션과 상태 변화를 보여주는 스토리
export const InteractiveStates: Story = {
  render: function InteractiveStatesRender() {
    const handleClick = (variant: string) => {
      alert(`${variant} 버튼이 클릭되었습니다!`);
    };

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', alignItems: 'start' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            인터랙션 상태 (호버/클릭 효과 포함)
          </h3>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            Primary 버튼은 클릭시 검은색 배경으로 변경됩니다 (피그마 디자인 적용)
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="medium" theme="light" onClick={() => handleClick('Primary')}>
              Primary 클릭
            </Button>
            <Button variant="secondary" size="medium" theme="light" onClick={() => handleClick('Secondary')}>
              Secondary 클릭
            </Button>
            <Button variant="tertiary" size="medium" theme="light" onClick={() => handleClick('Tertiary')}>
              Tertiary 클릭
            </Button>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            모든 크기와 상태 조합
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="small" theme="light">
              Small
            </Button>
            <Button variant="primary" size="medium" theme="light">
              Medium
            </Button>
            <Button variant="primary" size="large" theme="light">
              Large
            </Button>
            <Button variant="primary" size="medium" theme="light" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '업데이트된 인터랙션 효과와 모든 상태를 확인할 수 있습니다. 호버와 클릭 시 애니메이션과 리플 효과를 확인해보세요. Primary 버튼의 Active 상태에서 피그마 디자인이 적용되어 검은색 배경으로 변경됩니다.',
      },
    },
  },
};

// 접근성 관련 스토리
export const Accessibility: Story = {
  render: function AccessibilityRender() {
    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            키보드 네비게이션 지원
          </h3>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            Tab 키로 포커스를 이동하고, Enter/Space로 클릭할 수 있습니다.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="medium" theme="light">
              첫 번째 버튼
            </Button>
            <Button variant="secondary" size="medium" theme="light">
              두 번째 버튼
            </Button>
            <Button variant="tertiary" size="medium" theme="light">
              세 번째 버튼
            </Button>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            전체 너비 및 다양한 상태
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', width: '300px' }}>
            <Button variant="primary" size="medium" theme="light" fullWidth>
              전체 너비 버튼
            </Button>
            <Button variant="secondary" size="medium" theme="light" disabled>
              비활성화된 버튼
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '접근성 기능들을 확인할 수 있습니다. 키보드 네비게이션과 포커스 스타일, 스크린 리더 지원 등을 테스트해보세요.',
      },
    },
    layout: 'padded',
  },
};

export const InteractiveExample: Story = {
  render: function InteractiveExampleRender() {
    const handleClick = (variant: string) => {
      alert(`${variant} 버튼이 클릭되었습니다!`);
    };

    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'start' }}>
        <Button variant="primary" size="medium" theme="light" onClick={() => handleClick('Primary')}>
          클릭하세요!
        </Button>
        <Button variant="secondary" size="medium" theme="light" onClick={() => handleClick('Secondary')}>
          이것도 클릭하세요!
        </Button>
        <Button variant="tertiary" size="medium" theme="light" onClick={() => handleClick('Tertiary')}>
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

// 피그마 디자인 적용 - 일기쓰기 버튼 예제
export const FigmaDesign: Story = {
  render: function FigmaDesignRender() {
    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', alignItems: 'start' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            피그마 디자인 적용 - 일기쓰기 버튼
          </h3>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            클릭시 검은색 배경으로 변경되는 디자인이 적용되었습니다.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="medium" theme="light">
              일기쓰기
            </Button>
            <Button variant="primary" size="medium" theme="dark">
              일기쓰기
            </Button>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            Active 상태 미리보기 (CSS 시뮬레이션)
          </h3>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            실제 클릭시 나타나는 검은색 배경 상태를 보여줍니다. 폰트 크기는 18px로 피그마 디자인과 일치합니다.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              일기쓰기 (Active 상태)
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '피그마 디자인에 따라 수정된 버튼 스타일을 확인할 수 있습니다. Primary 버튼의 Active 상태에서 검은색 배경(#000000)과 흰색 텍스트(#ffffff)가 적용됩니다. Medium 크기 버튼의 폰트 크기는 18px로 피그마 디자인과 일치합니다.',
      },
    },
    layout: 'padded',
  },
};
