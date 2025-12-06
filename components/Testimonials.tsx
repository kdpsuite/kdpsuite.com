'use client';

/**
 * Testimonials Component
 * Displays customer testimonials with ratings to build social proof and trust
 */

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'KDP Author',
      content: 'KDP Creator Suite saved me 10+ hours per week. The compliance validation is a lifesaver!',
      emoji: '👩‍💼',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Publishing Studio Owner',
      content: 'We went from 5 books/month to 50 books/month with batch processing. Incredible ROI.',
      emoji: '👨‍💼',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Indie Publisher',
      content: 'The best investment for my publishing business. Customer support is amazing.',
      emoji: '👩‍🎨',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-heading">
          Loved by 10,000+ Publishers
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{testimonial.emoji}</span>
                <div>
                  <p className="font-semibold text-neutral">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
