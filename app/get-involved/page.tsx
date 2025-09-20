"use client"
import { Badge } from "@/components/ui/badge"
import { DonationPortal } from "@/components/donation-portal"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/lib/language-context"
import { ArrowDown } from "lucide-react"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function GetInvolvedPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    availability: '',
    skills: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Partner form state
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",   // updated
    ideas: "",
  });
  
  const [isSubmittingPartner, setIsSubmittingPartner] = useState(false);
  const [partnerErrorMessage, setPartnerErrorMessage] = useState("");
  const [partnerStatus, setPartnerStatus] = useState<"success" | "error" | null>(null);
  
  // Handlers for partner form
  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePartnerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmittingPartner(true);
    setPartnerStatus(null);
    setPartnerErrorMessage("");
  
    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partnerForm),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        setPartnerStatus("success");
        setPartnerErrorMessage("");
        setPartnerForm({ name: "", email: "", phone: "", company: "", ideas: "" }); // reset updated
      } else {
        if (result.error?.toLowerCase().includes("already registered")) {
          setPartnerStatus("error");
          setPartnerErrorMessage(
            "You have already submitted your application. Please wait for our team to contact you 🙂"
          );
        } else {
          setPartnerStatus("error");
          setPartnerErrorMessage(result.error || "There was an error submitting your application.");
        }
      }
    } catch (err) {
      console.error("Partner submission error:", err);
      setPartnerStatus("error");
      setPartnerErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmittingPartner(false);
    }
  };
  
  // Form validation
  const isPartnerValid =
    partnerForm.name && partnerForm.email && partnerForm.phone;
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user changes input
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.role || !formData.availability) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }



    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Clear the form
        setFormData({
          name: '',
          email: '',
          organization: '',
          role: '',
          availability: '',
          skills: '',
          message: ''
        });
      } 
      else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'There was an error submitting your application. Please try again.');
        console.error('Form submission error:', result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.role && formData.availability;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative m-0 px-4 sm:px-0  bg-gradient-to-br from-primary/5 via-background to-muted/20 py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
            {t("getInvolved.title") || "Get Involved"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-[family-name:var(--font-merriweather)]">
            {t("getInvolvedPage.hero.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t("getInvolvedPage.hero.subtitle")}
          </p>
          <a href="#donation" className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg transition">
            {t("getInvolvedPage.hero.donateNow")} <ArrowDown className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section id="donation" className="section m-0 px-4 sm:px-0  py-20">
        <div className="container mx-auto max-w-7xl space-y-20">
          {/* Donation Portal */}
          <DonationPortal />



          {/* Partnerships */}
          <div
            id="partnership"
            className="py-16 md:px-12 max-w-7xl mx-auto  m-0 px-4 sm:px-0  bg-[#FFF3E6] rounded-2xl"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-merriweather)] text-[#2E7D32]"
              >
                {t("getInvolvedPage.partnerships.title")}
              </h2>
              <p className="text-[#424242] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {t("getInvolvedPage.partnerships.subtitle")}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: t("getInvolvedPage.partnerships.clinical"), desc: t("getInvolvedPage.partnerships.clinicalDesc") },
                { title: t("getInvolvedPage.partnerships.govt"), desc: t("getInvolvedPage.partnerships.govtDesc"), link: "https://nhm.gov.in/" },
                { title: t("getInvolvedPage.partnerships.aastrika"), desc: t("getInvolvedPage.partnerships.aastrikaDesc"), link: "https://www.aastrika.org/" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl border border-[#A5D6A7] bg-white shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-lg md:text-xl mb-3 text-[#1B5E20]">
                      {item.title}
                    </div>
                    <p className="text-sm md:text-base text-[#424242] mb-4">{item.desc}</p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base font-medium text-[#2E7D32] hover:text-[#A5D6A7] hover:underline mt-auto"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>



          {/* Volunteer Pathways */}
          <div id="volunteer" className="py-16  m-0 px-4 sm:px-0  md:px-12 max-w-7xl mx-auto bg-[#FFF3E6] rounded-2xl">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-merriweather)] text-[#2E7D32]"
              >
                {t("getInvolvedPage.volunteer.title")}
              </h2>
              <p className="text-[#424242] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {t("getInvolvedPage.volunteer.subtitle")}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: t("getInvolvedPage.volunteer.field"), desc: t("getInvolvedPage.volunteer.fieldDesc") },
                { title: t("getInvolvedPage.volunteer.content"), desc: t("getInvolvedPage.volunteer.contentDesc") },
                { title: t("getInvolvedPage.volunteer.tech"), desc: t("getInvolvedPage.volunteer.techDesc") },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl border border-[#A5D6A7] bg-white shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-lg md:text-xl mb-3 text-[#1B5E20]">{item.title}</div>
                    <p className="text-sm md:text-base text-[#424242]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* volunteer form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-0 px-4 sm:px-8">

            {/* Left Column */}
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">
                {t("getInvolvedPage.volunteer.application")}
              </h2>
              <p className="text-muted-foreground">
                {t("getInvolvedPage.volunteer.applicationDesc")}
              </p>
            </div>

            {/* Right Column */}



            <div className="md:col-span-2 space-y-6">
              {/* Success / Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    Thank you! Your volunteer application has been submitted successfully. We'll be in touch soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">
                    {errorMessage || "Sorry, there was an error submitting your application. Please try again."}
                  </p>
                </div>
              )}

              {/* Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
                {/* Name */}
                <input
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  placeholder="Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />

                {/* Email */}
                <input
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  placeholder="Email *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />

                {/* Organization */}
                <input
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  placeholder="Organization (optional)"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />

                {/* Role */}
                <select
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  value={formData.role}
                  name="role"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="" disabled>Role preference *</option>
                  <option value="WORKSHOP_FACILITATOR">Workshop facilitator</option>
                  <option value="TRAINER">Trainer</option>
                  <option value="FIELD_VOLUNTEER">Field volunteer</option>
                  <option value="FUNDRAISER">Fundraiser</option>
                </select>

                {/* Availability */}
                <select
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  value={formData.availability}
                  name="availability"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="" disabled>Availability *</option>
                  <option value="WEEKDAYS">Weekdays</option>
                  <option value="WEEKENDS">Weekends</option>
                  <option value="FLEXIBLE">Flexible</option>
                </select>

                {/* Skills */}
                <input
                  className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  placeholder="Skills (comma separated)"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />

                {/* Message */}
                <textarea
                  className="p-3 rounded-md border col-span-1 sm:col-span-2 focus:ring-2 focus:ring-primary focus:outline-none w-full"
                  placeholder="Message"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />

                {/* Submit Button */}
                <button
                  className="col-span-1 sm:col-span-2 p-3 rounded-md bg-primary text-white font-semibold hover:bg-secondary-foreground transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid}
                  type="button"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
          {/* partner form */}
          {/* Partner Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-0 px-4 sm:px-8 mt-12">
            <div className="md:col-span-1">
              {/* Heading */}

              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-merriweather)]">
                {t("getInvolvedPage.partner.application")}
              </h2>
              <p className="text-muted-foreground">
                {t("getInvolvedPage.partner.applicationDesc")}
              </p>

            </div>
            {/* Success / Error Messages */}
            <div className="md:col-span-2 space-y-6">
              {partnerStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    Thank you! Our team will contact you soon 🙂
                  </p>
                </div>
              )}
           {partnerStatus === "error" && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
    <p className="text-red-800">{partnerErrorMessage}</p>
  </div>
)}


              {/* Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
  <input
    className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
    placeholder="Name *"
    name="name"
    value={partnerForm.name}
    onChange={handlePartnerChange}
    required
    disabled={isSubmittingPartner}
  />

  <input
    className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
    placeholder="Email *"
    name="email"
    type="email"
    value={partnerForm.email}
    onChange={handlePartnerChange}
    required
    disabled={isSubmittingPartner}
  />

  <input
    className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full"
    placeholder="Phone *"
    name="phone"
    type="tel"
    value={partnerForm.phone}
    onChange={handlePartnerChange}
    required
    disabled={isSubmittingPartner}
  />

  <input
    className="p-3 rounded-md border focus:ring-2 focus:ring-primary focus:outline-none w-full col-span-1 sm:col-span-2"
    placeholder="Company Name"
    name="company"
    value={partnerForm.company}
    onChange={handlePartnerChange}
    disabled={isSubmittingPartner}
  />

  <textarea
    className="p-3 rounded-md border col-span-1 sm:col-span-2 focus:ring-2 focus:ring-primary focus:outline-none w-full"
    placeholder="Partnership Ideas"
    name="ideas"
    value={partnerForm.ideas}
    onChange={handlePartnerChange}
    rows={4}
    disabled={isSubmittingPartner}
  />

  <button
    className="col-span-1 sm:col-span-2 p-3 rounded-md bg-primary text-white font-semibold hover:bg-secondary-foreground transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
    onClick={handlePartnerSubmit}
    disabled={isSubmittingPartner || !isPartnerValid}
    type="button"
  >
    {isSubmittingPartner ? "Submitting..." : "Submit Application"}
  </button>
</div>

            </div>
          </div>

   
    </div>
               
      </section >
    </div >
  )
}
