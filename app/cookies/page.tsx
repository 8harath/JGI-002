import React from "react";

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Cookies Policy</h1>
      <p className="mb-4 text-muted-foreground">
        This Cookies Policy explains how Jain University Resource Archive ("we", "us", or "our") uses cookies and similar technologies on our website.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">What Are Cookies?</h2>
      <p className="mb-4 text-muted-foreground">
        Cookies are small text files stored on your device by your web browser. They help us provide a better user experience, remember your preferences, and analyze how our website is used.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">How We Use Cookies</h2>
      <ul className="list-disc pl-6 mb-4 text-muted-foreground">
        <li>To remember your session and preferences (such as theme or language).</li>
        <li>To collect anonymous analytics data to improve our website and resources.</li>
        <li>To ensure the security and proper functioning of the site.</li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-2">Your Choices</h2>
      <p className="mb-4 text-muted-foreground">
        You can control or delete cookies through your browser settings. Most browsers allow you to refuse or delete cookies, but this may affect your experience on our site.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Third-Party Cookies</h2>
      <p className="mb-4 text-muted-foreground">
        We do not use third-party advertising cookies. However, we may use third-party analytics tools (such as Google Analytics) to collect anonymous usage data.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4 text-muted-foreground">
        If you have any questions about our use of cookies, please <a href="/contact" className="underline hover:text-primary">contact us</a>.
      </p>
    </div>
  );
} 