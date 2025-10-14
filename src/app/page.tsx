'use client';

import { Button } from '@/commons/components/button';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Button Component Showcase
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
      </main>
    </div>
  );
}