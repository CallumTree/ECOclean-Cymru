import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, Upload, X, ImageIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, WHATSAPP_DISPLAY_NUMBER, whatsappLink } from "@/lib/constants";

const services = [
  "Post Construction Cleans",
  "Holiday Let Turnovers",
  "Deep Cleans (Domestic or Commercial)",
  "Regular Weekly/Biweekly Cleans",
  "Commercial Office Cleans",
  "Appliance Cleans",
  "Carpets",
  "End of Tenancy Clean",
  "Other",
];

const MAX_PHOTOS = 5;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15MB combined

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    postcode: "",
    service: "",
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);

    if (photos.length + incoming.length > MAX_PHOTOS) {
      toast({
        title: "Too many photos",
        description: `Please attach up to ${MAX_PHOTOS} photos.`,
        variant: "destructive",
      });
      return;
    }

    const combined = [...photos, ...incoming];
    const totalBytes = combined.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      toast({
        title: "Photos too large",
        description: "Please keep your combined photos under 15MB.",
        variant: "destructive",
      });
      return;
    }

    setPhotos(combined);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || formData.name.length > 100) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name (max 100 characters).",
        variant: "destructive",
      });
      return;
    }

    if (!formData.contact.trim() || formData.contact.length > 255) {
      toast({
        title: "Invalid contact",
        description: "Please enter a valid phone or email (max 255 characters).",
        variant: "destructive",
      });
      return;
    }

    if (formData.postcode.length > 10) {
      toast({
        title: "Invalid postcode",
        description: "Please enter a valid postcode.",
        variant: "destructive",
      });
      return;
    }

    if (formData.message.length > 1000) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 1000 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("subject", `New enquiry from ${formData.name} — ecocleancymru.com`);
      payload.append("from_name", "ECOclean Cymru website");
      payload.append("name", formData.name);
      payload.append("phone_or_email", formData.contact);
      payload.append("postcode", formData.postcode);
      payload.append("service", formData.service || "Not specified");
      payload.append("message", formData.message);
      // Web3Forms accepts repeated multipart fields for multiple attachments —
      // double check the exact field name/limits in the Web3Forms dashboard once a real access key is in place.
      photos.forEach((file) => payload.append("attachment", file));

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setIsSubmitted(true);
      toast({
        title: "Enquiry sent!",
        description: "We'll be in touch shortly.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again, or reach us directly on WhatsApp or by phone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-eco-charcoal py-24 md:py-32">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-light text-white mb-4 leading-[1.05]">
              Get in Touch
            </h1>
            <p className="text-white/70 text-lg">
              Ready for a cleaner space? Tell us about the job and we'll be in touch shortly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSubmitted ? (
                <div className="bg-card border border-border p-8 md:p-12 text-center">
                  <CheckCircle className="w-14 h-14 text-primary mx-auto mb-6" strokeWidth={1.25} />
                  <h2 className="font-heading text-2xl font-medium text-foreground mb-4">
                    Thank You!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    We'll be in touch shortly to discuss your job further or issue you a quote.
                  </p>
                  <Button
                    variant="pill"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", contact: "", postcode: "", service: "", message: "" });
                      setPhotos([]);
                    }}
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border p-8 md:p-12">
                  <h2 className="font-heading text-2xl font-medium text-foreground mb-2">
                    Request a Quote
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Describe your project and add a few photos for the most accurate quote.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Phone or Email *</Label>
                        <Input
                          id="contact"
                          placeholder="How can we reach you?"
                          value={formData.contact}
                          onChange={(e) => handleChange("contact", e.target.value)}
                          required
                          maxLength={255}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          placeholder="e.g. SA62"
                          value={formData.postcode}
                          onChange={(e) => handleChange("postcode", e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Type</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => handleChange("service", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Describe Your Project</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about the space, the job, and anything else that would help us quote accurately..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        maxLength={1000}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.message.length}/1000
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photos">Photos (recommended for accuracy)</Label>
                      <label
                        htmlFor="photos"
                        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload photos of the area or job (up to {MAX_PHOTOS}, 15MB total)
                        </span>
                        <input
                          id="photos"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFilesSelected(e.target.files)}
                        />
                      </label>

                      {photos.length > 0 && (
                        <ul className="grid sm:grid-cols-2 gap-2 mt-3">
                          {photos.map((file, index) => (
                            <li
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between gap-2 bg-muted rounded-lg px-3 py-2 text-sm"
                            >
                              <span className="flex items-center gap-2 min-w-0">
                                <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                                <span className="truncate">{file.name}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="text-muted-foreground hover:text-destructive shrink-0"
                                aria-label={`Remove ${file.name}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <Button type="submit" variant="pill" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Enquiry
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* WhatsApp CTA */}
              <div className="bg-[#25D366]/10 p-6 border border-[#25D366]/20">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  Prefer WhatsApp?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Quick questions? Send us a message and we'll reply promptly.
                </p>
                <Button variant="whatsapp" className="w-full rounded-full uppercase text-xs tracking-wider" asChild>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>

              {/* Contact Details */}
              <div className="bg-card p-6 border border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Contact Details
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:07432670535" className="text-muted-foreground hover:text-primary transition-colors">
                        {WHATSAPP_DISPLAY_NUMBER}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Service Area</p>
                      <p className="text-muted-foreground">
                        Pembrokeshire, Wales
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
