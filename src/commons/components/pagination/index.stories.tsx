import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, size, theme를 지원하는 페이지네이션 컴포넌트입니다. 페이지 이동, 이전/다음 버튼, 첫/마지막 페이지 버튼 등을 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '페이지네이션 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '페이지네이션 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '페이지네이션 테마',
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: '현재 페이지 번호',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: '전체 페이지 수',
    },
    visiblePages: {
      control: { type: 'number', min: 3, max: 9, step: 2 },
      description: '표시할 페이지 번호 개수',
    },
    showNavigation: {
      control: 'boolean',
      description: '이전/다음 버튼 표시 여부',
    },
    showFirstLast: {
      control: 'boolean',
      description: '첫 페이지/마지막 페이지 버튼 표시 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onPageChange: { action: 'page changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 페이지네이션
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
    disabled: false,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// States (상태) 스토리들
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
    disabled: true,
  },
};

export const WithoutNavigation: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: false,
    showFirstLast: false,
  },
};

export const WithFirstLastButtons: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 20,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: true,
  },
};

// 다양한 페이지 시나리오
export const FirstPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const LastPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const MiddlePage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

export const ManyPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 15,
    totalPages: 50,
    visiblePages: 7,
    showNavigation: true,
    showFirstLast: true,
  },
};

export const FewPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 2,
    totalPages: 3,
    visiblePages: 5,
    showNavigation: true,
    showFirstLast: false,
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Primary</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Secondary</div>
        <Pagination
          variant="secondary"
          size="medium"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Tertiary</div>
        <Pagination
          variant="tertiary"
          size="medium"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small</div>
        <Pagination
          variant="primary"
          size="small"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Large</div>
        <Pagination
          variant="primary"
          size="large"
          theme="light"
          currentPage={3}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
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
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>Light Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <Pagination
            variant="primary"
            size="medium"
            theme="light"
            currentPage={3}
            totalPages={10}
            visiblePages={5}
            showNavigation={true}
            showFirstLast={false}
          />
          <Pagination
            variant="secondary"
            size="medium"
            theme="light"
            currentPage={5}
            totalPages={10}
            visiblePages={5}
            showNavigation={true}
            showFirstLast={false}
          />
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#ccc' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <Pagination
            variant="primary"
            size="medium"
            theme="dark"
            currentPage={3}
            totalPages={10}
            visiblePages={5}
            showNavigation={true}
            showFirstLast={false}
          />
          <Pagination
            variant="secondary"
            size="medium"
            theme="dark"
            currentPage={5}
            totalPages={10}
            visiblePages={5}
            showNavigation={true}
            showFirstLast={false}
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

// 인터랙티브 예제
export const InteractiveExample: Story = {
  render: function InteractiveExampleRender() {
    const [currentPage, setCurrentPage] = React.useState(3);
    const totalPages = 20;

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      console.log(`페이지가 ${page}로 변경되었습니다.`);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          현재 페이지: {currentPage} / {totalPages}
        </div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={7}
          showNavigation={true}
          showFirstLast={true}
          onPageChange={handlePageChange}
        />
        <div style={{ fontSize: '12px', color: '#999', textAlign: 'center', maxWidth: '300px' }}>
          페이지를 클릭하여 페이지네이션이 동작하는 것을 확인해보세요.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '페이지 변경 이벤트가 동작하는 인터랙티브 예제입니다.',
      },
    },
  },
};

// 다양한 페이지 수 시나리오
export const PageScenarios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>적은 페이지 (3페이지)</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={2}
          totalPages={3}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>보통 페이지 (10페이지)</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={5}
          totalPages={10}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>많은 페이지 (50페이지)</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={25}
          totalPages={50}
          visiblePages={7}
          showNavigation={true}
          showFirstLast={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 페이지 수에 따른 페이지네이션 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// 기능별 예제
export const FeatureExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>기본 네비게이션만</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={5}
          totalPages={20}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={false}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>첫/마지막 버튼 포함</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={5}
          totalPages={20}
          visiblePages={5}
          showNavigation={true}
          showFirstLast={true}
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>페이지 번호만</div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={5}
          totalPages={20}
          visiblePages={5}
          showNavigation={false}
          showFirstLast={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 기능 조합을 확인할 수 있습니다.',
      },
    },
  },
};
