"use client";

import { motion } from "framer-motion";
import { Target, Heart, Shield, Users, Award, ThumbsUp, CheckCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const values = [
    {
        icon: Shield,
        title: "Safety First",
        description: "Your safety is our top priority. We maintain the highest standards in service delivery, training and protocols."
    },
    {
        icon: Heart,
        title: "Compassionate Care",
        description: "We approach every interaction with patience, understanding and genuine care for your wellbeing."
    },
    {
        icon: Target,
        title: "Person-Centred",
        description: "Our services are tailored to meet individual needs, preferences and abilities. Your goals drive everything we do."
    },
    {
        icon: Users,
        title: "Inclusive Approach",
        description: "We welcome participants of all abilities, backgrounds, and ages. Everyone deserves respectful, culturally diverse care."
    }
];

const whyChooseUs = [
    "NDIS registered and compliant",
    "Professional, caring and experienced team",
    "Safe, reliable and high-quality service",
    "Tailored person-centred approach",
    "Respectful, inclusive and culturally diverse care",
    "Affordable and flexible support options"
];

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-48 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/about-hero.jpg"
                        alt="Marvel Driving instructor and student"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0a2f14]/85" />
                </div>
                <div className="container px-4 md:px-8 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight">
                            About Marvel Driving and Transport
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                            Empowering Independence through Safe, Professional and Supportive
                            Transport and Driving Services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 md:py-36">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a2f14] mb-10 tracking-tight">Our Story</h2>
                            <div className="space-y-8 text-lg md:text-xl text-gray-500 font-medium leading-[1.8]">
                                <p>
                                    Marvel Driving and Transport Pty Ltd was established by experienced professionals
                                    who understand the importance of independence, mobility and community connection
                                    for people living with disability.
                                </p>
                                <p>
                                    We believe that everyone deserves the opportunity to live life confidently,
                                    participate in the community and achieve their personal goals. Our Australian
                                    owned company is proud to be a registered NDIS provider supporting people of
                                    all abilities.
                                </p>
                                <p>
                                    We work closely with participants, support coordinators, families and allied
                                    health professionals to create tailored support solutions that truly make a
                                    difference. Our services are flexible, culturally inclusive and designed to
                                    meet individual needs, preferences and abilities.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#fbbf24] to-[#1e5128] rounded-[3rem] opacity-10 blur-2xl" />
                            <div className="relative p-12 bg-white rounded-[3rem] shadow-2xl border border-gray-50">
                                <img
                                    alt="Marvel Driving and Transport Logo"
                                    className="w-full h-auto object-contain"
                                    src="/logo.png"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a2f14] mb-6 tracking-tight">Our Values</h2>
                        <p className="text-lg md:text-xl text-gray-500 font-medium">
                            Driven by excellence, guided by compassion, and committed to your independence.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:scale-[1.03]"
                            >
                                <div className="inline-flex p-5 bg-[#fbbf24]/10 rounded-2xl mb-8">
                                    <value.icon className="h-10 w-10 text-[#0a2f14]" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#0a2f14] mb-4">{value.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 bg-[#0a2f14] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbbf24] rounded-full blur-[160px] opacity-10 -mr-48 -mt-48" />
                <div className="container px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { value: "500+", label: "Happy Clients" },
                            { value: "98%", label: "Success Rate" },
                            { value: "15+", label: "Years Exp" },
                            { value: "20+", label: "Instructors" }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-5xl md:text-7xl font-extrabold text-[#fbbf24] mb-4 tracking-tighter">{stat.value}</div>
                                <div className="text-white/60 font-extrabold uppercase tracking-widest text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-36">
                <div className="container px-4">
                    <div className="max-w-6xl mx-auto p-12 md:p-24 bg-gradient-to-br from-[#0a2f14] to-[#1e5128] rounded-[4rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-[url('/pattern.svg')] opacity-5 pointer-events-none" />
                        <div className="relative z-10 max-w-3xl text-white">
                            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight">
                                Ready to Experience the Difference?
                            </h2>
                            <p className="text-xl text-white/80 mb-12 font-medium leading-relaxed">
                                We are here to support you or your loved ones to travel confidently,
                                build independence and enjoy life to the fullest.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0a2f14] font-extrabold text-lg h-16 px-12 rounded-full shadow-2xl transition-all hover:scale-105" size="lg" asChild>
                                    <Link href="/contact">Contact Us Today</Link>
                                </Button>
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-extrabold text-lg h-16 px-12 rounded-full backdrop-blur-sm transition-all shadow-xl" size="lg" asChild>
                                    <Link href="/book">Book a Service</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
