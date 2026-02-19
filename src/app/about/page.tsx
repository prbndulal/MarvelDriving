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
        <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/slider-2.jpg"
                        alt="Marvel Driving instructor with successful student"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e5128]/95 via-[#1e5128]/85 to-[#1e5128]/60" />
                </div>
                <div className="container px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            About Marvel Driving and Transport
                        </h1>
                        <p className="text-lg text-white/90">
                            Empowering Independence through Safe, Professional and Supportive
                            Transport and Driving Services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 lg:py-24">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e5128] mb-6">Our Story</h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Marvel Driving and Transport Pty Ltd was established by experienced professionals
                                who understand the importance of independence, mobility and community connection
                                for people living with disability.
                            </p>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                We believe that everyone deserves the opportunity to live life confidently,
                                participate in the community and achieve their personal goals. Our Australian
                                owned company is proud to be a registered NDIS provider supporting people of
                                all abilities.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We work closely with participants, support coordinators, families and allied
                                health professionals to create tailored support solutions that truly make a
                                difference. Our services are flexible, culturally inclusive and designed to
                                meet individual needs, preferences and abilities.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
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

            {/* Mission & Vision */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 lg:p-10 bg-[#1e5128] text-white rounded-2xl shadow-xl"
                        >
                            <Target className="h-12 w-12 mb-6 text-[#fbbf24]" />
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-white/90 leading-relaxed">
                                To empower independence through safe, professional and supportive transport
                                and driving services, helping people of all abilities travel safely,
                                confidently and independently.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 lg:p-10 bg-white border-2 border-[#1e5128]/10 rounded-2xl shadow-xl"
                        >
                            <Award className="h-12 w-12 mb-6 text-[#1e5128]" />
                            <h3 className="text-2xl font-bold mb-4 text-[#1e5128]">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To be Australia's most trusted and inclusive provider of NDIS transport,
                                driving education and support services, known for our commitment to
                                independence, dignity and person-centred care.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-16 lg:py-24">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <Card className="bg-gradient-to-br from-[#1e5128] to-[#164019] text-white border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
                        <CardContent className="p-12 lg:p-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <Trophy className="h-16 w-16 text-[#fbbf24] mx-auto mb-4" />
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Our Achievements</h2>
                                <p className="text-white/80 text-lg">Proud milestones in our journey</p>
                            </motion.div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                {[
                                    { value: "500+", label: "Happy Clients" },
                                    { value: "98%", label: "Success Rate" },
                                    { value: "15+", label: "Years Experience" },
                                    { value: "20+", label: "Expert Instructors" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-5xl lg:text-6xl font-extrabold text-[#fbbf24] mb-2">{stat.value}</div>
                                        <div className="text-white/90 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-12">
                                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                                    <span className="text-sm font-bold">✓ NDIS Registered</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                                    <span className="text-sm font-bold">✓ Fully Accredited</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-24">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e5128] mb-4">Our Values</h2>
                        <p className="text-lg text-gray-600">
                            These core values guide everything we do at Marvel Driving and Transport.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="inline-flex p-4 bg-[#1e5128]/10 rounded-full mb-4">
                                    <value.icon className="h-8 w-8 text-[#1e5128]" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-[#1e5128]">{value.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 lg:py-24 bg-gray-50">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 md:p-12 bg-gradient-to-r from-[#1e5128]/5 to-[#1e5128]/10 rounded-2xl border border-[#1e5128]/20 shadow-lg">
                            <ThumbsUp className="h-12 w-12 text-[#1e5128] mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e5128]">
                                Why Choose Marvel Driving and Transport?
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Our dedicated team is highly experienced, compassionate and professionally trained
                                to meet the diverse needs of participants, families and support networks. We take
                                pride in delivering reliable, respectful and person-centred services that promote
                                independence, confidence and dignity.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {whyChooseUs.map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-[#1e5128] flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1e5128] to-[#164019] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>
                <div className="container px-4 md:px-8 max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            We are here to support you or your loved ones to travel confidently,
                            build independence and enjoy life to the fullest.
                        </p>
                    </motion.div>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input
                                placeholder="Your Name"
                                className="bg-white/90 border-none h-14 text-gray-900 placeholder:text-gray-500 rounded-xl"
                            />
                            <Input
                                placeholder="Your Email"
                                type="email"
                                className="bg-white/90 border-none h-14 text-gray-900 placeholder:text-gray-500 rounded-xl"
                            />
                        </div>
                        <Input
                            placeholder="Phone Number"
                            className="bg-white/90 border-none h-14 text-gray-900 placeholder:text-gray-500 rounded-xl mb-6"
                        />
                        <Button className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e5128] font-extrabold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" asChild>
                            <Link href="/contact">Contact Us Today</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
