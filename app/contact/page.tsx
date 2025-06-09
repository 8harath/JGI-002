import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Contact Us</h1>
        <p className="text-slate-600 mb-8">
          Have materials to contribute or questions about the resource archive? Fill out the form below.
        </p>

        <ContactForm />
      </div>
    </div>
  )
}
