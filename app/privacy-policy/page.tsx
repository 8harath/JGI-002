import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-muted-foreground">
        Jain University Resource Archive ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4 text-muted-foreground">
        <li><strong>Usage Data:</strong> We collect anonymous data about how you use our site (such as pages visited, resources accessed, and device/browser information) to improve our services.</li>
        <li><strong>Contact Information:</strong> If you contact us via our contact form, we may collect your name and email address to respond to your inquiry.</li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-muted-foreground">
        <li>To provide and maintain our website and resources.</li>
        <li>To analyze usage and improve our services.</li>
        <li>To respond to your inquiries and provide support.</li>
        <li>To ensure the security of our website.</li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-2">Data Sharing</h2>
      <p className="mb-4 text-muted-foreground">
        We do not sell, trade, or share your personal information with third parties, except as required by law or to protect our rights.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Cookies & Analytics</h2>
      <p className="mb-4 text-muted-foreground">
        We use cookies and analytics tools to understand how our site is used and to enhance your experience. See our <a href="/cookies" className="underline hover:text-primary">Cookies Policy</a> for more details.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4 text-muted-foreground">
        You have the right to access, correct, or delete your personal information. To exercise these rights, please <a href="/contact" className="underline hover:text-primary">contact us</a>.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Children's Privacy</h2>
      <p className="mb-4 text-muted-foreground">
        Our website is intended for students and educators. We do not knowingly collect personal information from children under 13.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="mb-4 text-muted-foreground">
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4 text-muted-foreground">
        If you have any questions about this Privacy Policy, please <a href="/contact" className="underline hover:text-primary">contact us</a>.
      </p>
    </div>
  );
} 