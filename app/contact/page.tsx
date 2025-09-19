"use client"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import React, { useState } from 'react';

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.organization, // Using organization as phone field for API compatibility
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success' as any);
        // Clear the form
        setFormData({
          name: '',
          email: '',
          organization: '',
          message: ''
        });
      } else {
        setSubmitStatus('error' as any);
        console.error('Form submission error:', result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error' as any);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#FFF3E6] via-white to-[#A5D6A7]/20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">{t("nav.contact")}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-merriweather)] text-primary">
            {t("contactPage.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="p-8 rounded-2xl bg-white shadow-md border">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">{t("contactPage.send")}</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}

            <div className="grid gap-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  {t("contactPage.name")} *
                </label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("contactPage.name")} 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  {t("contactPage.email")} *
                </label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("contactPage.email")} 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  {t("contactPage.organization")}
                </label>
                <Input 
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder={t("contactPage.optional")} 
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  {t("contactPage.message")} *
                </label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("contactPage.message")} 
                  className="min-h-40" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-secondary-foreground text-white font-semibold py-3 rounded-lg transition"
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? 'Sending...' : t("contactPage.send")}
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Reach us directly</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                General:{" "}
                <a className="text-primary hover:underline" href="mailto:evabothra@gmail.com">
                evabothra@gmail.com
                </a>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-foreground mb-3">Follow us</h3>
              <div className="flex justify-center gap-6">
                <a className="text-primary hover:underline" href="#" aria-label="Instagram">
                  {t("contactPage.instagram")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
