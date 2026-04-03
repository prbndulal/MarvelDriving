"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
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
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <img
                    src="/contact-hero.jpg"
                    alt="Contact Marvel Driving"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0a2f14]/85" />
                <div className="container px-4 md:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-white"
                    >
                        <h1 className="text-xl md:text-2xl font-bold mb-4 opacity-30 uppercase tracking-[0.3em]">
                            Contact Us
                        </h1>
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Contact Us
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                            Have a question or ready to book? Get in touch with our friendly team today. We're here to help!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Service Area Pill */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container px-4 text-center">
                    <p className="text-sm font-bold text-[#0a2f14]/60 uppercase tracking-widest flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-[#fbbf24]" />
                        Proudly serving <span className="text-[#0a2f14]">Penshurst, Hurstville, Bexley</span> and surrounding areas
                    </p>
                </div>
            </div>

            {/* Contact Info & Form Section */}
            <section className="py-20 md:py-28">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Left Side - Contact Info */}
                        <div className="space-y-16">
                            <div>
                                <h2 className="text-4xl font-extrabold text-[#0a2f14] mb-8 tracking-tight">Get in Touch</h2>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                    Whether you're enquiring about driving lessons or NDIS transport, we'd love to hear from you. Choose your preferred contact method below.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
                                {contactInfo.map((item) => (
                                    <div key={item.title} className="group">
                                        <div className="flex items-center gap-5 mb-5">
                                            <div className="p-4 rounded-full border-2 border-[#1e5128] text-[#1e5128] group-hover:bg-[#1e5128] group-hover:text-white transition-all duration-300">
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-extrabold text-[#0a2f14] tracking-tight">{item.title}</h3>
                                        </div>
                                        <div>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-[#1e5128] font-extrabold hover:underline block mb-2 text-xl tracking-tight"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="font-extrabold text-[#0a2f14] mb-2 text-xl tracking-tight">{item.value}</p>
                                            )}
                                            <p className="text-gray-500 font-medium text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Service Area List */}
                            <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                <h4 className="text-lg font-extrabold text-[#0a2f14] mb-4 uppercase tracking-widest">Our Service Area</h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {["Penshurst, NSW 2222", "Hurstville, NSW 2220", "Bexley, NSW 2207"].map((area) => (
                                        <li key={area} className="flex items-center gap-2 text-gray-600 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-50 p-10 md:p-14">
                            <h2 className="text-3xl font-extrabold text-[#0a2f14] mb-4 tracking-tight">Send Us a Message</h2>
                            <p className="text-gray-500 mb-12 text-base font-medium">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-[#0a2f14] text-sm font-extrabold uppercase tracking-widest">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Your full name"
                                        className="h-16 bg-gray-50 border-none text-[#0a2f14] placeholder:text-gray-400 rounded-2xl text-lg px-6 focus-visible:ring-2 focus-visible:ring-[#1e5128]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-[#0a2f14] text-sm font-extrabold uppercase tracking-widest">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            placeholder="your@email.com"
                                            className="h-16 bg-gray-50 border-none text-[#0a2f14] placeholder:text-gray-400 rounded-2xl text-lg px-6 focus-visible:ring-2 focus-visible:ring-[#1e5128]"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="phone" className="text-[#0a2f14] text-sm font-extrabold uppercase tracking-widest">Phone *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            placeholder="04XX XXX XXX"
                                            className="h-16 bg-gray-50 border-none text-[#0a2f14] placeholder:text-gray-400 rounded-2xl text-lg px-6 focus-visible:ring-2 focus-visible:ring-[#1e5128]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="enquiryType" className="text-[#0a2f14] text-sm font-extrabold uppercase tracking-widest">Enquiry Type *</Label>
                                    <Select
                                        value={formData.enquiryType}
                                        onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                                    >
                                        <SelectTrigger className="h-16 bg-gray-50 border-none text-[#0a2f14] rounded-2xl text-lg px-6 focus:ring-2 focus:ring-[#1e5128]">
                                            <SelectValue placeholder="Select enquiry type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-100 rounded-2xl shadow-2xl">
                                            <SelectItem value="driving-lessons">Driving Lessons</SelectItem>
                                            <SelectItem value="ndis-transport">NDIS Transport</SelectItem>
                                            <SelectItem value="careers">Careers</SelectItem>
                                            <SelectItem value="general">General Enquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="message" className="text-[#0a2f14] text-sm font-extrabold uppercase tracking-widest">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        placeholder="Tell us how we can help you..."
                                        rows={6}
                                        className="resize-none bg-gray-50 border-none text-[#0a2f14] placeholder:text-gray-400 rounded-2xl text-lg p-6 min-h-[160px] focus-visible:ring-2 focus-visible:ring-[#1e5128]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-16 text-lg font-extrabold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95 mt-4"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="h-5 w-5 ml-3" />
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
