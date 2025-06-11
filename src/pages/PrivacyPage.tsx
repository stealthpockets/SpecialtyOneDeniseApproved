import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, ArrowUp } from 'lucide-react';

/**
 * Specialty One – Privacy Notice page (Version 1.1 – June 11 2025)
 * Updated version with revised data retention and de-identification policies
 */

const PrivacyPage: React.FC = () => {
  const [showTOC, setShowTOC] = useState(false);
  const versionStamp = 'Version 1.1 – June 11 2025';

  const sections = [
    { id: 'section-1', title: '1. Information We Collect' },
    { id: 'section-2', title: '2. How We Use Information' },
    { id: 'section-3', title: '3. Sharing & Disclosure' },
    { id: 'section-4', title: '4. Cookies, Pixels & Similar Tech' },
    { id: 'section-5', title: '5. Your Choices & Rights' },
    { id: 'section-6', title: '6. Security & Retention' },
    { id: 'section-7', title: '7. International Transfers' },
    { id: 'section-8', title: '8. Third-Party Links' },
    { id: 'section-9', title: '9. Changes to This Notice' },
    { id: 'section-10', title: '10. Contact Us' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-sand relative">
      <header className="bg-gradient-to-r from-plum to-amethyst text-white py-16">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Notice</h1>
          <p className="text-xl opacity-90">Last Updated: June 11, 2025</p>
          <p className="text-sm opacity-70">{versionStamp}</p>
        </div>
      </header>

      <main className="container-custom py-12 max-w-4xl mx-auto">
        {/* Table of Contents */}
        <div className="bg-sand rounded-lg shadow-lg p-6 mb-8">
          <button onClick={() => setShowTOC(!showTOC)} className="w-full flex justify-between items-center text-left">
            <h2 className="text-2xl font-bold text-obsidian">Table of Contents</h2>
            {showTOC ? <ChevronUp className="text-plum" /> : <ChevronDown className="text-plum" />}
          </button>
          {showTOC && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map(({ id, title }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-sm p-2 rounded text-obsidian hover:text-plum hover:bg-gray-50 transition-colors"
                >
                  {title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Content */}
        <div className="bg-sand rounded-lg shadow-lg p-8 space-y-12">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              Warner Brokerage LLC d/b/a <strong>Specialty One</strong> ("Specialty One," "we," "us," or "our") respects your privacy and is committed to protecting it. This Notice explains how we collect, use, disclose, and safeguard information when you interact with our websites, portals, apps, or other services (collectively, the <strong>"Services"</strong>).
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using the Services, you agree to this Notice and to our <a href="/terms" className="text-plum hover:underline">Terms of Service</a>.
            </p>
          </section>

          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-2xl font-bold text-obsidian mb-4">1. Information We Collect</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Examples</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Identifiers</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Name, email, phone, mailing address, government ID, IP, cookie IDs</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">You, browsers, third-party sources</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Commercial Data</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Properties viewed, offers, transaction history, financing needs</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">You, MLS feeds, public filings</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Internet / Device Data</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Log files, device type, browser, referrer, session timestamps</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Your device, cookies, pixels</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Geolocation</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Approximate (IP) or precise (mobile GPS if enabled)</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Your device</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Professional Data</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Brokerage license #, employer, title, accreditation status, LinkedIn</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">You, licensing boards, data vendors</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Communications</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Email, text transcripts, call recordings, chatbot logs</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">You, telecom providers</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>On-Site & CCTV</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Visitor sign-in data, security-camera footage at listed properties</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Our cameras, check-in kiosks</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>Inferred / Profile Data</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Lead scores, "look-alike" segments, investment propensity, device graph</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Our analytics & AI models</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We do <strong>not</strong> knowingly collect data from children under 18.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-2xl font-bold text-obsidian mb-4">2. How We Use Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use information <strong>for legitimate real-estate business purposes</strong>, including to:
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Provide & operate</strong> the Services, portals, data rooms, e-signature flows, and transaction support.</li>
              <li><strong>Verify identity / licensure</strong> and comply with KYC/AML rules.</li>
              <li><strong>Communicate</strong> (email, SMS, phone, chat) about listings, market reports, events, and offers—you can opt out of marketing.</li>
              <li><strong>Personalize & improve</strong> our sites, <strong>match you with relevant properties, investors, or service providers</strong>, and serve tailored content or ads.</li>
              <li><strong>Develop new products & services</strong>, <strong>train and fine-tune internal AI/ML models</strong>, perform market research, and generate statistics.</li>
              <li><strong>Detect, prevent, and enforce against</strong> fraud, misuse, security incidents, and other harmful activity.</li>
              <li><strong>Comply with law</strong> and protect our rights, privacy, safety, or property.</li>
            </ol>

            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-4">Additional specific uses</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Audience Expansion & Look-Alike Marketing</strong> – We may hash contact identifiers and share them with advertising platforms to create look-alike audiences that help us reach people with similar investment profiles.</li>
              <li><strong>Automatic Data Enrichment</strong> – We may append your profile with demographic, firmographic, or geospatial attributes from licensed data providers to improve deal matching.</li>
              <li><strong>Automated Decision-Making</strong> – Certain eligibility, match-scoring, or fraud-detection decisions may be automated; where required by law you may request human review.</li>
              <li><strong>Anonymized Statistics & Testimonials</strong> – With your consent, we may use anonymized deal metrics or quotes in marketing materials.</li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-plum p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>We may aggregate or de-identify data, but we are not obligated to do so and may retain identifiable data for any lawful business purpose, including historical record-keeping, analytics, audit trail, or AI model training.</strong>
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              We aggregate or de-identify data whenever possible; aggregated data is no longer "personal information."
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-2xl font-bold text-obsidian mb-4">3. Sharing & Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We <strong>do not sell</strong> personal information for monetary consideration. We may share it:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Service providers & processors</strong> – cloud hosting, CRM, marketing, analytics, AI infrastructure, telecom; all bound by confidentiality.</li>
              <li><strong>Transaction counterparties</strong> – buyers, sellers, lenders, escrow agents, and their advisors when you engage in a deal.</li>
              <li><strong>Affiliates & Joint-Venture Partners</strong> – entities under common ownership <strong>or formal co-listing/JV partners</strong> that are contractually required to honor this Notice.</li>
              <li><strong>Advertising platforms</strong> – for hashed, pseudonymous audience-building as described above.</li>
              <li><strong>Legal & compliance</strong> – regulators, courts, law enforcement, or professional boards where required or to protect rights.</li>
              <li><strong>Business transfers</strong> – as part of a merger, acquisition, or asset sale (successor must honor this Notice).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We prohibit third-party ad networks from using our first-party data to build their own profiles.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-2xl font-bold text-obsidian mb-4">4. Cookies, Pixels & Similar Tech</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies, local storage, device identifiers, and pixels to:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>keep you logged in;</li>
              <li>remember preferences;</li>
              <li>measure email/advertising performance;</li>
              <li>build analytic and look-alike audiences;</li>
              <li><strong>link usage across browsers & devices</strong> for a unified view.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can disable cookies in your browser, but some features may break.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-2xl font-bold text-obsidian mb-4">5. Your Choices & Rights</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Jurisdiction</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Rights</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>California (CCPA/CPRA)</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Know/access, delete, correct, limit sensitive data, opt out of "sharing," no retaliation. Request via <a href="mailto:privacy@specialtyone.com" className="text-plum hover:underline">privacy@specialtyone.com</a> or 602-730-9967.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>EEA / UK (GDPR)</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Access, rectify, erase, restrict, portability, object, automated decision-making review, lodge a complaint. Legal bases: contract, legitimate interest, consent, legal obligation.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>Marketing Opt-Out</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Click "unsubscribe" or reply STOP to SMS. Transactional messages may still occur.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>Cookies Opt-Out</strong></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Browser/device settings; industry opt-out tools; GPC signal honored.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-2xl font-bold text-obsidian mb-4">6. Security & Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We apply encryption, least-privilege access, network segmentation, regular audits, and incident-response plans. No system is 100% secure.
            </p>
            <div className="bg-gray-50 border-l-4 border-plum p-4">
              <h3 className="text-lg font-semibold text-obsidian mb-2">Retention Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>We keep personal information as long as it serves a legitimate business purpose</strong> (including legal, accounting, archival, AI-model-training, or compliance purposes) or as required by law. When information is no longer needed, we may choose to delete it, anonymize it, or retain it in secure archival form at our discretion.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-2xl font-bold text-obsidian mb-4">7. International Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Data may be processed in the U.S. or other jurisdictions. We rely on Standard Contractual Clauses or equivalent safeguards for cross-border transfers.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2 className="text-2xl font-bold text-obsidian mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Services may link to third-party sites (e.g., lender portals). Their privacy practices are independent; review their notices.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2 className="text-2xl font-bold text-obsidian mb-4">9. Changes to This Notice</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Notice at any time. Material changes will appear here with a new "Last Updated" date. Continued use of the Services after a change means you accept the revised Notice.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2 className="text-2xl font-bold text-obsidian mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Warner Brokerage LLC d/b/a Specialty One</strong><br />
              950 E. Mission Drive, Tempe, AZ 85283 USA<br />
              Email: <a href="mailto:privacy@specialtyone.com" className="text-plum hover:underline">privacy@specialtyone.com</a><br />
              Phone: 602-730-9967
            </p>
            <p className="text-gray-700 leading-relaxed">
              Residents of the EEA/UK may raise unresolved concerns with their local data-protection authority; U.S. residents may contact their state attorney general.
            </p>
          </section>

          {/* Key Changes Summary */}
          <section id="key-changes">
            <h2 className="text-2xl font-bold text-obsidian mb-4">Key Changes Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Section</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">Old Text</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-obsidian">New Text</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">§2 final paragraph</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">"We aggregate or de-identify data whenever possible…"</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>Removed obligation; now optional.</strong></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">§6 retention</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">"We retain… then we delete or de-identify it."</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700"><strong>Now: keep as long as any lawful business purpose exists; deletion/anonymization optional.</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4 text-sm">
              This gives you maximum flexibility while still meeting disclosure duties under CCPA/CPRA ("business purpose" exception) and GDPR's "legitimate interests" basis (provided you honour access/erasure requests when legally required).
            </p>
          </section>
        </div>

        <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-plum hover:bg-amethyst text-white p-3 rounded-full shadow-lg" aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      </main>

      <footer className="text-center text-gray-500 text-sm py-6">© 2025 Warner Brokerage LLC. All rights reserved.</footer>
    </div>
  );
};

export default PrivacyPage;
