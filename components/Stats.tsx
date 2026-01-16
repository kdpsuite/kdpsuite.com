'use client';

/**
 * Stats Component
 * Displays impressive metrics and social proof statistics
 */

export default function Stats() {
  const stats = [
    {
      value: '10,000+',
      label: 'Active Users',
    },
    {
      value: '500K+',
      label: 'Books Published',
    },
    {
      value: '$50M+',
      label: 'Revenue Generated',
    },
    {
      value: '4.8★',
      label: 'Average Rating',
    },
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold mb-2 font-heading">{stat.value}</p>
              <p className="text-pink-100 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
