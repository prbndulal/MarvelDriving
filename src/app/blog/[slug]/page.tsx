"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, Tag, User, CheckCircle, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostData {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    content: React.ReactNode;
}

const blogPostsContent: Record<string, BlogPostData> = {
    "driving-test-routes-sydney": {
        id: "driving-test-routes-sydney",
        title: "Top 5 Driving Test Routes in Sydney's St George Area",
        excerpt: "Discover the most common driving test routes in Hurstville, Penshurst and surrounding suburbs.",
        category: "Sydney Driving",
        author: "Marvel Driving",
        date: "January 28, 2026",
        readTime: "6 min read",
        image: "/slider-1.jpg",
        content: (
            <>
                <p className="text-lg leading-relaxed text-gray-600 mb-8">
                    Preparing for your driving test in Sydney's St George area? Understanding the common test routes can give you a significant advantage. Our experienced instructors at Marvel Driving have guided hundreds of learners through these exact routes, and here's what you need to know.
                </p>

                <h2>1. Hurstville to Penshurst Loop</h2>
                <p>
                    This popular route takes you through Forest Road, one of the busiest shopping strips in the St George area. Expect heavy traffic, pedestrian crossings, and tight parallel parking spots. The test often includes turning onto Queens Road and navigating back via Railway Parade.
                </p>
                <div className="bg-[#fbbf24]/10 border-l-4 border-[#fbbf24] p-4 rounded-r-lg my-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-[#fbbf24] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700"><strong>Watch out:</strong> School zones along Forest Road are active from 8:00–9:30 AM and 2:30–4:00 PM. Missing one can result in an automatic fail.</p>
                    </div>
                </div>

                <h2>2. Bexley Road Circuit</h2>
                <p>
                    Starting from the Hurstville Service Centre, this route heads down Bexley Road towards Rockdale. You'll encounter multi-lane roundabouts, bus zones, and several give-way intersections. The key challenge here is lane discipline — examiners pay close attention to how you manage lane changes.
                </p>
                <h3>Key skills tested:</h3>
                <ul>
                    <li>Multi-lane roundabout navigation</li>
                    <li>Merging into traffic from side streets</li>
                    <li>Speed management through residential zones</li>
                    <li>Correct use of indicators at roundabouts</li>
                </ul>

                <h2>3. King Georges Road Route</h2>
                <p>
                    This is considered one of the more challenging routes due to the high volume of traffic on King Georges Road. You'll need to demonstrate confident merging, proper mirror checks, and the ability to handle traffic lights with turning arrows. The route typically loops through Beverly Hills and back.
                </p>

                <h2>4. Connells Point Residential Route</h2>
                <p>
                    A calmer route that winds through the residential streets of Connells Point and South Hurstville. Don't be fooled by the quiet streets — examiners use this route to test your ability to handle narrow roads, parked cars on both sides, and T-intersections with limited visibility.
                </p>
                <h3>Preparation tips for this route:</h3>
                <ol>
                    <li>Practice your three-point turns in quiet cul-de-sacs</li>
                    <li>Always check for driveways and pedestrians stepping onto the road</li>
                    <li>Maintain the 50 km/h residential speed limit consistently</li>
                    <li>Use the kerb-side stop technique when asked to pull over</li>
                </ol>

                <h2>5. Sans Souci & Kogarah Bay Loop</h2>
                <p>
                    This scenic route takes you through Sans Souci towards Kogarah Bay. It includes a mix of 50 and 60 km/h zones, roundabouts of varying sizes, and the challenging Rocky Point Road intersection. This route tests your overall driving confidence and road awareness.
                </p>

                <hr />

                <h2>General Test Preparation Tips</h2>
                <p>
                    Regardless of which route you end up on, these preparation strategies will help you pass your driving test in the St George area:
                </p>

                <div className="grid gap-4 my-6">
                    {[
                        { title: "Book lessons at test time", desc: "Practice driving at the same time of day as your test to experience similar traffic conditions." },
                        { title: "Master the pre-drive checks", desc: "Adjust mirrors, seat, and steering wheel before starting. Examiners notice these details." },
                        { title: "Practice commentary driving", desc: "Narrate what you see and plan to do. This builds hazard awareness and decision-making skills." },
                        { title: "Know the speed limits", desc: "Memorise the default speed limits: 50 km/h in residential, 60 km/h on main roads unless signed otherwise." },
                        { title: "Stay calm at intersections", desc: "Take your time at complex intersections. It's better to wait for a safe gap than to rush." },
                        { title: "Check blind spots consistently", desc: "Head checks before every lane change, merge, and when pulling away from the kerb." },
                    ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-[#1e5128] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">{tip.title}</p>
                                <p className="text-sm text-gray-600">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Common Mistakes That Fail Learners</h2>
                <p>
                    Based on our years of experience teaching in the St George area, here are the most common mistakes that lead to test failures:
                </p>
                <ul>
                    <li><strong>Not checking mirrors often enough</strong> — Examiners expect regular mirror checks every 8–10 seconds</li>
                    <li><strong>Rolling through stop signs</strong> — You must come to a complete stop with zero wheel movement</li>
                    <li><strong>Incorrect roundabout signalling</strong> — Signal left when exiting, even if going straight</li>
                    <li><strong>Driving too slowly</strong> — Under-speed driving is just as dangerous as speeding and can fail you</li>
                    <li><strong>Poor observation at intersections</strong> — Always look left-right-left before proceeding</li>
                </ul>

                <div className="bg-[#1e5128]/5 border border-[#1e5128]/20 rounded-xl p-6 my-8">
                    <div className="flex items-start gap-3">
                        <MapPin className="h-6 w-6 text-[#1e5128] mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Practice These Routes?</h3>
                            <p className="text-gray-600 mb-4">
                                Marvel Driving offers specialised test-route practice lessons with instructors who know every corner of the St George area. Book a lesson today and drive the actual test routes before your big day.
                            </p>
                            <Button className="bg-[#1e5128] hover:bg-[#164019] text-white" asChild>
                                <Link href="/book">Book a Practice Lesson</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        ),
    },
    "sydney-traffic-peak-hours": {
        id: "sydney-traffic-peak-hours",
        title: "Navigating Sydney Traffic: Best Times to Drive and Practice",
        excerpt: "Understanding Sydney's peak hours is crucial for new drivers.",
        category: "Sydney Driving",
        author: "Marvel Driving",
        date: "January 25, 2026",
        readTime: "5 min read",
        image: "/slider-2.jpg",
        content: (
            <>
                <p className="text-lg leading-relaxed text-gray-600 mb-8">
                    Sydney's traffic can be intimidating for new drivers. Understanding when the roads are busiest — and when they're quieter — helps you build confidence gradually and log your hours more effectively.
                </p>
                <h2>Sydney's Peak Traffic Hours</h2>
                <p>Morning peak runs from <strong>7:00 AM to 9:30 AM</strong>, and the evening peak from <strong>4:00 PM to 7:00 PM</strong>. In the St George area, key roads like King Georges Road, Forest Road, and the Princes Highway become heavily congested during these times.</p>

                <h2>Best Times to Practice</h2>
                <h3>For beginners:</h3>
                <ul>
                    <li><strong>Weekend mornings (7–9 AM)</strong> — Roads are quieter with less commercial traffic</li>
                    <li><strong>Weekday mid-morning (10 AM–12 PM)</strong> — School drop-off traffic has cleared</li>
                    <li><strong>Sunday afternoons</strong> — Ideal for highway practice on the M5</li>
                </ul>

                <h3>For intermediate learners:</h3>
                <ul>
                    <li><strong>Weekday early afternoons (1–3 PM)</strong> — Moderate traffic for building confidence</li>
                    <li><strong>Saturday midday</strong> — Good mix of traffic types around shopping centres</li>
                </ul>

                <h3>For test preparation:</h3>
                <p>Practice at the same time your test is booked. This ensures you're familiar with the exact traffic conditions you'll face.</p>

                <h2>Areas to Avoid as a Beginner</h2>
                <ul>
                    <li>King Georges Road during peak hours</li>
                    <li>Forest Road, Hurstville on Saturday mornings (market traffic)</li>
                    <li>The M5 on-ramp at Bexley Road during evening peak</li>
                </ul>

                <div className="bg-[#1e5128]/5 border border-[#1e5128]/20 rounded-xl p-6 my-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Need Expert Guidance?</h3>
                    <p className="text-gray-600 mb-4">Our instructors know the best times and places to practice in the St George area. Let us create a personalised practice plan for you.</p>
                    <Button className="bg-[#1e5128] hover:bg-[#164019] text-white" asChild><Link href="/book">Book a Lesson</Link></Button>
                </div>
            </>
        ),
    },
    "ndis-transport-services-sydney": {
        id: "ndis-transport-services-sydney",
        title: "NDIS Transport Services in Sydney: What You Need to Know",
        excerpt: "A comprehensive guide to NDIS transport services in Sydney's St George region.",
        category: "NDIS Services",
        author: "Marvel Driving",
        date: "January 22, 2026",
        readTime: "7 min read",
        image: "/slider-3.jpg",
        content: (
            <>
                <p className="text-lg leading-relaxed text-gray-600 mb-8">
                    Navigating NDIS transport funding can be confusing. This guide breaks down everything you need to know about accessing transport services through your NDIS plan in Sydney's St George area.
                </p>

                <h2>What NDIS Transport Funding Covers</h2>
                <p>NDIS transport funding helps participants get to and from activities that are directly related to their NDIS goals. This can include:</p>
                <ul>
                    <li>Travel to medical appointments and therapy sessions</li>
                    <li>Transport to work, education, or training</li>
                    <li>Getting to community and social activities</li>
                    <li>Travel for daily living activities like shopping</li>
                </ul>

                <h2>How Transport Is Funded</h2>
                <p>Transport can be funded under three categories in your NDIS plan:</p>
                <ol>
                    <li><strong>Core Supports — Transport</strong>: A specific budget line for transport costs</li>
                    <li><strong>Capacity Building</strong>: Funding for learning to use public transport or drive independently</li>
                    <li><strong>Core Supports — Assistance with Daily Life</strong>: When transport is part of a broader support service</li>
                </ol>

                <h2>Marvel Driving's NDIS Transport Services</h2>
                <p>As a registered NDIS provider in Sydney's St George area, Marvel Driving offers:</p>
                <div className="grid gap-4 my-6">
                    {[
                        { title: "Community Transport", desc: "Door-to-door transport for community activities, social events, and appointments across Sydney." },
                        { title: "Driving Lessons", desc: "NDIS-funded driving lessons to help participants work towards independent travel and licencing." },
                        { title: "Travel Training", desc: "Support and coaching to help participants learn to use public transport independently." },
                    ].map((service, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-[#1e5128] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">{service.title}</p>
                                <p className="text-sm text-gray-600">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#1e5128]/5 border border-[#1e5128]/20 rounded-xl p-6 my-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Get Started with NDIS Transport</h3>
                    <p className="text-gray-600 mb-4">Contact our team to discuss how we can support your NDIS transport needs in the St George area.</p>
                    <Button className="bg-[#1e5128] hover:bg-[#164019] text-white" asChild><Link href="/contact">Enquire Now</Link></Button>
                </div>
            </>
        ),
    },
};

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = slug ? blogPostsContent[slug] : null;

    if (!post) {
        return (
            <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
                <section className="py-20 md:py-32 bg-gradient-to-br from-[#1e5128] to-[#164019]">
                    <div className="container px-4 md:px-8 text-center text-white">
                        <h1 className="text-4xl font-extrabold mb-4">Article Not Found</h1>
                        <p className="text-white/80 mb-8">This blog post doesn't exist or is coming soon.</p>
                        <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e5128] font-bold" asChild>
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
            {/* Hero */}
            <section className="relative">
                <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end">
                    <div className="container px-4 md:px-8 pb-8 md:pb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4">
                                <ChevronLeft className="h-4 w-4" /> Back to Blog
                            </Link>
                            <span className="inline-flex items-center gap-2 text-[#fbbf24] font-medium mb-3">
                                <Tag className="h-4 w-4" /> {post.category}
                            </span>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-12 md:py-16 bg-white">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto prose prose-lg prose-headings:text-[#1e5128] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-[#1e5128] prose-ul:space-y-2 prose-ol:space-y-2 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-hr:my-10 prose-hr:border-gray-200"
                    >
                        {post.content}
                    </motion.div>
                </div>
            </article>

            {/* Related / CTA */}
            <section className="py-16 bg-gradient-to-br from-[#1e5128] to-[#164019]">
                <div className="container px-4 md:px-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Want More Driving Tips?</h2>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">
                        Browse all our articles for expert advice on driving in Sydney, test preparation, and NDIS services.
                    </p>
                    <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e5128] font-bold" asChild>
                        <Link href="/blog">View All Articles</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
