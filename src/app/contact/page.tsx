"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
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

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        value: "0431 306 570",
        href: "tel:0431306570",
        description: "Available Mon - Sat",
    },
    {
        icon: Mail,
        title: "Email",
        value: "info@marveldriving.com.au",
        href: "mailto:info@marveldriving.com.au",
        description: "We'll respond within 24 hours",
    },
    {
        icon: MapPin,
        title: "Head Office",
        value: "Penshurst, NSW 2222",
        description: "Services only available in Penshurst, Hurstville & Bexley",
    },
    {
        icon: Clock,
        title: "Business Hours",
        value: "Mon - Sat: 7am - 7pm",
        description: "Sunday by appointment",
    },
];

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            alert("Thank you for your enquiry. We'll get back to you soon.");
            setFormData({ name: "", email: "", phone: "", enquiryType: "", message: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#e8e9eb]">
            {/* Contact Info & Form Section */}
            <section className="py-20 md:py-24">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Side - Contact Info & Map */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Whether you're enquiring about driving lessons or NDIS transport, we'd love to hear from you. Choose your preferred contact method below.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                {contactInfo.map((item) => (
                                    <div key={item.title} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                                                <item.icon className="h-6 w-6 text-[#1e5128]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-[#1e5128] font-bold hover:underline block mb-1 text-lg"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="font-bold text-gray-900 mb-1 text-lg">{item.value}</p>
                                            )}
                                            <p className="text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map - Smaller size on left */}
                            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden shadow-md border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26546.02766!2d151.0873!3d-33.9643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b972f8b8c8c7%3A0x5017d681632c760!2sPenshurst%20NSW%202222!5e0!3m2!1sen!2sau!4v1704067200000!5m2!1sen!2sau"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Marvel Driving Service Area - Penshurst, Hurstville & Bexley, Sydney NSW"
                                />
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Send Us a Message</h2>
                            <p className="text-gray-600 mb-10 text-lg">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-gray-900 text-base font-semibold">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Your full name"
                                        className="h-14 bg-[#01331a] border-[#01331a] text-[#eefbf4] placeholder:text-[#eefbf4]/60 rounded-lg text-lg px-4"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-gray-900 text-base font-semibold">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            placeholder="your@email.com"
                                            className="h-14 bg-[#01331a] border-[#01331a] text-[#eefbf4] placeholder:text-[#eefbf4]/60 rounded-lg text-lg px-4"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="phone" className="text-gray-900 text-base font-semibold">Phone *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            placeholder="04XX XXX XXX"
                                            className="h-14 bg-[#01331a] border-[#01331a] text-[#eefbf4] placeholder:text-[#eefbf4]/60 rounded-lg text-lg px-4"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="enquiryType" className="text-gray-900 text-base font-semibold">Enquiry Type *</Label>
                                    <Select
                                        value={formData.enquiryType}
                                        onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                                    >
                                        <SelectTrigger className="h-14 bg-[#f3f4f6] border-gray-200 text-gray-900 rounded-lg text-lg px-4">
                                            <SelectValue placeholder="Select enquiry type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="driving-lessons">Driving Lessons</SelectItem>
                                            <SelectItem value="ndis-transport">NDIS Transport</SelectItem>
                                            <SelectItem value="careers">Careers</SelectItem>
                                            <SelectItem value="general">General Enquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="message" className="text-gray-900 text-base font-semibold">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        placeholder="Tell us how we can help you..."
                                        rows={6}
                                        className="resize-none bg-[#f3f4f6] border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-lg text-lg p-4 min-h-[160px]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-14 text-lg font-bold rounded-lg shadow-md transition-all hover:shadow-lg mt-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="h-5 w-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
