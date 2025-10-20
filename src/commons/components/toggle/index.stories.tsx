import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Toggle from './index';

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, size, theme를 지원하는 토글 컴포넌트입니다. 라벨을 지원하며 체크박스 기능을 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '토글 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '토글 테마',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    checked: {
      control: 'boolean',
      description: '체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 토글
export const Default: Story = {
  args: {
    label: '기본 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: false,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    label: 'Primary 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary 토글',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tertiary 토글',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    label: '작은 토글',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    label: '중간 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    label: '큰 토글',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    label: '라이트 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    label: '다크 테마',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// States (상태) 스토리들
export const WithLabel: Story = {
  args: {
    label: '라벨이 있는 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const WithoutLabel: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Checked: Story = {
  args: {
    label: '체크된 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화된 체크 토글',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
    checked: true,
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '200px' }}>
      <Toggle label="Primary 토글" variant="primary" size="medium" theme="light" />
      <Toggle label="Secondary 토글" variant="secondary" size="medium" theme="light" />
      <Toggle label="Tertiary 토글" variant="tertiary" size="medium" theme="light" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '200px' }}>
      <Toggle label="Small 토글" variant="primary" size="small" theme="light" />
      <Toggle label="Medium 토글" variant="primary" size="medium" theme="light" />
      <Toggle label="Large 토글" variant="primary" size="large" theme="light" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '200px' }}>
      <Toggle label="정상 상태" variant="primary" size="medium" theme="light" />
      <Toggle label="체크된 상태" variant="primary" size="medium" theme="light" checked={true} />
      <Toggle label="비활성화 상태" variant="primary" size="medium" theme="light" disabled={true} />
      <Toggle label="비활성화 체크" variant="primary" size="medium" theme="light" disabled={true} checked={true} />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
          <Toggle label="Primary (Light)" variant="primary" size="medium" theme="light" />
          <Toggle label="Secondary (Light)" variant="secondary" size="medium" theme="light" />
          <Toggle label="Tertiary (Light)" variant="tertiary" size="medium" theme="light" />
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#ccc' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
          <Toggle label="Primary (Dark)" variant="primary" size="medium" theme="dark" />
          <Toggle label="Secondary (Dark)" variant="secondary" size="medium" theme="dark" />
          <Toggle label="Tertiary (Dark)" variant="tertiary" size="medium" theme="dark" />
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
    const [settings, setSettings] = React.useState({
      notifications: false,
      darkMode: false,
      autoSave: true,
    });

    const handleToggleChange = (key: string) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ width: '300px', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>설정</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Toggle
            label="알림 받기"
            checked={settings.notifications}
            onChange={handleToggleChange('notifications')}
            variant="primary"
            size="medium"
            theme="light"
          />
          
          <Toggle
            label="다크 모드"
            checked={settings.darkMode}
            onChange={handleToggleChange('darkMode')}
            variant="secondary"
            size="medium"
            theme="light"
          />
          
          <Toggle
            label="자동 저장"
            checked={settings.autoSave}
            onChange={handleToggleChange('autoSave')}
            variant="tertiary"
            size="medium"
            theme="light"
          />
        </div>
        
        <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '14px' }}>
          <strong>현재 설정:</strong>
          <div>알림: {settings.notifications ? 'ON' : 'OFF'}</div>
          <div>다크모드: {settings.darkMode ? 'ON' : 'OFF'}</div>
          <div>자동저장: {settings.autoSave ? 'ON' : 'OFF'}</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 설정 페이지에서 사용하는 예제입니다. 상태 변화를 확인할 수 있습니다.',
      },
    },
  },
};
