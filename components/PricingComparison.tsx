'use client';

/**
 * Pricing Comparison Component
 * Helps users understand differences between plans
 * Expected impact: +10-15% conversion increase
 */

import Link from 'next/link';

export default function PricingComparison() {
  const features = [
    { name: 'PDF Conversions/Month', free: '10', pro: 'Unlimited', studio: 'Unlimited' },
    { name: 'Batch Processing', free: '❌', pro: '✓', studio: '✓' },
    { name: 'KDP Compliance Check', free: 'Basic', pro: 'Advanced', studio: 'Advanced' },
    { name: 'Priority Support', free: '❌', pro: '✓', studio: '24/7' },
    { name: 'API Access', free: '❌', pro: '❌', studio: '✓' },
    { name: 'Custom Workflows', free: '❌', pro: '❌', studio: '✓' },
    { name: 'Team Collaboration', free: '❌', pro: '❌', studio: '✓' },
    { name: 'Advanced Analytics', free: '❌', pro: '✓', studio: '✓' },
    { name: 'Bulk Image Processing', free: '❌', pro: '✓', studio: '✓' },
    { name: 'Direct KDP Integration', free: 'Manual', pro: 'Automated', studio: 'Automated' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 font-heading">
          Feature Comparison
        </h2>
        <p className="text-center text-gray-600 mb-12 font-body">
          Choose the perfect plan for your publishing needs
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-100">
                <th className="text-left p-4 font-semibold text-neutral font-heading">
                  Feature
                </th>
                <th className="text-center p-4 font-semibold text-neutral font-heading">
                  Free
                </th>
                <th className="text-center p-4 font-semibold text-neutral font-heading">
                  Pro
                </th>
                <th className="text-center p-4 font-semibold text-neutral font-heading">
                  Studio
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="p-4 font-semibold text-neutral font-body">
                    {feature.name}
                  </td>
                  <td className="text-center p-4 text-gray-600 font-body">
                    {feature.free}
                  </td>
                  <td className="text-center p-4 text-gray-600 font-body font-semibold">
                    {feature.pro}
                  </td>
                  <td className="text-center p-4 text-gray-600 font-body">
                    {feature.studio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 font-body">
            All plans include basic KDP publishing tools and community support
          </p>
          <Link
            href="/#pricing"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all font-heading"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
