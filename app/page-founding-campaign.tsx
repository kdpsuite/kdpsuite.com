'use client';

import { foundingCampaignPlans } from '@/lib/pricing-data';

export default function FoundingCampaignPage() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif", lineHeight: '1.6', color: '#333' }}>
      {/* Alert Banner */}
      <div style={{ background: '#ff6b6b', color: 'white', textAlign: 'center', padding: '15px', fontWeight: '600', fontSize: '1.1em' }}>
        ⚠️ FOUNDING MEMBERSHIPS CLOSING SOON - 1,185 Lifetime Spots Only
      </div>

      {/* Header */}
      <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '3em', marginBottom: '20px', fontWeight: '700' }}>KDP Creator Suite</h1>
          <p style={{ fontSize: '1.4em', marginBottom: '30px', opacity: 0.95 }}>The All-in-One Platform for Amazon KDP Self-Publishers</p>
          <p style={{ fontSize: '1.2em', margin: '20px 0' }}>Replace 5-8 tools you&apos;re paying $100-300/month for. Pay once. Use forever.</p>
          
          <div style={{ marginTop: '30px' }}>
            <a
              href="https://dashboard.kdpsuite.com"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1em',
                transition: 'all 0.3s ease',
                border: '2px solid white',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'white';
                (e.currentTarget as HTMLElement).style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
            >
              Access Dashboard
            </a>
          </div>

          {/* Hero Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2.5em', fontWeight: 'bold', display: 'block' }}>1,185</span>
              <span style={{ fontSize: '0.9em', opacity: 0.9 }}>Lifetime Spots Total</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2.5em', fontWeight: 'bold', display: 'block' }}>$99</span>
              <span style={{ fontSize: '0.9em', opacity: 0.9 }}>Starting Price (300 spots)</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2.5em', fontWeight: 'bold', display: 'block' }}>94-96%</span>
              <span style={{ fontSize: '0.9em', opacity: 0.9 }}>Lifetime Savings</span>
            </div>
          </div>
        </div>
      </header>

      {/* Story Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>Built From Nothing</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15em', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '20px' }}>I built KDP Creator Suite over <strong style={{ color: '#667eea' }}>8 months using library WiFi while homeless</strong>. Zero budget. No cloud credits. No startup funding. Just me, a laptop, and a determination to solve a problem I lived every day.</p>

            <p style={{ marginBottom: '20px' }}>As a KDP creator, I was paying over $180/month for tools: Canva Pro, Book Bolt, Creative Fabrica, formatting software, royalty calculators. That&apos;s <strong style={{ color: '#667eea' }}>$2,160 per year</strong> just to publish coloring books and journals.</p>

            <p style={{ marginBottom: '20px' }}>I couldn&apos;t afford it. So I built something better.</p>

            <p style={{ marginBottom: '20px' }}>This platform consolidates everything you need into one place. AI coloring book conversion, 500+ templates, smart formatting, batch processing, royalty calculations—all the tools you&apos;re currently overpaying for, in a single platform.</p>

            <p style={{ marginBottom: '20px' }}><strong style={{ color: '#667eea' }}>Now I&apos;m launching with lifetime founding memberships.</strong> Pay once during this campaign, use it forever. No recurring fees. No subscription treadmill. Just permanent access as a founding member.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>Everything You Need In One Platform</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
            {[
              { title: '🎨 AI Coloring Book Converter', desc: 'Transform any image into print-ready line art. Upload a photo, get publication-ready coloring pages in seconds. No manual tracing. No expensive artists.' },
              { title: '📚 500+ KDP-Compliant Templates', desc: 'Journals, planners, coloring books, activity books, and more. Every template is pre-formatted for Amazon KDP specifications. Just customize and export.' },
              { title: '⚡ Smart Formatting Engine', desc: 'Automatic bleed, trim, and margin calculations. No more rejected uploads. No more manual adjustments. Perfect KDP specs every time.' },
              { title: '🚀 Batch Processing', desc: 'Process multiple books simultaneously. Export dozens of projects in one click. Built for high-volume publishers who need speed.' },
              { title: '💰 Royalty Calculator', desc: 'Instant profit projections. Input your pricing, see your royalties across different markets. Make informed decisions before you publish.' },
              { title: '👥 Team Collaboration', desc: 'Share projects with designers, editors, and partners. Team tier includes multi-user workspaces for publishing teams.' },
            ].map((feature, idx) => (
              <div key={idx} style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px', fontSize: '1.5em' }}>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>Founding Member Pricing</h2>
          <p style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
            These are <strong>lifetime memberships</strong>. Pay once during this campaign, never pay again. Once founding spots are sold out, the platform switches to monthly subscriptions forever.
          </p>

          {/* Pricing Tiers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '50px', marginBottom: '50px' }}>
            {foundingCampaignPlans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '40px 30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    position: 'relative',
                    border: '3px solid transparent',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ background: '#667eea', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8em', fontWeight: '600', display: 'inline-block', marginBottom: '15px' }}>
                    {plan.badgeText}
                  </div>

                  <div style={{ fontSize: '1.8em', fontWeight: '700', marginBottom: '10px', color: '#2c3e50' }}>
                    {plan.name}
                  </div>

                  <div style={{ fontSize: '3em', fontWeight: '800', color: '#667eea', marginBottom: '10px' }}>
                    ${plan.price}<small style={{ fontSize: '0.4em', color: '#666', fontWeight: '400' }}>/lifetime</small>
                  </div>

                  <div style={{ color: '#e74c3c', fontWeight: '600', marginBottom: '20px', fontSize: '0.95em' }}>
                    ⚠️ Only {plan.spots} spots
                  </div>

                  <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '20px', margin: '20px 0', color: '#856404', fontWeight: '600' }}>
                    {plan.savings}
                  </div>

                  <ul style={{ listStyle: 'none', margin: '25px 0', textAlign: 'left' }}>
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} style={{ padding: '8px 0', paddingLeft: '25px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '0', color: '#27ae60', fontWeight: 'bold' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.stripePaymentLink || '#'}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '15px 40px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.1em',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    Claim Your Spot
                  </a>
                </div>
              );
            })}
          </div>

          {/* Founder's Circle Special Section */}
          <div style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '50px', borderRadius: '15px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '20px' }}>👑 Founder&apos;s Circle - $9,999</h2>
            <p style={{ fontSize: '1.2em', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.8' }}>
              <strong>Your name on the app splash screen. Forever.</strong>
            </p>
            <p style={{ fontSize: '1.2em', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.8' }}>
              Every user sees your name every time they open the app. Digital immortality. Legacy positioning. Only 10 spots available—ever.
            </p>
            <p style={{ marginBottom: '30px' }}>
              Includes lifetime Enterprise access, monthly advisory calls with founder, direct product roadmap influence, 5% referral revenue share, physical engraved plaque, and more.
            </p>
            <div style={{ color: '#ffeb3b', fontSize: '1.3em', marginBottom: '20px', fontWeight: '600' }}>
              ⚠️ ONLY 10 SPOTS - LIMITED FOREVER
            </div>
            <a
              href={foundingCampaignPlans[3].stripePaymentLink || '#'}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px 50px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3em',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Claim Immortality
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                q: 'When will the platform be ready?',
                a: 'The platform is live! Founding members can access the dashboard immediately and start using core features like the AI Coloring Book Converter and KDP-compliant templates.',
              },
              {
                q: 'What if you shut down?',
                a: 'Even if I shut down after 6 months, you still got more value than paying monthly ($19/month × 6 = $114 vs your $99 one-time). But I&apos;m betting everything on making this work long-term. The platform is already built—this isn&apos;t vaporware.',
              },
              {
                q: 'Why lifetime pricing instead of monthly from day one?',
                a: 'I&apos;m bootstrapped with zero runway. Monthly subscriptions take 12-18 months to generate real cash flow. Lifetime funding gets me capital now to finish strong and launch fast. Backers get rewarded for taking early risk with permanent pricing.',
              },
              {
                q: 'What happens after founding spots sell out?',
                a: 'The platform switches to monthly subscriptions: $19/month (Starter), $49/month (Professional), $99/month (Enterprise). Lifetime access will never be available again. This is your only chance.',
              },
              {
                q: 'Can I upgrade my tier later?',
                a: 'Yes. You can upgrade from Starter to Professional or Enterprise by paying the difference. But you must be a founding member first—once lifetime spots are gone, upgrades won&apos;t be available.',
              },
              {
                q: 'Is this just another Canva clone?',
                a: 'No. Canva is general design. KDP Creator Suite is built specifically for Amazon KDP publishing. We handle print specifications, KDP compliance, batch processing, and publishing workflows that Canva doesn&apos;t touch. Think Canva + Book Bolt + Creative Fabrica combined, optimized for KDP.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ marginBottom: '30px' }}>
                <div style={{ fontSize: '1.3em', fontWeight: '600', color: '#2c3e50', marginBottom: '10px' }}>
                  {item.q}
                </div>
                <div style={{ fontSize: '1.05em', lineHeight: '1.7', color: '#555' }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ color: 'white', fontSize: '2.5em', marginBottom: '30px' }}>Join the Founding Members</h2>
          <p style={{ fontSize: '1.3em', maxWidth: '700px', margin: '0 auto 30px' }}>
            1,185 lifetime spots. Once they&apos;re gone, monthly subscriptions begin. This is your only chance to pay once and own it forever.
          </p>
          <a
            href="#pricing"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '20px 50px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.4em',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Secure Your Lifetime Access
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p>Built with library WiFi and determination. © 2026 KDP Creator Suite. All rights reserved.</p>
          <p style={{ marginTop: '10px', fontSize: '0.9em' }}>Questions? Email: support@kdpsuite.com</p>
        </div>
      </footer>
    </div>
  );
}
