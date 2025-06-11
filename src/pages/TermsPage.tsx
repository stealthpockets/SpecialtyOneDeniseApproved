import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, ArrowUp } from 'lucide-react';

/**
 * Specialty One – Terms of Service page (Version 1.0 – June 11 2025)
 * Auto-generated full-length file: all 35 sections are embedded as static JSX so
 * the page works without external fetches. Tokens were collapsed where safe
 * (paragraphs not split) to keep file size reasonable.
 */

const TermsPage: React.FC = () => {
  const [showTOC, setShowTOC] = useState(false);
  const versionStamp = 'v1.0 – June 11 2025';

  const sections = [
    { id: 'section-1', title: '1. Acceptance of These Terms' },
    { id: 'section-2', title: '2. Modifications' },
    { id: 'section-3', title: '3. Definitions' },
    { id: 'section-4', title: '4. Scope of Services' },
    { id: 'section-5', title: '5. Eligibility & Broker-of-Record Representations' },
    { id: 'section-6', title: '6. Permitted & Prohibited Uses' },
    { id: 'section-7', title: '7. User Content & License Grants' },
    { id: 'section-8', title: '8. Intellectual Property Ownership' },
    { id: 'section-9', title: '9. Security & Passcodes' },
    { id: 'section-10', title: '10. Third-Party Links & Tools' },
    { id: 'section-11', title: '11. Privacy' },
    { id: 'section-12', title: '12. DMCA Copyright Policy' },
    { id: 'section-13', title: '13. Disclaimers' },
    { id: 'section-14', title: '14. Limitation of Liability' },
    { id: 'section-15', title: '15. Indemnification' },
    { id: 'section-16', title: '16. Termination' },
    { id: 'section-17', title: '17. Governing Law & Dispute Resolution' },
    { id: 'section-18', title: '18. Export & Sanctions Compliance' },
    { id: 'section-19', title: '19. Force Majeure' },
    { id: 'section-20', title: '20. Consent to Automated Telephonic Communications' },
    { id: 'section-21', title: '21. Electronic Signatures & Records (E-SIGN Act Consent)' },
    { id: 'section-22', title: '22. Investment & Forward-Looking Statement Disclaimer' },
    { id: 'section-23', title: '23. Equal Housing & Non-Discrimination' },
    { id: 'section-24', title: '24. KYC / AML & OFAC Compliance' },
    { id: 'section-25', title: '25. Accessibility' },
    { id: 'section-26', title: '26. Beta / Experimental Features' },
    { id: 'section-27', title: '27. API & Data-Feed Terms (Effective When Offered)' },
    { id: 'section-28', title: '28. Feedback & Suggestions License' },
    { id: 'section-29', title: '29. California Privacy Rights (CCPA/CPRA)' },
    { id: 'section-30', title: '30. Data Security & Breach Notification' },
    { id: 'section-31', title: '31. Subscription & Recurring Billing (Effective When Offered)' },
    { id: 'section-32', title: '32. Mobile App Store Pass-Through Terms (Effective When Offered)' },
    { id: 'section-33', title: '33. Website Auditing & Monitoring' },
    { id: 'section-34', title: '34. Account Registration, Accuracy of Information & Fraudulent Access' },
    { id: 'section-35', title: '35. Entire Agreement; Order of Precedence' },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
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

        {/* Terms Content */}
        <div className="bg-sand rounded-lg shadow-lg p-8 space-y-12">
          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-2xl font-bold text-obsidian mb-4">1. Acceptance of These Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using any website, web application, client portal, data room, email service, AI tool, or other online product operated by Warner Brokerage LLC d/b/a “Specialty One” (collectively, the “Site”), you:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                (a) affirm that you are at least 18 years old and have full power and authority to enter into a binding contract;
              </li>
              <li>
                (b) agree to be legally bound by these Terms of Service (“Terms”) and Specialty One’s <a href="https://specialtyone.com/privacy" className="text-plum hover:underline">Privacy Notice</a> (available at https://specialtyone.com/privacy); and
              </li>
              <li>
                (c) acknowledge that your sole remedy for dissatisfaction with the Site or any content or service available through it is to stop using the Site.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you are entering into this Agreement on behalf of an entity, you represent that you have authority to bind that entity.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-2xl font-bold text-obsidian mb-4">2. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One may amend these Terms at any time by posting revised Terms on the Site. Continued use of the Site after any changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-2xl font-bold text-obsidian mb-4">3. Definitions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Capitalized terms used but not defined elsewhere have the meanings below:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>“Brokerage Services”</strong>: Commercial real estate brokerage and advisory services relating to manufactured-housing communities, RV parks, and self-storage assets.
              </li>
              <li>
                <strong>“Content”</strong>: All text, data, images, reports, analyses, video, software, and other materials made available via the Site.
              </li>
              <li>
                <strong>“User Content”</strong>: Any information, documents, data, or other materials you upload, post, transmit, or otherwise make available through the Site (e.g., documents in a deal room).
              </li>
              <li>
                <strong>“Passcode-Protected Areas”</strong>: Portions of the Site that require login credentials to access.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-2xl font-bold text-obsidian mb-4">4. Scope of Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One currently provides Brokerage Services. Future functionality may include listing platforms, data analytics, AI-powered tools, document-management features, and subscription services; any such features will be governed by these Terms at launch.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-2xl font-bold text-obsidian mb-4">5. Eligibility & Broker-of-Record Representations</h2>
            <p className="text-gray-700 leading-relaxed">
              Any person who represents themselves on the Site as a licensed real estate broker or agent warrants that they are validly licensed and in compliance with all applicable laws in every jurisdiction where such licensure is required. Specialty One may, but is not obligated to, verify licensure.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-2xl font-bold text-obsidian mb-4">6. Permitted & Prohibited Uses</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">6.1 Permitted Uses</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use non-restricted portions of the Site for internal research, marketing a limited number of specific properties, and preparing client materials, provided you:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(i) do not distribute building-specific data broadly;</li>
              <li>(ii) always credit Specialty One as the source; and</li>
              <li>(iii) limit distribution to a discrete set of recipients.</li>
            </ul>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">6.2 Prohibited Uses</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You must not:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) violate any law or regulation, including real estate practice or securities laws;</li>
              <li>(b) upload malicious code or attempt to gain unauthorized access to any network or system;</li>
              <li>(c) infringe any third-party intellectual property right;</li>
              <li>(d) impersonate any person or misstate your affiliation;</li>
              <li>(e) use any scraping, data-mining, or similar extraction tools without Specialty One’s written consent;</li>
              <li>(f) use the Site to create, directly or indirectly, any database or product competitive with Specialty One;</li>
              <li>(g) access or use the Site if you are a direct or indirect competitor of Specialty One.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-2xl font-bold text-obsidian mb-4">7. User Content & License Grants</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">7.1 Ownership and License</h3>
            <p className="text-gray-700 leading-relaxed">
              You retain ownership of User Content but grant Specialty One a worldwide, royalty-free, perpetual, sublicensable license to host, copy, display, and create aggregated, de-identified analyses from it. Specialty One will never disclose deal-specific details unless aggregated from at least five leases across at least five different owners and tenants.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">7.2 Representations and Warranties</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You represent and warrant that:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) you have all necessary rights to submit User Content;</li>
              <li>(b) the content does not infringe any third-party rights;</li>
              <li>(c) the content is free of viruses, malware, or other harmful code.</li>
            </ul>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">7.3 Content Moderation</h3>
            <p className="text-gray-700 leading-relaxed">
              Specialty One reserves the right, but has no obligation, to monitor, edit, or remove any User Content that violates these Terms or is otherwise objectionable.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2 className="text-2xl font-bold text-obsidian mb-4">8. Intellectual Property Ownership</h2>
            <p className="text-gray-700 leading-relaxed">
              The Site, its compilations, look-and-feel, and all Content are the exclusive property of Specialty One and its licensors. Nothing in these Terms conveys any right or license to trademarks, service marks, or trade names of Specialty One except as expressly set out herein.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2 className="text-2xl font-bold text-obsidian mb-4">9. Security & Passcodes</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">9.1 Access Restrictions</h3>
            <p className="text-gray-700 leading-relaxed">
              Access to Passcode-Protected Areas is limited to the individual user to whom the credentials are issued. Sharing credentials is strictly prohibited. Unauthorized attempts to defeat security controls may result in termination and referral to law enforcement authorities. Unauthorized credential sharing constitutes material breach and liquidated damages of $10,000 per occurrence—a reasonable pre-estimate of Specialty One’s investigative and containment costs. If a court deems this amount unenforceable, damages shall be awarded up to the maximum permitted by law.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">9.2 User Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your passcodes and for all activities that occur under your account. You agree to notify Specialty One immediately at <a href="mailto:legal@specialtyone.com" className="text-plum hover:underline">legal@specialtyone.com</a> of any unauthorized use of your account or any other breach of security.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2 className="text-2xl font-bold text-obsidian mb-4">10. Third-Party Links & Tools</h2>
            <p className="text-gray-700 leading-relaxed">
              The Site may contain links to third-party sites or integrate third-party tools (e.g., e-signature, video hosting). Specialty One is not responsible for, and makes no endorsements regarding, third-party content or services.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <h2 className="text-2xl font-bold text-obsidian mb-4">11. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Use of the Site is subject to Specialty One’s <a href="https://specialtyone.com/privacy" className="text-plum hover:underline">Privacy Notice</a> (available at https://specialtyone.com/privacy), incorporated herein by reference. Specialty One may send you transactional or marketing communications, and you may opt out of marketing messages as required by law. If you are located in the EEA or UK, you may have additional rights under the GDPR; see our Privacy Notice for details.
            </p>
          </section>

          {/* Section 12 */}
          <section id="section-12">
            <h2 className="text-2xl font-bold text-obsidian mb-4">12. DMCA Copyright Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you believe material on the Site infringes your copyright, send a DMCA notice to:
            </p>
            <p className="text-gray-700 leading-relaxed">
              DMCA Agent<br />
              Specialty One (Warner Brokerage LLC)<br />
              950 E. Mission Drive<br />
              Tempe, AZ 85283, USA<br />
              Email: <a href="mailto:dmca@specialtyone.com" className="text-plum hover:underline">dmca@specialtyone.com</a>
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The notice must comply with 17 U.S.C. § 512(c)(3). If you believe your material was removed in error, you may submit a counter-notice under 17 U.S.C. § 512(g)(3), including:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) your physical or electronic signature;</li>
              <li>(b) identification of the removed material and its prior location;</li>
              <li>(c) contact information;</li>
              <li>(d) a statement under penalty of perjury that the material was removed by mistake; and</li>
              <li>(e) consent to jurisdiction in the federal district court where you are located.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Mail counter-notices to the DMCA Agent address above.
            </p>
          </section>

          {/* Section 13 */}
          <section id="section-13">
            <h2 className="text-2xl font-bold text-obsidian mb-4">13. Disclaimers</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">13.1 General Disclaimer</h3>
            <p className="text-gray-700 leading-relaxed">
              ALL CONTENT AND SERVICES ARE PROVIDED “AS IS,” “WITH ALL FAULTS,” AND “AS AVAILABLE.” SPECIALTY ONE DISCLAIMS ALL WARRANTIES—EXPRESS, IMPLIED, OR STATUTORY—INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AND UNINTERRUPTED SERVICE. Reliance on any Content is at your own risk; you are encouraged to conduct independent due diligence on any property and to obtain professional advice. Specialty One does not warrant that files available for download will be free of viruses or destructive code; you are responsible for implementing appropriate safeguards. Any AI-generated insights are experimental, may contain errors, and must not be relied on without independent verification.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">13.2 No Agency or Fiduciary Relationship</h3>
            <p className="text-gray-700 leading-relaxed">
              Use of the Site does not create a brokerage, agency, or fiduciary relationship unless a written agreement is executed. Content on the Site does not constitute legal, tax, investment, or financial advice.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">13.3 Third-Party Transactions</h3>
            <p className="text-gray-700 leading-relaxed">
              Specialty One is not a party to any transactions between users and third parties facilitated through the Site. Any disputes arising from such transactions are solely between the parties involved, and Specialty One shall have no liability.
            </p>
          </section>

          {/* Section 14 */}
          <section id="section-14">
            <h2 className="text-2xl font-bold text-obsidian mb-4">14. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPECIALTY ONE AND ITS AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, OR LOST PROFITS, ARISING FROM OR RELATED TO THE SITE OR THESE TERMS, INCLUDING FAULTS, INTERRUPTIONS, DELAYS, INACCURACIES, ERRORS, OR OMISSIONS, EVEN IF ADVISED OF THE POSSIBILITY. Aggregate liability will not exceed the greater of: (a) fees you paid to Specialty One in the twelve (12) months preceding the claim or (b) US $100. No action related to the Site may be brought more than one (1) year after the cause of action accrues. This limitation expressly applies to claims arising from AI-generated content or analytics.
            </p>
          </section>

          {/* Section 15 */}
          <section id="section-15">
            <h2 className="text-2xl font-bold text-obsidian mb-4">15. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Specialty One, its affiliates, and their respective officers, directors, employees, and agents from any third-party claim, loss, or expense (including reasonable attorneys’ fees) arising out of or related to: (i) your User Content; (ii) your breach of these Terms; or (iii) your negligence or willful misconduct.
            </p>
          </section>

          {/* Section 16 */}
          <section id="section-16">
            <h2 className="text-2xl font-bold text-obsidian mb-4">16. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One may suspend or terminate your access to all or part of the Site at any time, with or without notice, for any reason. Upon termination, your license to use the Site ends immediately, but provisions regarding intellectual property ownership, feedback, telephonic consent, warranties, limitations of liability, indemnification, governing law, and other obligations that by their nature should survive will continue in effect. Sections 8, 9, 13-15, 17-35 survive any termination or expiration of these Terms.
            </p>
          </section>

          {/* Section 17 */}
          <section id="section-17">
            <h2 className="text-2xl font-bold text-obsidian mb-4">17. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Agreement is governed by the laws of the State of Arizona, without regard to conflict-of-laws principles. Exclusive venue lies in the state and federal courts located in Maricopa County, Arizona, and you consent to personal jurisdiction there. The court-venue clause applies only to (i) entry of judgment on an arbitral award and (ii) claims expressly carved out of arbitration. EACH PARTY WAIVES THE RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN ANY CLASS OR COLLECTIVE ACTION.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">17.1 Arbitration Clause</h3>
            <p className="text-gray-700 leading-relaxed">
              Except for claims seeking injunctive relief for IP misuse or non-payment, all disputes arising under these Terms shall be resolved by binding arbitration administered by JAMS in Phoenix, Arizona, under its Comprehensive Rules. Judgment on the award may be entered in any court of competent jurisdiction. You may opt out of this arbitration agreement by emailing <a href="mailto:arbitration-optout@specialtyone.com" className="text-plum hover:underline">arbitration-optout@specialtyone.com</a> within 30 days of first accepting these Terms. Either party may also pursue an eligible claim in small-claims court in Maricopa County, Arizona.
            </p>
          </section>

          {/* Section 18 */}
          <section id="section-18">
            <h2 className="text-2xl font-bold text-obsidian mb-4">18. Export & Sanctions Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to comply with all applicable U.S. export control laws and regulations and shall not export or re-export any portion of the Site in violation of such laws.
            </p>
          </section>

          {/* Section 19 */}
          <section id="section-19">
            <h2 className="text-2xl font-bold text-obsidian mb-4">19. Force Majeure</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One will not be liable for any failure or delay due to causes beyond its reasonable control, including acts of God, war, terrorism, pandemics, labor disputes, or failures of utilities or communications.
            </p>
          </section>

          {/* Section 20 */}
          <section id="section-20">
            <h2 className="text-2xl font-bold text-obsidian mb-4">20. Consent to Automated Telephonic Communications</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.1 Affirmative Consent</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By providing a wireless or landline telephone number to Specialty One, or clicking any button labeled “Submit,” “I Agree,” “Get Updates,” or similar, you expressly consent to receive:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) SMS and MMS text messages;</li>
              <li>(b) prerecorded or artificial-voice calls;</li>
              <li>(c) ringless voicemail drops; and</li>
              <li>(d) calls or messages via automatic telephone dialing systems,</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              at the provided number(s) for transactional, informational, marketing, or promotional purposes related to Specialty One’s services.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.2 No Purchase Required</h3>
            <p className="text-gray-700 leading-relaxed">
              Consent is not a condition of purchase or receiving Brokerage Services.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.3 Opt-Out</h3>
            <p className="text-gray-700 leading-relaxed">
              You may revoke consent by replying STOP to any text or emailing <a href="mailto:legal@specialtyone.com" className="text-plum hover:underline">legal@specialtyone.com</a> with “Opt Out” and the telephone number to be removed.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.4 Carrier & Data Charges</h3>
            <p className="text-gray-700 leading-relaxed">
              Message and data rates may apply. You are responsible for any fees imposed by your service provider.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.5 Message Frequency</h3>
            <p className="text-gray-700 leading-relaxed">
              Message frequency varies but will comply with applicable law.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.6 Record-Keeping</h3>
            <p className="text-gray-700 leading-relaxed">
              Specialty One maintains electronic logs evidencing each consumer’s express consent.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.7 Indemnity</h3>
            <p className="text-gray-700 leading-relaxed">
              You will indemnify Specialty One for claims arising from your provision of a number you do not own or control.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.8 Reassigned Numbers Safe Harbor</h3>
            <p className="text-gray-700 leading-relaxed">
              Specialty One reasonably relies on the consent provided until you notify us the number is reassigned.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">20.9 Survival</h3>
            <p className="text-gray-700 leading-relaxed">
              Consent survives termination of these Terms until revoked.
            </p>
          </section>

          {/* Section 21 */}
          <section id="section-21">
            <h2 className="text-2xl font-bold text-obsidian mb-4">21. Electronic Signatures & Records (E-SIGN Act Consent)</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">21.1 Consent</h3>
            <p className="text-gray-700 leading-relaxed">
              You agree that electronic signatures, click-wrap consents, and electronic records are legally binding.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">21.2 Record Retention</h3>
            <p className="text-gray-700 leading-relaxed">
              You may download copies; Specialty One may retain electronic master copies.
            </p>
          </section>

          {/* Section 22 */}
          <section id="section-22">
            <h2 className="text-2xl font-bold text-obsidian mb-4">22. Investment & Forward-Looking Statement Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Past performance is not indicative of future results. Projections are forward-looking and inherently uncertain; reliance is at your own risk.
            </p>
          </section>

          {/* Section 23 */}
          <section id="section-23">
            <h2 className="text-2xl font-bold text-obsidian mb-4">23. Equal Housing & Non-Discrimination</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One complies with the Fair Housing Act (42 U.S.C. §3601 et seq.), the Americans with Disabilities Act, and all applicable state laws. <strong>We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.</strong> No discriminatory practices are tolerated.
            </p>
          </section>

          {/* Section 24 */}
          <section id="section-24">
            <h2 className="text-2xl font-bold text-obsidian mb-4">24. KYC / AML & OFAC Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One may screen users against U.S. Treasury Office of Foreign Assets Control (“OFAC”) lists or request identifying information to satisfy know-your-customer (“KYC”) or anti-money-laundering (“AML”) obligations. Services may be withheld or terminated for compliance reasons.
            </p>
          </section>

          {/* Section 25 */}
          <section id="section-25">
            <h2 className="text-2xl font-bold text-obsidian mb-4">25. Accessibility</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One strives to conform to WCAG 2.1 AA accessibility standards and provides an accessibility coordinator reachable at <a href="mailto:accessibility@specialtyone.com" className="text-plum hover:underline">accessibility@specialtyone.com</a> or Phone: +1 602-730-9967 (ask for Accessibility Coordinator).
            </p>
          </section>

          {/* Section 26 */}
          <section id="section-26">
            <h2 className="text-2xl font-bold text-obsidian mb-4">26. Beta / Experimental Features</h2>
            <p className="text-gray-700 leading-relaxed">
              Features labeled “Beta” are provided AS IS, may be modified or discontinued, and have no uptime guarantee. Your sole remedy for dissatisfaction with Beta features is to stop using them.
            </p>
          </section>

          {/* Section 27 */}
          <section id="section-27">
            <h2 className="text-2xl font-bold text-obsidian mb-4">27. API & Data-Feed Terms (Effective When Offered)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If Specialty One offers an application-programming interface (“API”) or data feed:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) access requires a separate API key agreement;</li>
              <li>(b) you must comply with rate limits and security rules;</li>
              <li>(c) resale, sublicensing, or creation of derivative databases is prohibited without written consent; and</li>
              <li>(d) Specialty One may suspend or revoke keys for misuse or security concerns.</li>
            </ul>
          </section>

          {/* Section 28 */}
          <section id="section-28">
            <h2 className="text-2xl font-bold text-obsidian mb-4">28. Feedback & Suggestions License</h2>
            <p className="text-gray-700 leading-relaxed">
              Any feedback, ideas, or suggestions you provide grants Specialty One a perpetual, worldwide, royalty-free, irrevocable license to use, modify, and commercialize without compensation.
            </p>
          </section>

          {/* Section 29 */}
          <section id="section-29">
            <h2 className="text-2xl font-bold text-obsidian mb-4">29. California Privacy Rights (CCPA/CPRA)</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are a California resident, you have the rights to know, delete, correct, and opt out of certain data uses, as detailed in our <a href="https://specialtyone.com/privacy" className="text-plum hover:underline">Privacy Notice</a> (available at https://specialtyone.com/privacy).
            </p>
          </section>

          {/* Section 30 */}
          <section id="section-30">
            <h2 className="text-2xl font-bold text-obsidian mb-4">30. Data Security & Breach Notification</h2>
            <p className="text-gray-700 leading-relaxed">
              Specialty One employs commercially reasonable administrative, technical, and physical safeguards. In case of a “security breach” (as defined by applicable state law), we will notify affected individuals without unreasonable delay, except where delayed by law enforcement, in accordance with governing law.
            </p>
          </section>

          {/* Section 31 */}
          <section id="section-31">
            <h2 className="text-2xl font-bold text-obsidian mb-4">31. Subscription & Recurring Billing (Effective When Offered)</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">31.1 Auto-Renewal</h3>
            <p className="text-gray-700 leading-relaxed">
              Subscriptions automatically renew for successive periods unless cancelled before the then-current term ends.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">31.2 Price Changes</h3>
            <p className="text-gray-700 leading-relaxed">
              We will provide at least 30 days’ notice of price increases; continued use after the notice period constitutes acceptance.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">31.3 Cancellation & Refunds</h3>
            <p className="text-gray-700 leading-relaxed">
              You may cancel at any time; refunds, if any, will follow the refund policy in the subscription order form.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">31.4 California Auto-Renew Disclosures</h3>
            <p className="text-gray-700 leading-relaxed">
              For consumers residing in California, renewal terms are presented in a clear and conspicuous manner, an email reminder is sent 3–45 days before renewal for terms of one year or longer, and you may cancel online at <a href="https://specialtyone.com/cancel" className="text-plum hover:underline">https://specialtyone.com/cancel</a> in two clicks or fewer.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">31.5 No Service-Level Agreement</h3>
            <p className="text-gray-700 leading-relaxed">
              We offer no service-level agreement unless specified in a separate order form. Credits are your sole remedy for downtime.
            </p>
          </section>

          {/* Section 32 */}
          <section id="section-32">
            <h2 className="text-2xl font-bold text-obsidian mb-4">32. Mobile App Store Pass-Through Terms (Effective When Offered)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use of any future iOS or Android application is also governed by:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) Apple Media Services Terms & Conditions §9(b);</li>
              <li>(b) Google Play Terms of Service §4;</li>
              <li>(c) any other distribution-platform terms, all incorporated by reference.</li>
            </ul>
          </section>

          {/* Section 33 */}
          <section id="section-33">
            <h2 className="text-2xl font-bold text-obsidian mb-4">33. Website Auditing & Monitoring</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Specialty One reserves the right to audit and monitor (manually or through automated means) use of the Site to ensure compliance with these Terms, improve functionality, and protect against misuse. We may access, preserve, and disclose information about your use if required by law or reasonably necessary to:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) comply with legal process;</li>
              <li>(b) enforce these Terms;</li>
              <li>(c) respond to claims;</li>
              <li>(d) provide customer service; or</li>
              <li>(e) protect the rights, property, or safety of Specialty One, its users, or the public.</li>
            </ul>
          </section>

          {/* Section 34 */}
          <section id="section-34">
            <h2 className="text-2xl font-bold text-obsidian mb-4">34. Account Registration, Accuracy of Information & Fraudulent Access</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">34.1 Truthful Information Required</h3>
            <p className="text-gray-700 leading-relaxed">
              When you create an account, request gated materials (e.g., offering memoranda, rent rolls, or financial statements), or otherwise furnish information through the Site, you represent and warrant that all information you provide is true, accurate, current, and complete. You must promptly update any information that becomes inaccurate.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">34.2 No Impersonation or Misrepresentation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You may not:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) register using a false identity, alias, or contact details;</li>
              <li>(b) use another person’s or entity’s license, credentials, or email without authorization;</li>
              <li>(c) misstate your investor qualifications, intent, or purchasing power to obtain proprietary deal information; or</li>
              <li>(d) otherwise gain access to listings, documents, or analytics under false pretenses.</li>
            </ul>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">34.3 Verification & Audit Rights</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Specialty One reserves the right, but not the obligation, to:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) require documentary proof of identity, licensure, or accredited-investor status;</li>
              <li>(b) cross-check provided information against public or proprietary databases; and</li>
              <li>(c) audit usage logs to detect credential sharing or unusual download activity.</li>
            </ul>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">34.4 Remedies for Breach</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Providing false or misleading information constitutes a material breach of these Terms. Specialty One may:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(i) suspend or terminate your account and access credentials;</li>
              <li>(ii) revoke access to documents or data rooms;</li>
              <li>(iii) report unlawful conduct to regulatory authorities, professional licensing boards, or law enforcement; and</li>
              <li>(iv) pursue legal and equitable remedies, including injunctive relief, damages, and recovery of attorneys’ fees.</li>
            </ul>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">34.5 Survival</h3>
            <p className="text-gray-700 leading-relaxed">
              These obligations survive termination of these Terms.
            </p>
          </section>

          {/* Section 35 */}
          <section id="section-35">
            <h2 className="text-2xl font-bold text-obsidian mb-4">35. Entire Agreement; Order of Precedence</h2>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">35.1 Entire Agreement</h3>
            <p className="text-gray-700 leading-relaxed">
              These Terms, the <a href="https://specialtyone.com/privacy" className="text-plum hover:underline">Privacy Notice</a> (available at https://specialtyone.com/privacy), and any signed brokerage or API agreement constitute the entire agreement between you and Specialty One regarding the Site, superseding all prior agreements on the subject.
            </p>
            <h3 className="text-xl font-semibold text-obsidian mt-6 mb-2">35.2 Hierarchy</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If there is a direct conflict, the following order controls:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>(a) a fully executed brokerage, SaaS, or API agreement;</li>
              <li>(b) any order form or statement of work;</li>
              <li>(c) these Terms;</li>
              <li>(d) the Privacy Notice;</li>
              <li>(e) FAQs, marketing materials, or other ancillary documents.</li>
            </ul>
          </section>

          {/* Notices */}
          <section id="notices">
            <h2 className="text-2xl font-bold text-obsidian mb-4">Notices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Except as otherwise provided, legal notices to Specialty One must be sent by certified mail or recognized courier to:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Warner Brokerage LLC d/b/a Specialty One<br />
              950 E. Mission Drive<br />
              Tempe, AZ 85283 USA<br />
              Email: <a href="mailto:legal@specialtyone.com" className="text-plum hover:underline">legal@specialtyone.com</a>
            </p>
          </section>

          {/* Questions */}
          <section id="questions">
            <h2 className="text-2xl font-bold text-obsidian mb-4">QUESTIONS?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Email us at <a href="mailto:legal@specialtyone.com" className="text-plum hover:underline">legal@specialtyone.com</a> or call 602-730-9967.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By clicking “Accept,” signing electronically, or otherwise continuing to use the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </section>
        </div>

        <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-plum hover:bg-amethyst text-white p-3 rounded-full shadow-lg" aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      </main>

      <footer className="text-center text-gray-500 text-sm py-6">© 2025 Warner Brokerage LLC</footer>
    </div>
  );
};

export default TermsPage;
