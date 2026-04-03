"use client";

import { ComponentType } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Clock, LucideIcon } from "lucide-react";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { ScrollLink } from "@/components/ScrollLink";

const logo = "/logo.png";
const ndisRegistered = "/ndis-logo.png"; // Using available logo

// TikTok icon component (Lucide doesn't have it built-in)
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

interface SocialLink {
    href: string;
    icon: LucideIcon | ComponentType<{ className?: string }>;
    label: string;
}

const quickLinks = [{
    href: "/automatic-lessons",
    label: "Driving Lessons"
}, {
    href: "/ndis-services",
    label: "NDIS Services"
}, {
    href: "/about",
    label: "About Us"
}, {
    href: "/gallery",
    label: "Gallery"
}, {
    href: "/blog",
    label: "Blog"
}, {
    href: "/faq",
    label: "FAQ"
}, {
    href: "/careers",
    label: "Careers"
}, {
    href: "/contact",
    label: "Contact"
}];

const services = [{
    href: "/automatic-lessons",
    label: "Automatic Driving Lessons"
}, {
    href: "/ndis-services",
    label: "Transport Services"
}, {
    href: "/ndis-services",
    label: "Daily Living Support"
}, {
    href: "/ndis-services",
    label: "Community Participation"
}, {
    href: "/book", // Changed from /booking to match app routes if needed
    label: "Book Online"
}];

const socialLinks: (SocialLink & { color: string })[] = [{
    href: "https://facebook.com",
    icon: Facebook,
    label: "Facebook",
    color: "hover:bg-[#1877F2] text-[#1877F2] hover:text-white"
}, {
    href: "https://instagram.com",
    icon: Instagram,
    label: "Instagram",
    color: "hover:bg-[#E4405F] text-[#E4405F] hover:text-white"
}, {
    href: "https://linkedin.com",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white"
}, {
    href: "https://youtube.com",
    icon: Youtube,
    label: "YouTube",
    color: "hover:bg-[#FF0000] text-[#FF0000] hover:text-white"
}, {
    href: "https://tiktok.com/@marveldriving",
    icon: TikTokIcon,
    label: "TikTok",
    color: "hover:bg-[#000000] text-[#000000] hover:text-white"
}];

export function Footer() {
    return (
        <>
            {/* Elegant divider above footer */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1e5128]/20"></div>
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-background px-6">
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#1e5128] to-transparent rounded-full"></div>
                    </div>
                </div>
            </div>

            <footer className="bg-[#f8fafc] text-slate-800 pt-16 border-t border-gray-100">
                <div className="container px-4 md:px-8 pb-12 lg:pb-16">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="Marvel Driving" className="h-[60px] w-auto object-contain" />
                                <img src={ndisRegistered} alt="NDIS Provider" className="h-[50px] w-auto object-contain ml-2" />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Marvel Driving and Transport Pty Ltd — Empowering Independence through safe, 
                                professional and supportive transport and driving services.
                            </p>
                            <p className="text-[#1e5128] font-extrabold text-sm italic">"Choice, Control, Community"</p>

                            <div className="pt-4">
                                <p className="font-extrabold text-[#1e5128] text-xs uppercase tracking-[0.2em] mb-4">Stay Updated</p>
                                <NewsletterForm />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:pl-8">
                            <h3 className="font-extrabold text-lg mb-8 text-[#0a2f14] tracking-tight">Quick Links</h3>
                            <ul className="space-y-4">
                                {quickLinks.map((link) => (
                                    <li key={link.href + link.label}>
                                        <ScrollLink href={link.href} className="text-[15px] font-medium text-gray-500 hover:text-[#1e5128] transition-all">
                                            {link.label}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="font-extrabold text-lg mb-8 text-[#0a2f14] tracking-tight">Our Services</h3>
                            <ul className="space-y-4">
                                {services.map((link, index) => (
                                    <li key={link.href + index}>
                                        <ScrollLink href={link.href} className="text-[15px] font-medium text-gray-500 hover:text-[#1e5128] transition-all">
                                            {link.label}
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-extrabold text-lg mb-8 text-[#0a2f14] tracking-tight">Contact Us</h3>
                            <ul className="space-y-6">
                                <li>
                                    <a href="tel:0431306570" className="flex items-center gap-4 text-[15px] text-gray-500 hover:text-[#1e5128] transition-colors group">
                                        <Phone className="h-5 w-5 text-[#1e5128]" />
                                        <span className="font-bold">0431 306 570</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@marveldriving.com.au" className="flex items-center gap-4 text-[15px] text-gray-500 hover:text-[#1e5128] transition-colors group">
                                        <Mail className="h-5 w-5 text-[#1e5128]" />
                                        <span className="break-all font-medium">info@marveldriving.com.au</span>
                                    </a>
                                </li>
                                <li className="flex items-start gap-4 text-[15px] text-gray-500">
                                    <MapPin className="h-5 w-5 text-[#1e5128] shrink-0 mt-1" />
                                    <div className="font-medium">
                                        <p>Head Office: Penshurst, NSW 2222</p>
                                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">Sydney Wide Services</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 text-[15px] text-gray-500">
                                    <Clock className="h-5 w-5 text-[#1e5128] shrink-0 mt-1" />
                                    <div className="font-medium">
                                        <p>Mon - Sun: 8:00 AM - 4:00 PM</p>
                                        <p className="text-xs text-gray-500 mt-1 font-bold">ABN: 65 661 258 591</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="border-t border-gray-100 pt-8 pb-12 flex flex-col items-center">
                        <p className="font-extrabold text-[#1e5128] text-xs uppercase tracking-[0.3em] mb-6">Follow Us</p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-gray-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm border border-gray-100 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-100 bg-[#f8fafc]">
                    <div className="container px-4 md:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[13px] text-gray-400">
                        <p className="text-center sm:text-left font-bold">
                            © {new Date().getFullYear()} Marvel Driving and Transport Pty Ltd. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <ScrollLink href="/privacy" className="hover:text-[#1e5128] transition-colors font-bold uppercase tracking-wider">
                                Privacy Policy
                            </ScrollLink>
                            <ScrollLink href="/terms" className="hover:text-[#1e5128] transition-colors font-bold uppercase tracking-wider">
                                Terms & Conditions
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
