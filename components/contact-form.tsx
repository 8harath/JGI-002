"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  usn: z.string().min(10, { message: "USN must be at least 10 characters." }),
  specialization: z.string({ required_error: "Please select a specialization." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      usn: "",
      specialization: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="retro-card animate-fade-in p-0 md:p-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">Contact Us</CardTitle>
          <CardDescription className="text-muted-foreground text-base md:text-lg mb-2">
            Fill out this form to contribute materials or ask questions. We'll get back to you soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-accent/10 rounded-b-xl p-4 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
              <CheckCircle className="h-16 w-16 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
              <p className="text-center text-muted-foreground mb-4">
                Thank you for your message.<br />We'll get back to you soon.
              </p>
              <button onClick={() => setIsSuccess(false)} className="keyboard-button mt-2">
                Send Another Message
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold text-foreground">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="retro-focus border-2 border-foreground bg-card/80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold text-foreground">USN</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1JA21BCA001"
                            className="retro-focus border-2 border-foreground bg-card/80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold text-foreground">Specialization</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="retro-focus border-2 border-foreground bg-card/80">
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-2 border-foreground bg-card">
                            <SelectItem value="BCA-DA">BCA-DA (Data Analytics)</SelectItem>
                            <SelectItem value="BCA-AI">BCA-AI (Artificial Intelligence)</SelectItem>
                            <SelectItem value="BCA-General">BCA-General</SelectItem>
                            <SelectItem value="BCA-CS">BCA-CS (Cyber Security)</SelectItem>
                            <SelectItem value="BCA-CTIS">BCA-CTIS</SelectItem>
                            <SelectItem value="BCA-IOT">BCA-IOT</SelectItem>
                            <SelectItem value="BCA-ISMA">BCA-ISMA</SelectItem>
                            <SelectItem value="BCA-ITH">BCA-ITH</SelectItem>
                            <SelectItem value="BCA-MACT">BCA-MACT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your email"
                            className="retro-focus border-2 border-foreground bg-card/80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message or contribution details"
                          className="min-h-[120px] retro-focus border-2 border-foreground bg-card/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <div className="bg-primary/10 border-2 border-primary text-foreground p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button type="submit" className="w-full keyboard-button text-lg py-3 mt-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 inline animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
