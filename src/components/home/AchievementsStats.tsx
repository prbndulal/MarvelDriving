"use client";
import { motion } from "framer-motion";
import { Ribbon, Trophy, CheckCircle, Shield } from "lucide-react";

const stats = [
    { value: "500+", label: "Happy Students" },
    { value: "95%", label: "Pass Rate" },
    { value: "5+", label: "Years Experience" },
    { value: "24/7", label: "Support" },
];

const certifications = [
    "NDIS Registered",
    "RMS Approved",
    "Fully Insured"
];

export function AchievementsStats() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#1e5128] rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    {/* Top Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full border-2 border-[#fbbf24] flex items-center justify-center text-[#fbbf24]">
                            <Ribbon className="h-8 w-8" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="bg-[#b45309]/80 px-2 mr-2 rounded-sm inline-block skew-x-[-10deg]">Our</span>
                        Achievements
                    </h2>
                    <p className="text-white/80 italic mb-16 text-lg font-light tracking-wide">Building success stories every day</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-[#fbbf24] mb-4 drop-shadow-sm">{stat.value}</div>
                                <div className="text-lg font-medium tracking-wide mb-4">{stat.label}</div>
                                <div className="w-16 h-1 bg-[#fbbf24] rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="w-full h-px bg-white/10 max-w-4xl mx-auto mb-12" />

                    {/* Certifications */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-8">Certified & Accredited</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {certifications.map((cert) => (
                                <div key={cert} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-white/20 transition-colors">
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
