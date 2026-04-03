"use client";

import { motion } from "framer-motion";
import { HelpCircle, Car, Accessibility, Calendar, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
    {
        title: "Driving Lessons",
        icon: Car,
        questions: [
            {
                question: "What types of driving lessons do you offer?",
                answer: "We offer automatic transmission driving lessons only. Our lessons are tailored for beginners and learners of all abilities, including those with physical, intellectual, psychosocial and developmental disabilities."
            },
            {
                question: "How much do driving lessons cost?",
                answer: "Our beginner automatic driving lessons are priced at $65 per hour. We believe in transparent, affordable pricing with no hidden fees."
            },
            {
                question: "Do you offer manual transmission lessons?",
                answer: "No, we exclusively offer automatic transmission lessons. This allows us to focus on providing the best learning experience for automatic vehicle drivers."
            },
            {
                question: "How do I book a driving lesson?",
                answer: "You can book a driving lesson through our online booking system, by calling us, or by filling out the contact form on our website. We'll get back to you promptly to confirm your booking."
            },
            {
                question: "What areas do you service for driving lessons?",
                answer: "We provide driving lessons in Penshurst, Hurstville, Bexley and surrounding areas in Sydney NSW."
            }
        ]
    },
    {
        title: "NDIS Services",
        icon: Accessibility,
        questions: [
            {
                question: "What NDIS services do you provide?",
                answer: "We provide a range of NDIS services including driving lessons and support, transport services, daily living support, and community and social participation support. We are registered under multiple NDIS support categories."
            },
            {
                question: "What NDIS registration groups are you registered under?",
                answer: "We are registered under: 0107 (Assist Personal Activities), 0108 (Assist Travel/Transport), 0115 (Daily Tasks/Shared Living), 0116 (Innovative Community Participation), 0117 (Development Life Skills), 0120 (Household Tasks), 0125 (Participate Community), and 0136 (Group/Centre Activities)."
            },
            {
                question: "Can I use my NDIS funding for your services?",
                answer: "Yes! If you're an NDIS participant with relevant funding in your plan, you're eligible for our services. We work with all plan types: self-managed, plan-managed, and NDIA-managed."
            },
            {
                question: "How do I access your NDIS services?",
                answer: "Simply contact us to discuss your needs and goals. We'll work with you, your support coordinator, and family to create a tailored service agreement. Then you can book your services at times that suit you."
            },
            {
                question: "Do you provide transport to medical appointments?",
                answer: "Yes, we provide safe and reliable transport to medical appointments, therapies, school, work, community activities and social events. Our supportive staff assist throughout the journey."
            }
        ]
    },
    {
        title: "Booking & Scheduling",
        icon: Calendar,
        questions: [
            {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 48 hours in advance to ensure availability, especially for preferred time slots. However, we try to accommodate last-minute requests when possible."
            },
            {
                question: "Can I reschedule or cancel my booking?",
                answer: "Yes, you can reschedule or cancel your booking. We ask for at least 24 hours notice for cancellations. Please contact us as soon as possible if you need to make changes."
            },
            {
                question: "What are your operating hours?",
                answer: "We operate Monday to Saturday. Specific hours may vary, so please contact us for current availability or check our booking system."
            },
            {
                question: "Do you offer weekend lessons?",
                answer: "Yes, we offer Saturday lessons to accommodate busy schedules. These slots are popular, so we recommend booking early."
            }
        ]
    },
    {
        title: "Payment & Pricing",
        icon: CreditCard,
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods including bank transfer, credit/debit cards, and NDIS invoicing for eligible participants. Payment details will be confirmed at the time of booking."
            },
            {
                question: "Do you offer package deals?",
                answer: "Currently, we offer lessons at our standard rate of $65 per hour for automatic driving lessons. Contact us to discuss your needs and we can work out the best arrangement for you."
            },
            {
                question: "How does NDIS billing work?",
                answer: "For NDIS participants, we invoice according to your plan management type. For plan-managed participants, we invoice your plan manager directly. For self-managed participants, we provide invoices for you to claim. For NDIA-managed participants, we claim directly through the NDIS portal."
            }
        ]
    }
];

export default function FAQ() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-36 overflow-hidden">
                <img
                    src="/faq-hero.jpg"
                    alt="Frequently Asked Questions"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0a2f14]/85" />
                <div className="container px-4 md:px-8 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex p-5 bg-[#fbbf24] rounded-full mb-8 shadow-2xl">
                            <HelpCircle className="h-10 w-10 text-[#0a2f14]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                            Find answers to common questions about our driving lessons, NDIS services,
                            booking process and more. Can't find what you're looking for? Contact us!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Service Area Pill */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container px-4 text-center">
                    <p className="text-sm font-bold text-[#0a2f14]/60 uppercase tracking-widest flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-[#fbbf24]" />
                        Support available in <span className="text-[#0a2f14]">Penshurst, Hurstville, Bexley</span> and surrounding areas
                    </p>
                </div>
            </div>

            {/* FAQ Sections */}
            <section className="py-24">
                <div className="container px-4 md:px-8">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {faqCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 bg-[#0a2f14] rounded-2xl shadow-xl">
                                        <category.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-[#0a2f14] tracking-tight">{category.title}</h2>
                                </div>

                                <div className="space-y-4">
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {category.questions.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`${category.title}-${index}`}
                                                className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden"
                                            >
                                                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gray-50 transition-all font-extrabold text-[#0a2f14] text-lg">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="px-8 pb-6 text-gray-500 text-lg font-medium leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions CTA */}
            <section className="py-24 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto p-12 md:p-20 bg-white rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e5128] via-[#fbbf24] to-[#1e5128]" />
                        
                        <div className="relative z-10">
                            <HelpCircle className="h-16 w-16 text-[#fbbf24] mx-auto mb-8 animate-bounce-slow" />
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a2f14] mb-6 tracking-tight">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg md:text-xl text-gray-500 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                                Can't find the answer you're looking for? Our friendly team is here to help.
                                Get in touch and we'll get back to you as soon as possible.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Button className="bg-[#1e5128] hover:bg-[#0a2f14] text-white font-extrabold text-lg h-16 px-12 rounded-full shadow-xl transition-all hover:scale-105" size="lg" asChild>
                                    <Link href="/contact">Contact Us Today</Link>
                                </Button>
                                <Button variant="outline" size="lg" className="border-[#1e5128] text-[#1e5128] hover:bg-[#1e5128] hover:text-white font-extrabold text-lg h-16 px-12 rounded-full shadow-xl transition-all hover:scale-105" asChild>
                                    <Link href="/book">Book a Service</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
