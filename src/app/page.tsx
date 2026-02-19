"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Car, Users, ChevronRight, Home as HomeIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceAreaMarquee } from "@/components/ServiceAreaMarquee";
import { GetInTouchSection } from "@/components/home/GetInTouchSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AchievementsStats } from "@/components/home/AchievementsStats";
import { DrivingTestPackage } from "@/components/home/DrivingTestPackage";
import { DrivingLessonPricing } from "@/components/home/DrivingLessonPricing";
import { P1LicenceGuide } from "@/components/home/P1LicenceGuide";
import { TestimonialsMarquee } from "@/components/home/TestimonialsMarquee";

// Static asset import not available, using placeholder or public path
const ndisImage = "/slider-2.jpg"; // Using an available image as placeholder matching the context

const services = [
  {
    icon: Car,
    title: "Driving Lessons & Support",
    description: "Beginner automatic driving lessons at $65/hour with patient, supportive instructors.",
    link: "/services",
    color: "bg-[#1e5128]"
  },
  {
    icon: MapPin,
    title: "Transport Services",
    description: "Safe, reliable transport to appointments, therapies, work, education and community activities.",
    link: "/services",
    color: "bg-[#dc2626]"
  },
  {
    icon: HomeIcon,
    title: "Daily Living Support",
    description: "Assistance with personal activities, daily tasks and routine management to encourage independence.",
    link: "/services",
    color: "bg-[#b45309]"
  },
  {
    icon: Users,
    title: "Community Participation",
    description: "Support to engage in social, recreational and community activities, building confidence and skills.",
    link: "/services",
    color: "bg-[#1e5128]"
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Service Area Marquee */}
      <ServiceAreaMarquee />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroCarousel />

        <div className="container relative z-10 py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 bg-[#fbbf24] text-[#1e5128] rounded-full text-sm font-bold mb-6 tracking-wide"
            >
              NDIS Registered Provider
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Empowering Independence through{" "}
              <span className="text-[#fbbf24]">Safe & Supportive</span> Services
            </h1>

            <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed max-w-2xl drop-shadow-md font-medium">
              Marvel Driving and Transport Pty Ltd is an Australian owned NDIS registered provider
              supporting people of all abilities to travel safely, confidently and independently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-[#fbbf24] text-[#1e5128] hover:bg-[#f59e0b] font-bold h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all" asChild>
                <Link href="/book">
                  Book a Service
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white/10 h-14 px-8 text-lg rounded-full font-bold backdrop-blur-sm" asChild>
                <Link href="/services">Explore NDIS Services</Link>
              </Button>
            </div>

            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm mt-4 text-white bg-[#1e5128]/80 font-bold backdrop-blur-md border border-[#fbbf24]/30">
              <MapPin className="h-4 w-4 text-[#fbbf24]" />
              Serving Penshurst, Hurstville & Bexley
            </span>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1e5128] tracking-tight">Our Services</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Whether you're learning to drive, travelling to appointments, going to community activities,
              education, work or simply getting out to enjoy life — we are here to support you every step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={service.link} className="block h-full p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center text-center border border-gray-100">
                  <div className={`inline-flex p-5 ${service.color} rounded-2xl mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#1e5128] transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-sm">{service.description}</p>
                  <span className="inline-flex items-center text-[#1e5128] font-bold text-sm group-hover:gap-2 transition-all mt-auto uppercase tracking-wide">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#e8e9eb]">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 bg-[#1e5128] text-white rounded-full text-sm font-bold mb-6 tracking-wide shadow-sm">
                Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-[#0a2f14] leading-tight">
                Why Choose Marvel Driving and Transport?
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Our dedicated team is highly experienced, compassionate and professionally trained
                to meet the diverse needs of participants, families and support networks. We take
                pride in delivering reliable, respectful and person-centred services that promote
                independence, confidence and dignity.
              </p>
              <ul className="space-y-5 mb-10">
                {whyChooseUs.map(item => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-[#1e5128] mt-1 shrink-0">
                      <ChevronRight className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-semibold text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-[#dc2626] text-white hover:bg-[#b91c1c] h-14 px-8 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white z-10">
                <img
                  src={ndisImage}
                  alt="Care worker helping client"
                  className="w-full h-full object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 bg-[#fbbf24] p-8 rounded-3xl shadow-xl z-20 max-w-[240px]">
                <p className="font-extrabold text-5xl text-[#1e5128] mb-1">100%</p>
                <p className="text-sm font-bold text-[#1e5128] uppercase tracking-wider">Participant Focused</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Driving Test Package */}
      <DrivingTestPackage />

      {/* Driving Lesson Pricing + P1 Licence Guide (side by side) */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <DrivingLessonPricing compact />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <P1LicenceGuide compact />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <AchievementsStats />

      {/* Testimonials */}
      <TestimonialsMarquee />

      {/* Get In Touch Section */}
      <div id="contact">
        <GetInTouchSection />
      </div>
    </div>
  );
}
