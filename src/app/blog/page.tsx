"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        id: "driving-test-routes-sydney",
        title: "Top 5 Driving Test Routes in Sydney's St George Area",
        excerpt: "Discover the most common driving test routes in Hurstville, Penshurst and surrounding suburbs. Learn what to expect and how to prepare for your NSW driving test in the St George area.",
        category: "Sydney Driving",
        author: "Marvel Driving",
        date: "January 28, 2026",
        readTime: "6 min read",
        image: "/slider-1.jpg",
        featured: true,
    },
    {
        id: "sydney-traffic-peak-hours",
        title: "Navigating Sydney Traffic: Best Times to Drive and Practice",
        excerpt: "Understanding Sydney's peak hours is crucial for new drivers. Learn the best times to practice driving in Hurstville, Bexley and Penshurst to build your confidence safely.",
        category: "Sydney Driving",
        author: "Marvel Driving",
        date: "January 25, 2026",
        readTime: "5 min read",
        image: "/slider-2.jpg",
    },
    {
        id: "ndis-transport-services-sydney",
        title: "NDIS Transport Services in Sydney: What You Need to Know",
        excerpt: "A comprehensive guide to accessing NDIS transport services in Sydney's St George region. Understand your funding, provider options and how Marvel can support your transport needs.",
        category: "NDIS Services",
        author: "Marvel Driving",
        date: "January 22, 2026",
        readTime: "7 min read",
        image: "/slider-3.jpg",
    },
    {
        id: "parallel-parking-hurstville",
        title: "Mastering Parallel Parking in Hurstville: A Local's Guide",
        excerpt: "Hurstville's busy shopping strips require confident parallel parking. Our local instructors share tips specific to Forest Road, Queens Road and surrounding areas.",
        category: "Driving Tips",
        author: "Marvel Driving",
        date: "January 18, 2026",
        readTime: "4 min read",
        image: "/hero-dashboard.jpg",
    },
    {
        id: "roundabouts-sydney-guide",
        title: "Sydney Roundabouts: Rules and Common Mistakes to Avoid",
        excerpt: "From Hurstville's busy intersections to Bexley's multi-lane roundabouts, learn the NSW road rules and avoid the common mistakes that fail learner drivers.",
        category: "Road Safety",
        author: "Marvel Driving",
        date: "January 15, 2026",
        readTime: "5 min read",
        image: "/slider-1.jpg",
    },
    {
        id: "school-zones-sydney-fines",
        title: "Sydney School Zone Rules: Times, Speeds and Penalties",
        excerpt: "Avoid costly fines by understanding Sydney's school zone rules. Learn the times, speed limits and penalties that apply to school zones in NSW.",
        category: "Road Safety",
        author: "Marvel Driving",
        date: "January 12, 2026",
        readTime: "4 min read",
        image: "/slider-2.jpg",
    },
    {
        id: "rainy-driving-sydney",
        title: "Safe Driving in Sydney's Wet Weather: Essential Tips",
        excerpt: "Sydney's unpredictable rain can be challenging for new drivers. Learn how to handle wet roads, reduced visibility and hydroplaning in NSW conditions.",
        category: "Road Safety",
        author: "Marvel Driving",
        date: "January 8, 2026",
        readTime: "5 min read",
        image: "/slider-3.jpg",
    },
    {
        id: "nsw-driving-test-changes-2026",
        title: "NSW Driving Test Changes in 2026: What Learners Need to Know",
        excerpt: "Stay updated on the latest changes to NSW driving tests in 2026. From new testing criteria to updated road rules, prepare for your test with the latest information.",
        category: "Test Preparation",
        author: "Marvel Driving",
        date: "January 5, 2026",
        readTime: "6 min read",
        image: "/hero-dashboard.jpg",
    },
    {
        id: "ndis-driving-lessons-independence",
        title: "How NDIS Driving Lessons Support Your Independence in Sydney",
        excerpt: "Learn how NDIS-funded driving lessons through Marvel Driving can help Sydney participants gain independence and achieve their mobility goals.",
        category: "NDIS Services",
        author: "Marvel Driving",
        date: "January 2, 2026",
        readTime: "5 min read",
        image: "/slider-1.jpg",
    },
    {
        id: "m5-motorway-tips-learners",
        title: "First Time on the M5? A Learner's Guide to Sydney Motorways",
        excerpt: "Nervous about motorway driving? Our guide covers merging, lane changes and exits on the M5 and other Sydney motorways for learner drivers.",
        category: "Sydney Driving",
        author: "Marvel Driving",
        date: "December 28, 2025",
        readTime: "6 min read",
        image: "/slider-2.jpg",
    },
];

const categories = ["All", "Sydney Driving", "NDIS Services", "Road Safety", "Test Preparation", "Driving Tips"];

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <img
                    src="/faq.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1e5128]/70" />
                <div className="container px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Marvel Driving Blog
                        </h1>
                        <p className="text-lg text-white/90">
                            Driving tips, road safety updates, NDIS information, and news
                            from Marvel Driving School.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-6 bg-gray-50 border-b border-gray-200">
                <div className="container px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                        ? "bg-[#1e5128] text-white"
                                        : "bg-white text-gray-700 hover:bg-[#1e5128] hover:text-white border border-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-16">
                    <div className="container px-4 md:px-8">
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-[#fbbf24] text-[#1e5128] text-sm font-semibold rounded-full">
                                        Featured
                                    </span>
                                </div>
                            </div>

                            <div>
                                <span className="inline-flex items-center gap-2 text-[#1e5128] font-medium mb-4">
                                    <Tag className="h-4 w-4" />
                                    {featuredPost.category}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1e5128]">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {featuredPost.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {featuredPost.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {featuredPost.readTime}
                                    </span>
                                </div>
                                <Button className="bg-[#1e5128] hover:bg-[#164019] text-white" asChild>
                                    <Link href={`/blog/${featuredPost.id}`}>
                                        Read Article
                                        <ChevronRight className="h-5 w-5 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.article>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1e5128]">Latest Articles</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-[#1e5128]/90 text-white text-xs font-medium rounded-full">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#1e5128] transition-colors">
                                        <Link href={`/blog/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Load More */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button variant="outline" size="lg" className="border-[#1e5128] text-[#1e5128] hover:bg-[#1e5128] hover:text-white">
                            Load More Articles
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gradient-to-br from-[#1e5128] to-[#164019]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Stay Updated
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Get the latest driving tips, road safety updates, and Marvel Driving
                            news delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#fbbf24]"
                            />
                            <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e5128] font-bold">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
