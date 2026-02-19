"use client";

import { motion } from "framer-motion";
import { Car, CheckCircle, AlertCircle, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DrivingTestPackage } from "@/components/home/DrivingTestPackage";

// Mapped assets
const heroImage = "/slider-1.jpg";
const marvelDrivingSuccess = "/media__1771036906190.png";

const benefits = ["Learn in modern automatic vehicles", "Patient, experienced instructors", "Dual-controlled vehicles for safety", "Flexible scheduling options", "Progress tracking and feedback", "Pick-up and drop-off available"];

export default function AutomaticLessons() {
    return (
        <>
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={heroImage} alt="Automatic driving lessons" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e5128]/95 via-[#1e5128]/85 to-[#1e5128]/60" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div initial={{
                            opacity: 0,
                            y: 30
                        }} animate={{
                            opacity: 1,
                            y: 0
                        }} className="max-w-2xl text-white">
                            <span className="inline-block px-4 py-2 bg-[#fbbf24] text-black rounded-full text-sm font-bold mb-6">
                                Automatic Transmission Only
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                                Automatic Driving Lessons
                            </h1>
                            <p className="text-lg text-white/90 mb-6">
                                Learn to drive stress-free in our modern automatic vehicles.
                                Professional instruction tailored to beginners.
                            </p>

                            {/* Important Notice */}
                            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg mb-8 border border-white/20">
                                <AlertCircle className="h-6 w-6 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                                <p className="text-white/90">
                                    <strong>Please Note:</strong> We exclusively offer automatic transmission lessons.
                                    Manual transmission lessons are not available.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-[#fbbf24] hover:bg-[#d97706] text-black font-bold text-lg h-14 px-8" asChild>
                                    <Link href="/book">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Book Online Now
                                    </Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8" asChild>
                                    <Link href="/contact">Enquire First</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Service Area Banner */}
                <section className="py-3 bg-[#e8e9eb] border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-[#1e5128]">
                            <MapPin className="h-4 w-4" />
                            <span>Available in <strong>Penshurst, Hurstville & Bexley</strong>, Sydney NSW</span>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-16 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <motion.div initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-[#1e5128] p-8 text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Driving Lessons & Support</h2>
                                    <p className="text-white/90">For Beginner Learners</p>
                                </div>
                                <div className="p-8 text-center">
                                    <div className="mb-6">
                                        <span className="text-6xl md:text-7xl font-extrabold text-[#1e5128]">$65</span>
                                        <span className="text-2xl text-gray-500">/hour</span>
                                    </div>
                                    <p className="text-lg text-gray-600 mb-8 whitespace-pre-line leading-relaxed">
                                        Tailored one on one driving lessons.
                                        <br />
                                        Patient, experienced and supportive instructors.
                                        <br />
                                        Assistance for learners with physical, intellectual, psychosocial and developmental disabilities.
                                        <br />
                                        Confidence building and safe driving skills.
                                    </p>
                                    <Button className="w-full max-w-md bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 text-lg" asChild>
                                        <Link href="/book">
                                            <Calendar className="h-5 w-5 mr-2" />
                                            Book Your Lesson Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Why Automatic? */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} className="max-w-4xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Why Learn in an Automatic?</h2>
                            <p className="text-gray-600 mb-8">
                                Automatic vehicles are the future of driving. They're easier to learn, safer to operate,
                                and increasingly the standard choice for Australian drivers.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[{
                                    title: "Easier to Learn",
                                    desc: "Focus on the road, not the clutch. Master driving faster."
                                }, {
                                    title: "Less Stressful",
                                    desc: "No stalling at traffic lights. Smooth, confident driving."
                                }, {
                                    title: "Future-Proof",
                                    desc: "Electric vehicles are automatic. Learn the skill of the future."
                                }].map(item => <div key={item.title} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-2 text-[#1e5128]">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>)}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="py-20 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <motion.div initial={{
                                opacity: 0,
                                x: -30
                            }} whileInView={{
                                opacity: 1,
                                x: 0
                            }} viewport={{
                                once: true
                            }}>
                                <div className="inline-flex p-4 bg-[#1e5128] rounded-xl mb-6">
                                    <Car className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-gray-900">Driving Lessons & Support</h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Start your driving journey with confidence in our modern automatic vehicles.
                                    Perfect for first-time drivers who want a stress-free learning experience.
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-gray-900">What's included:</h4>
                                    <ul className="space-y-2">
                                        {benefits.map(benefit => <li key={benefit} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-[#1e5128] flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>)}
                                    </ul>
                                </div>

                                <div className="p-4 bg-white rounded-lg mb-6 border border-gray-200">
                                    <h4 className="font-semibold mb-2 text-[#1e5128]">Who is this for?</h4>
                                    <p className="text-gray-600 text-sm">
                                        First-time drivers, nervous learners, and anyone new to Australian roads.
                                    </p>
                                </div>

                                <Button className="bg-[#1e5128] hover:bg-[#153e1e] text-white font-bold h-14 px-8 text-lg" asChild>
                                    <Link href="/book">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Book Your Lesson - $65/hour
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div initial={{
                                opacity: 0,
                                x: 30
                            }} whileInView={{
                                opacity: 1,
                                x: 0
                            }} viewport={{
                                once: true
                            }} className="relative">
                                <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                                    <img
                                        src={marvelDrivingSuccess}
                                        alt="Marvel Driving student success"
                                        loading="lazy"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-[#fbbf24] p-6 rounded-xl shadow-lg">
                                    <p className="font-bold text-3xl text-black">$65</p>
                                    <p className="text-sm text-black/80">per hour</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Driving Test Package */}
                <DrivingTestPackage />

                {/* Important Notice */}
                <section className="py-12 bg-red-50 text-red-900">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-4 text-center">
                            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                            <p className="text-lg">
                                <strong>Important:</strong> Marvel Driving School exclusively offers automatic transmission lessons.
                                We do not provide manual transmission driving instruction.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[#1e5128]">
                    <div className="container mx-auto px-4">
                        <motion.div initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} className="text-center max-w-3xl mx-auto text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ready to Start Your Driving Journey?
                            </h2>
                            <p className="text-lg text-white/90 mb-8">
                                Book your automatic driving lesson online today at just $65 per hour.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button className="bg-[#fbbf24] hover:bg-[#d97706] text-black font-bold text-lg h-14 px-8" asChild>
                                    <Link href="/book">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        Book Online Now
                                    </Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg h-14 px-8" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
