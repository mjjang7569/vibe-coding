import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Searchbar from './index';

const meta: Meta<typeof Searchbar> = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 variant, size, theme를 지원하는 검색바 컴포넌트입니다. 피그마 디자인에 맞게 구현되었으며, 다크 테마는 배경색 #000000, 테두리 색상 #333333, 텍스트 색상 #ffffff, 플레이스홀더 색상 #c7c7c7을 사용합니다. 플레이스홀더는 Pretendard Variable 폰트, 500 font-weight, 16px 크기로 피그마 디자인과 일치하게 구현되었습니다. Medium 크기에서 컨테이너는 48px 높이, 최소 320px 너비로 설정되고, 아이콘과 텍스트 간격이 피그마 디자인에 맞게 조정되었습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바 변형 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '검색바 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '검색바 테마',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    showSearchIcon: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부',
    },
    onSearch: { action: 'searched' },
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 검색바
export const Default: Story = {
  args: {
    placeholder: '검색어를 입력해 주세요.',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    readOnly: false,
    showSearchIcon: true,
  },
};

// Variants (변형 타입) 스토리들
export const Primary: Story = {
  args: {
    placeholder: 'Primary 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'Secondary 검색바',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    placeholder: 'Tertiary 검색바',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// Sizes (크기) 스토리들
export const Small: Story = {
  args: {
    placeholder: '작은 검색바',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    placeholder: '중간 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    placeholder: '큰 검색바',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// Themes (테마) 스토리들
export const LightTheme: Story = {
  args: {
    placeholder: '라이트 테마 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    placeholder: '다크 테마 검색바',
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
    placeholder: '비활성화된 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: '읽기 전용 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    readOnly: true,
    defaultValue: '읽기 전용 값',
  },
};

export const DarkThemeStates: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: '#1c1c1c', borderRadius: '8px', width: '400px' }}>
      <div style={{ marginBottom: '24px', fontSize: '16px', color: '#e4e4e4', fontWeight: '600' }}>
        다크 테마 상태별 검색바 (피그마 디자인 반영)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#c7c7c7' }}>정상 상태</div>
          <Searchbar
            placeholder="다크 테마 검색바"
            variant="primary"
            size="medium"
            theme="dark"
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#c7c7c7' }}>비활성화 상태</div>
          <Searchbar
            placeholder="비활성화된 검색바"
            variant="primary"
            size="medium"
            theme="dark"
            disabled={true}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#c7c7c7' }}>읽기 전용 상태</div>
          <Searchbar
            placeholder="읽기 전용 검색바"
            variant="primary"
            size="medium"
            theme="dark"
            readOnly={true}
            defaultValue="읽기 전용 값"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다크 테마에서의 다양한 상태를 보여줍니다. 피그마 디자인 스펙에 맞게 배경색 #000000, 테두리 색상 #333333, 텍스트 색상 #ffffff, 플레이스홀더 색상 #c7c7c7이 적용되었습니다. 플레이스홀더는 Pretendard Variable 폰트, 500 font-weight, 16px 크기로 피그마 디자인과 일치하며, 아이콘과 텍스트 간격이 8px로 조정되어 피그마 디자인과 일치합니다.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    placeholder: '아이콘 없는 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    showSearchIcon: false,
  },
};

export const WithCustomIcon: Story = {
  args: {
    placeholder: '커스텀 아이콘 검색바',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    searchIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
  },
};

// 조합 스토리들
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Searchbar
        placeholder="Primary 검색바"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Searchbar
        placeholder="Secondary 검색바"
        variant="secondary"
        size="medium"
        theme="light"
      />
      <Searchbar
        placeholder="Tertiary 검색바"
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Searchbar
        placeholder="Small 크기"
        variant="primary"
        size="small"
        theme="light"
      />
      <Searchbar
        placeholder="Medium 크기"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Searchbar
        placeholder="Large 크기"
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Searchbar
        placeholder="정상 상태"
        variant="primary"
        size="medium"
        theme="light"
      />
      <Searchbar
        placeholder="비활성화 상태"
        variant="primary"
        size="medium"
        theme="light"
        disabled={true}
      />
      <Searchbar
        placeholder="읽기 전용 상태"
        variant="primary"
        size="medium"
        theme="light"
        readOnly={true}
        defaultValue="읽기 전용 값"
      />
      <Searchbar
        placeholder="아이콘 없는 상태"
        variant="primary"
        size="medium"
        theme="light"
        showSearchIcon={false}
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
          <Searchbar
            placeholder="라이트 테마 Primary"
            variant="primary"
            size="medium"
            theme="light"
          />
          <Searchbar
            placeholder="라이트 테마 Secondary"
            variant="secondary"
            size="medium"
            theme="light"
          />
          <Searchbar
            placeholder="라이트 테마 Tertiary"
            variant="tertiary"
            size="medium"
            theme="light"
          />
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#1c1c1c', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#e4e4e4' }}>Dark Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Searchbar
            placeholder="다크 테마 Primary"
            variant="primary"
            size="medium"
            theme="dark"
          />
          <Searchbar
            placeholder="다크 테마 Secondary"
            variant="secondary"
            size="medium"
            theme="dark"
          />
          <Searchbar
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
        story: 'Light와 Dark 테마에서의 모든 variant를 확인할 수 있습니다. 다크 테마는 피그마 디자인에 맞게 #000000 배경색과 #333333 테두리 색상을 적용했습니다. 플레이스홀더는 Pretendard Variable 폰트, 500 font-weight, 16px 크기로 피그마 디자인과 일치하며, 아이콘과 텍스트 간격이 8px로 조정되어 피그마 디자인과 일치합니다.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: function InteractiveExampleRender() {
    const [searchResults, setSearchResults] = React.useState<string[]>([]);
    
    const handleSearch = (value: string) => {
      if (value.trim()) {
        // 가상의 검색 결과
        const mockResults = [
          `${value}에 대한 검색 결과 1`,
          `${value}에 대한 검색 결과 2`,
          `${value}에 대한 검색 결과 3`,
        ];
        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
    };

    return (
      <div style={{ width: '400px', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>검색 예제</h3>
        
        <Searchbar
          placeholder="검색어를 입력하고 Enter를 누르세요"
          variant="primary"
          size="medium"
          theme="light"
          onSearch={handleSearch}
        />
        
        {searchResults.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
              검색 결과:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  style={{
                    padding: '8px 0',
                    borderBottom: index < searchResults.length - 1 ? '1px solid #f0f0f0' : 'none',
                    fontSize: '14px',
                    color: '#333',
                  }}
                >
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '검색 기능이 동작하는 예제입니다. Enter 키를 눌러 검색을 실행할 수 있습니다.',
      },
    },
  },
};

export const SearchExample: Story = {
  render: function SearchExampleRender() {
    const [inputValue, setInputValue] = React.useState('');
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    
    const handleSearch = (value: string) => {
      if (value.trim()) {
        setSearchHistory((prev: string[]) => [value, ...prev.filter(item => item !== value).slice(0, 4)]);
        setInputValue('');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    return (
      <div style={{ width: '400px', padding: '24px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>검색바 데모</h3>
        
        <Searchbar
          placeholder="검색어를 입력하세요"
          variant="primary"
          size="medium"
          theme="light"
          value={inputValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
        
        {searchHistory.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
              최근 검색어:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {searchHistory.map((term, index) => (
                <span
                  key={index}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실시간 입력값 변경과 검색 실행을 모두 지원하는 예제입니다.',
      },
    },
  },
};
