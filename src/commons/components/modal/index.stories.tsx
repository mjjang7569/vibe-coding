import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, actions, theme를 지원하는 모달 컴포넌트입니다. modal.provider와 함께 사용되며, single/dual action을 지원합니다. Light 테마와 Dark 테마를 모두 지원하며, info/danger variant를 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달 변형 타입',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '액션 버튼 개수',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '모달 테마',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    message: {
      control: 'text',
      description: '모달 설명 메시지',
    },
    primaryButtonText: {
      control: 'text',
      description: 'Primary 버튼 텍스트',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Secondary 버튼 텍스트',
    },
    primaryButtonDisabled: {
      control: 'boolean',
      description: 'Primary 버튼 비활성화 여부',
    },
    secondaryButtonDisabled: {
      control: 'boolean',
      description: 'Secondary 버튼 비활성화 여부',
    },
    onPrimaryClick: { action: 'primary clicked' },
    onSecondaryClick: { action: 'secondary clicked' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '일기 등록 완료',
    message: '등록이 완료 되었습니다.',
    primaryButtonText: '확인',
    primaryButtonDisabled: false,
  },
};

// Single Action Variants
export const SingleActionInfo: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '일기 등록 완료',
    message: '등록이 완료 되었습니다.',
    primaryButtonText: '확인',
  },
};

export const SingleActionDanger: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '일기 삭제',
    message: '일기를 삭제하시겠어요?',
    primaryButtonText: '삭제',
  },
};

// Dual Action Variants
export const DualActionInfo: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '일기 등록 취소',
    message: '일기 등록을 취소 하시겠어요?',
    primaryButtonText: '등록 취소',
    secondaryButtonText: '계속 작성',
  },
};

export const DualActionDanger: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '일기 삭제',
    message: '정말로 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다.',
    primaryButtonText: '삭제',
    secondaryButtonText: '취소',
  },
};

// Theme Variants
export const LightTheme: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '일기 등록 완료',
    message: '등록이 완료 되었습니다.',
    primaryButtonText: '확인',
  },
};

export const DarkTheme: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    title: '일기 등록 완료',
    message: '등록이 완료 되었습니다.',
    primaryButtonText: '확인',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Disabled Button States
export const PrimaryButtonDisabled: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '일기 등록 완료',
    message: '등록이 완료 되었습니다.',
    primaryButtonText: '확인',
    primaryButtonDisabled: true,
  },
};

export const SecondaryButtonDisabled: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '일기 등록 취소',
    message: '일기 등록을 취소 하시겠어요?',
    primaryButtonText: '등록 취소',
    secondaryButtonText: '계속 작성',
    secondaryButtonDisabled: true,
  },
};

export const BothButtonsDisabled: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '일기 등록 취소',
    message: '일기 등록을 취소 하시겠어요?',
    primaryButtonText: '등록 취소',
    secondaryButtonText: '계속 작성',
    primaryButtonDisabled: true,
    secondaryButtonDisabled: true,
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          marginBottom: '16px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#111827' 
        }}>
          Info Variants
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="일기 등록 완료"
            message="등록이 완료 되었습니다."
            primaryButtonText="확인"
          />
          <Modal
            variant="info"
            actions="dual"
            theme="light"
            title="일기 등록 취소"
            message="일기 등록을 취소 하시겠어요?"
            primaryButtonText="등록 취소"
            secondaryButtonText="계속 작성"
          />
        </div>
      </div>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fef2f2',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          marginBottom: '16px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#991b1b' 
        }}>
          Danger Variants
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Modal
            variant="danger"
            actions="single"
            theme="light"
            title="일기 삭제"
            message="일기를 삭제하시겠어요?"
            primaryButtonText="삭제"
          />
          <Modal
            variant="danger"
            actions="dual"
            theme="light"
            title="일기 삭제"
            message="정말로 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다."
            primaryButtonText="삭제"
            secondaryButtonText="취소"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 variant와 actions 조합을 확인할 수 있습니다.',
      },
    },
    layout: 'padded',
  },
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
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
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="일기 등록 완료"
            message="등록이 완료 되었습니다."
            primaryButtonText="확인"
          />
          <Modal
            variant="info"
            actions="dual"
            theme="light"
            title="일기 등록 취소"
            message="일기 등록을 취소 하시겠어요?"
            primaryButtonText="등록 취소"
            secondaryButtonText="계속 작성"
          />
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
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Modal
            variant="info"
            actions="single"
            theme="dark"
            title="일기 등록 완료"
            message="등록이 완료 되었습니다."
            primaryButtonText="확인"
          />
          <Modal
            variant="info"
            actions="dual"
            theme="dark"
            title="일기 등록 취소"
            message="일기 등록을 취소 하시겠어요?"
            primaryButtonText="등록 취소"
            secondaryButtonText="계속 작성"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Light와 Dark 테마에서의 모달을 확인할 수 있습니다.',
      },
    },
    layout: 'padded',
  },
};

// 인터랙션 예제
export const InteractiveExample: Story = {
  render: function InteractiveExampleRender() {
    const handlePrimaryClick = () => {
      alert('Primary 버튼이 클릭되었습니다!');
    };

    const handleSecondaryClick = () => {
      alert('Secondary 버튼이 클릭되었습니다!');
    };

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            Single Action Modal
          </h3>
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="알림"
            message="이것은 single action 모달입니다."
            primaryButtonText="확인"
            onPrimaryClick={handlePrimaryClick}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            Dual Action Modal
          </h3>
          <Modal
            variant="info"
            actions="dual"
            theme="light"
            title="확인"
            message="이것은 dual action 모달입니다."
            primaryButtonText="확인"
            secondaryButtonText="취소"
            onPrimaryClick={handlePrimaryClick}
            onSecondaryClick={handleSecondaryClick}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트가 동작하는 모달 예제입니다.',
      },
    },
    layout: 'padded',
  },
};

// 실제 사용 예제
export const RealWorldExamples: Story = {
  render: function RealWorldExamplesRender() {
    const handleSave = () => {
      alert('일기가 저장되었습니다!');
    };

    const handleCancel = () => {
      alert('작성을 계속합니다.');
    };

    const handleDelete = () => {
      alert('일기가 삭제되었습니다!');
    };

    const handleKeep = () => {
      alert('일기를 유지합니다.');
    };

    return (
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            일기 저장 완료
          </h3>
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="일기 등록 완료"
            message="등록이 완료 되었습니다."
            primaryButtonText="확인"
            onPrimaryClick={handleSave}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            작성 취소 확인
          </h3>
          <Modal
            variant="info"
            actions="dual"
            theme="light"
            title="일기 등록 취소"
            message="일기 등록을 취소 하시겠어요?"
            primaryButtonText="등록 취소"
            secondaryButtonText="계속 작성"
            onPrimaryClick={handleCancel}
            onSecondaryClick={handleKeep}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            일기 삭제 확인
          </h3>
          <Modal
            variant="danger"
            actions="dual"
            theme="light"
            title="일기 삭제"
            message="정말로 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다."
            primaryButtonText="삭제"
            secondaryButtonText="취소"
            onPrimaryClick={handleDelete}
            onSecondaryClick={handleKeep}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 모달 시나리오들입니다.',
      },
    },
    layout: 'padded',
  },
};

// 모든 상태 조합
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          정상 상태
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          primaryButtonText="등록 취소"
          secondaryButtonText="계속 작성"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Primary 버튼 비활성화
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          primaryButtonText="등록 취소"
          secondaryButtonText="계속 작성"
          primaryButtonDisabled={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          Secondary 버튼 비활성화
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          primaryButtonText="등록 취소"
          secondaryButtonText="계속 작성"
          secondaryButtonDisabled={true}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          모든 버튼 비활성화
        </h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="일기 등록 취소"
          message="일기 등록을 취소 하시겠어요?"
          primaryButtonText="등록 취소"
          secondaryButtonText="계속 작성"
          primaryButtonDisabled={true}
          secondaryButtonDisabled={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 모든 활성화/비활성화 상태를 확인할 수 있습니다.',
      },
    },
    layout: 'padded',
  },
};

