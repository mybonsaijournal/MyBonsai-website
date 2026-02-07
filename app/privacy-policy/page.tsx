import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — MyBons.ai',
  description: 'MyBons.ai Privacy Policy — How we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
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
        <h1 className="font-display text-4xl font-medium text-charcoal mb-2">Privacy Policy</h1>
        <p className="text-sm text-charcoal-muted mb-10">Last updated: February 6, 2026</p>

        <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal-muted leading-relaxed">
          <p>MyBons.ai (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the MyBons.ai mobile application (the &ldquo;App&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">1. Information We Collect</h2>
          <p><strong className="text-charcoal">Personal Information:</strong> When you create an account, we collect your email address for authentication purposes.</p>
          <p><strong className="text-charcoal">Journal Content:</strong> The text, photos, and videos you add to journal entries are stored locally on your device. If you enable cloud sync, this content is stored securely on our servers (Supabase, hosted on AWS).</p>
          <p><strong className="text-charcoal">Usage Data:</strong> We track basic usage metrics such as the number of entries created and features used, solely for enforcing subscription limits and improving the App.</p>
          <p><strong className="text-charcoal">AI Processing:</strong> When you use AI features (reflections, mantras, insights), your journal text is sent to OpenAI&apos;s API for processing. OpenAI does not use this data for training purposes per their API data usage policy.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and maintain the App</li>
            <li>Generate personalized AI reflections and insights</li>
            <li>Authenticate your account and sync data across devices</li>
            <li>Process subscription purchases</li>
            <li>Improve and optimize the App</li>
            <li>Respond to support requests</li>
          </ul>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">3. Data Storage & Security</h2>
          <p>Your journal entries are stored locally on your device by default. If you sign in and enable sync, entries are encrypted in transit and stored securely on Supabase (hosted on AWS).</p>
          <p>Private entries are protected with a passcode that is hashed using SHA-256 before storage. We cannot access or recover your passcode.</p>
          <p>We implement commercially reasonable security measures to protect your data, including encryption in transit (TLS/SSL) and at rest.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">4. Third-Party Services</h2>
          <p><strong className="text-charcoal">Supabase:</strong> Authentication and cloud data storage. Subject to Supabase&apos;s privacy policy.</p>
          <p><strong className="text-charcoal">OpenAI:</strong> AI-powered reflections and insights. Journal text is sent to OpenAI&apos;s API. OpenAI&apos;s API data usage policy states that data submitted via the API is not used for model training.</p>
          <p><strong className="text-charcoal">RevenueCat:</strong> Subscription payment processing, working with Apple&apos;s App Store.</p>
          <p><strong className="text-charcoal">PostHog:</strong> Anonymous usage analytics to help us improve the App. No personally identifiable information is tracked.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">5. Data Retention</h2>
          <p>Your journal entries are retained as long as you maintain your account. Deleted entries are moved to a &ldquo;Recently Deleted&rdquo; folder and permanently removed after 30 days.</p>
          <p>You may delete your account and all associated data at any time through the App&apos;s Settings screen, or by contacting us at <a href="mailto:jtchitla@mybonsaijournal.com" className="text-sage hover:underline">jtchitla@mybonsaijournal.com</a>.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data and account</li>
            <li>Export your journal entries</li>
            <li>Opt out of cloud sync (use the App offline only)</li>
            <li>Opt out of analytics tracking</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:jtchitla@mybonsaijournal.com" className="text-sage hover:underline">jtchitla@mybonsaijournal.com</a>.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">7. Children&apos;s Privacy</h2>
          <p>The App is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">8. California Residents (CCPA)</h2>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to request deletion, and the right to opt-out of the sale of personal information. We do not sell personal information.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of changes by updating the &ldquo;Last updated&rdquo; date at the top of this policy.</p>

          <h2 className="font-display text-2xl font-medium text-charcoal !mt-10 !mb-3">10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
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
