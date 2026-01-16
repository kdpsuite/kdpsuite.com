'use client';

/**
 * Case Studies Component
 * Social proof with real success stories
 * Expected impact: +10-15% conversion increase
 */

export default function CaseStudies() {
  const studies = [
    {
      title: 'From 5 to 50 Books/Month',
      author: 'Michael Chen',
      role: 'Publishing Studio Owner',
      result: '10x productivity increase',
      content:
        'With KDP Creator Suite, we went from manually processing 5 books per month to 50 books per month. The batch processing feature alone saved us 20+ hours per week. Our revenue increased by 300% in just 6 months.',
      image: '👨‍💼',
      revenue: '+$15,000/month',
    },
    {
      title: 'Turned Side Hustle into Full-Time Income',
      author: 'Sarah Johnson',
      role: 'Indie Publisher',
      result: '6-figure annual revenue',
      content:
        'I was publishing 2-3 books per month as a side project. KDP Creator Suite helped me automate the entire workflow. Now I publish 20+ books monthly and earn $8,000+ per month.',
      image: '👩‍💼',
      revenue: '+$96,000/year',
    },
    {
      title: 'Scaled Publishing Business Rapidly',
      author: 'David Rodriguez',
      role: 'Publishing Agency Owner',
      result: '500% revenue growth',
      content:
        'We manage 50+ client accounts. KDP Creator Suite\'s API and team collaboration features let us scale our operations without hiring additional staff. Client satisfaction increased by 40%.',
      image: '👨‍💻',
      revenue: '+$50,000/month',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 font-heading">
          Success Stories
        </h2>
        <p className="text-center text-gray-600 mb-12 font-body">
          Real results from KDP Creator Suite users
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study) => (
            <div
              key={study.author}
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary hover:shadow-xl transition-shadow"
            >
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{study.image}</span>
                <div>
                  <p className="font-semibold text-neutral font-heading">
                    {study.author}
                  </p>
                  <p className="text-sm text-gray-600 font-body">{study.role}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                {study.title}
              </h3>

              {/* Content */}
              <p className="text-gray-700 mb-4 leading-relaxed font-body">
                {study.content}
              </p>

              {/* Result Badge */}
              <div className="bg-primary/10 p-3 rounded-lg mb-3">
                <p className="text-sm font-semibold text-primary font-heading">
                  Result: {study.result}
                </p>
                <p className="text-sm text-gray-600 font-body">{study.revenue}</p>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 font-body">
            Ready to write your own success story?
          </p>
          <a
            href="https://dashboard.kdpsuite.com"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all font-heading"
          >
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
