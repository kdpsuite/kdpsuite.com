'use client';

/**
 * Trust Badges Component
 * Displays trust indicators like SSL security, guarantees, and support
 */

export default function TrustBadges() {
  const badges = [
    {
      icon: '✓',
      label: 'SSL Secure',
      color: 'text-green-600',
    },
    {
      icon: '✓',
      label: 'Money-Back Guarantee',
      color: 'text-green-600',
    },
    {
      icon: '✓',
      label: '24/7 Support',
      color: 'text-green-600',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 py-6 font-body">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className={badge.color}>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
