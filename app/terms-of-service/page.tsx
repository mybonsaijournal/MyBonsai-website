import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — MyBons.ai',
  description: 'MyBons.ai Terms of Service — Rules governing your use of the MyBons.ai app.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-nav border-b border-beige-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/bonsai.jpeg" alt="MyBons.ai" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-display text-xl font-medium text-charcoal">MyBons.ai</span>
          </Link>
          <Link href="/" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="font-display text-4xl font-medium text-charcoal mb-2">Terms of Service</h1>
        <p className="text-sm text-charcoal-muted mb-10">Last updated: February 6, 2026</p>

        <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal-muted leading-relaxed">
          <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the MyBons.ai mobile application (&ldquo;App&rdquo;) operated by MyBons.ai (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By downloading, installing, or using the App, you agree to be bound by these Terms.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">1. Use of the App</h2>
          <p>MyBons.ai is a personal journaling application with AI-powered reflection features. You must be at least 13 years old to use the App. You are responsible for maintaining the confidentiality of your account credentials.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">2. Subscriptions & Payments</h2>
          <p><strong className="text-charcoal">Free Tier:</strong> Includes up to 3 journal entries per week, 3 AI reflections per week, and access to the first 5 bonsai species.</p>
          <p><strong className="text-charcoal">MyBons.ai Premium:</strong> Available as a monthly ($2.99/month) or annual ($19.99/year) subscription. Premium includes unlimited entries, unlimited AI reflections, full bonsai garden access, unlimited media attachments, and cloud sync.</p>
          <p><strong className="text-charcoal">Free Trial:</strong> New subscribers may be eligible for a 7-day free trial. If you do not cancel before the trial ends, you will be charged for the selected subscription plan.</p>
          <p><strong className="text-charcoal">Auto-Renewal:</strong> Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing period. Your Apple ID account will be charged for renewal within 24 hours prior to the end of the current period.</p>
          <p><strong className="text-charcoal">Cancellation:</strong> You can manage and cancel your subscription at any time through your Apple ID Account Settings. No refunds are provided for partial billing periods.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">3. Physical Products (Bonsai Bands)</h2>
          <p>We may offer physical wristband products (&ldquo;Bonsai Bands&rdquo;) for sale through our website. These are physical goods, not digital content, and are not processed through Apple&apos;s In-App Purchase system. Bonsai Band purchases are subject to separate order terms communicated at the time of purchase.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">4. AI-Generated Content</h2>
          <p>The App uses artificial intelligence to generate reflections, insights, and mantras based on your journal entries. This content is provided for informational and reflective purposes only.</p>
          <p><strong className="text-charcoal">Not Professional Advice:</strong> AI-generated content is not a substitute for professional medical, psychological, therapeutic, or counseling advice. If you are experiencing a mental health crisis, please contact the 988 Suicide & Crisis Lifeline by calling or texting 988.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">5. Your Content</h2>
          <p>You retain ownership of all content you create in the App. By using the App, you grant us a limited license to process your content solely for the purpose of providing App features (e.g., AI reflections, cloud sync).</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">6. Privacy</h2>
          <p>Your use of the App is also governed by our <Link href="/privacy-policy" className="text-sage hover:underline">Privacy Policy</Link>.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">7. Intellectual Property</h2>
          <p>The App, including its design, features, code, content, and branding, is the property of MyBons.ai and is protected by intellectual property laws.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">8. Disclaimers</h2>
          <p>THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND. WE EXPRESSLY DISCLAIM ANY LIABILITY FOR AI-GENERATED CONTENT. THE APP IS NOT A MEDICAL DEVICE.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">9. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MYBONSAI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">10. Termination</h2>
          <p>We may suspend or terminate your access at any time for violation of these Terms.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">11. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. Your continued use after changes constitutes acceptance.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">12. Governing Law</h2>
          <p>These Terms shall be governed by the laws of the United States.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">13. Contact Us</h2>
          <p>Email: <a href="mailto:jtchitla@mybonsaijournal.com" className="text-sage hover:underline">jtchitla@mybonsaijournal.com</a></p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-beige-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-charcoal-muted">
          <span>&copy; 2026 MyBons.ai. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-charcoal transition-colors">Terms of Service</Link>
            <a href="mailto:jtchitla@mybonsaijournal.com" className="hover:text-charcoal transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
