'use client';

import { useState } from 'react';
import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { Searchbar } from '@/commons/components/searchbar';
import { Selectbox } from '@/commons/components/selectbox';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [selectValue, setSelectValue] = useState('');

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Component Showcase
        </h1>

        {/* Light Theme Section */}
        <section className="mb-16 p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Light Theme</h2>
          
          {/* Primary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Primary Variant</h3>
            <div className="flex flex-wrap gap-4">
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

          {/* Secondary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Secondary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="small" theme="light">
                Small
              </Button>
              <Button variant="secondary" size="medium" theme="light">
                Medium
              </Button>
              <Button variant="secondary" size="large" theme="light">
                Large
              </Button>
              <Button variant="secondary" size="medium" theme="light" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Tertiary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Tertiary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="tertiary" size="small" theme="light">
                Small
              </Button>
              <Button variant="tertiary" size="medium" theme="light">
                Medium
              </Button>
              <Button variant="tertiary" size="large" theme="light">
                Large
              </Button>
              <Button variant="tertiary" size="medium" theme="light" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Full Width */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Full Width</h3>
            <div className="space-y-4">
              <Button variant="primary" size="medium" theme="light" fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>
        </section>

        {/* Dark Theme Section */}
        <section className="mb-16 p-8 bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Dark Theme</h2>
          
          {/* Primary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Primary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="small" theme="dark">
                Small
              </Button>
              <Button variant="primary" size="medium" theme="dark">
                Medium
              </Button>
              <Button variant="primary" size="large" theme="dark">
                Large
              </Button>
              <Button variant="primary" size="medium" theme="dark" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Secondary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="small" theme="dark">
                Small
              </Button>
              <Button variant="secondary" size="medium" theme="dark">
                Medium
              </Button>
              <Button variant="secondary" size="large" theme="dark">
                Large
              </Button>
              <Button variant="secondary" size="medium" theme="dark" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Tertiary Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Tertiary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="tertiary" size="small" theme="dark">
                Small
              </Button>
              <Button variant="tertiary" size="medium" theme="dark">
                Medium
              </Button>
              <Button variant="tertiary" size="large" theme="dark">
                Large
              </Button>
              <Button variant="tertiary" size="medium" theme="dark" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Full Width */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Full Width</h3>
            <div className="space-y-4">
              <Button variant="primary" size="medium" theme="dark" fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>
        </section>

        {/* Pagination Component Section */}
        <section className="mb-16 p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Pagination Component</h2>
          
          {/* Light Theme Pagination */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Light Theme</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2">Primary Variant (Current Page: {currentPage})</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="light"
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Secondary Variant</h4>
                <Pagination
                  variant="secondary"
                  size="medium"
                  theme="light"
                  currentPage={currentPage2}
                  totalPages={15}
                  onPageChange={setCurrentPage2}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Tertiary Variant</h4>
                <Pagination
                  variant="tertiary"
                  size="medium"
                  theme="light"
                  currentPage={currentPage3}
                  totalPages={20}
                  onPageChange={setCurrentPage3}
                />
              </div>
            </div>
          </div>

          {/* Size Variations */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Size Variations</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium mb-2">Small Size</h4>
                <Pagination
                  variant="primary"
                  size="small"
                  theme="light"
                  currentPage={1}
                  totalPages={8}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Medium Size</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="light"
                  currentPage={1}
                  totalPages={8}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Large Size</h4>
                <Pagination
                  variant="primary"
                  size="large"
                  theme="light"
                  currentPage={1}
                  totalPages={8}
                />
              </div>
            </div>
          </div>

          {/* Selectbox Component */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Selectbox Component</h3>
            <div className="space-y-6">
              {/* Primary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2">Primary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="small"
                      theme="light"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                      value={selectValue}
                      onChange={setSelectValue}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="medium"
                      theme="light"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="large"
                      theme="light"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="medium"
                      theme="light"
                      placeholder="Disabled"
                      disabled
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2">Secondary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="small"
                      theme="light"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="medium"
                      theme="light"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="large"
                      theme="light"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Tertiary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2">Tertiary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="small"
                      theme="light"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="medium"
                      theme="light"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="large"
                      theme="light"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Theme Pagination */}
          <div className="mb-8 p-6 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Dark Theme</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Primary Variant</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="dark"
                  currentPage={1}
                  totalPages={10}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Secondary Variant</h4>
                <Pagination
                  variant="secondary"
                  size="medium"
                  theme="dark"
                  currentPage={1}
                  totalPages={10}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Tertiary Variant</h4>
                <Pagination
                  variant="tertiary"
                  size="medium"
                  theme="dark"
                  currentPage={1}
                  totalPages={10}
                />
              </div>
            </div>
          </div>

          {/* Dark Theme Selectbox */}
          <div className="mb-8 p-6 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Dark Theme Selectbox</h3>
            <div className="space-y-6">
              {/* Primary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Primary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="small"
                      theme="dark"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="medium"
                      theme="dark"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="large"
                      theme="dark"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="primary"
                      size="medium"
                      theme="dark"
                      placeholder="Disabled"
                      disabled
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Secondary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="small"
                      theme="dark"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="medium"
                      theme="dark"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="secondary"
                      size="large"
                      theme="dark"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Tertiary Variant */}
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Tertiary Variant</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="small"
                      theme="dark"
                      placeholder="Small"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="medium"
                      theme="dark"
                      placeholder="Medium"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                  <div className="w-48">
                    <Selectbox
                      variant="tertiary"
                      size="large"
                      theme="dark"
                      placeholder="Large"
                      options={[
                        { value: 'all', label: '전체' },
                        { value: 'happy', label: '행복해요' },
                        { value: 'sad', label: '슬퍼요' },
                        { value: 'surprised', label: '놀랐어요' },
                        { value: 'angry', label: '화나요' },
                        { value: 'etc', label: '기타' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Advanced Features</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium mb-2">With First/Last Buttons</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="light"
                  currentPage={5}
                  totalPages={20}
                  showFirstLast={true}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Disabled State</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="light"
                  currentPage={1}
                  totalPages={10}
                  disabled={true}
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Many Pages (with ellipsis)</h4>
                <Pagination
                  variant="primary"
                  size="medium"
                  theme="light"
                  currentPage={10}
                  totalPages={50}
                  visiblePages={5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Interactive Demo</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="medium"
              theme="light"
              onClick={() => alert('Primary button clicked!')}
            >
              Click Me!
            </Button>
            <Button
              variant="secondary"
              size="medium"
              theme="light"
              onClick={() => alert('Secondary button clicked!')}
            >
              Click Me Too!
            </Button>
            <Button
              variant="tertiary"
              size="medium"
              theme="light"
              onClick={() => alert('Tertiary button clicked!')}
            >
              And Me!
            </Button>
          </div>
        </section>

        {/* Searchbar Component Section */}
        <section className="mb-16 p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Searchbar Component</h2>
          
          {/* Light Theme Searchbar */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Light Theme</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2">Primary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="small"
                      theme="light"
                      placeholder="작은 검색바"
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="light"
                      placeholder="중간 검색바"
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="large"
                      theme="light"
                      placeholder="큰 검색바"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Secondary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="secondary"
                      size="medium"
                      theme="light"
                      placeholder="Secondary 검색바"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Tertiary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="tertiary"
                      size="medium"
                      theme="light"
                      placeholder="Tertiary 검색바"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium mb-2">Disabled & Read-only</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="light"
                      placeholder="비활성화된 검색바"
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="light"
                      placeholder="읽기 전용 검색바"
                      readOnly
                      defaultValue="읽기 전용 텍스트"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Theme Searchbar */}
          <div className="mb-8 p-6 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Dark Theme</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Primary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="small"
                      theme="dark"
                      placeholder="작은 검색바 (다크)"
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="dark"
                      placeholder="중간 검색바 (다크)"
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="large"
                      theme="dark"
                      placeholder="큰 검색바 (다크)"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Secondary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="secondary"
                      size="medium"
                      theme="dark"
                      placeholder="Secondary 검색바 (다크)"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 text-white">Tertiary Variant</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="tertiary"
                      size="medium"
                      theme="dark"
                      placeholder="Tertiary 검색바 (다크)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium mb-2 text-white">Disabled & Read-only</h4>
                <div className="space-y-4">
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="dark"
                      placeholder="비활성화된 검색바 (다크)"
                      disabled
                    />
                  </div>
                  <div className="w-80">
                    <Searchbar
                      variant="primary"
                      size="medium"
                      theme="dark"
                      placeholder="읽기 전용 검색바 (다크)"
                      readOnly
                      defaultValue="읽기 전용 텍스트"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Example */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Interactive Example</h3>
            <div className="space-y-4">
              <div className="w-96">
                <Searchbar
                  variant="primary"
                  size="medium"
                  theme="light"
                  placeholder="검색어를 입력하고 Enter를 누르세요"
                  onSearch={(value) => alert(`검색어: ${value}`)}
                />
              </div>
              <p className="text-sm text-gray-600">
                검색어를 입력하고 Enter 키를 누르면 검색이 실행됩니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}