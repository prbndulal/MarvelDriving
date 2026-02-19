"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Car, Users, MapPin } from "lucide-react";

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: "lessons" | "vehicles" | "ndis" | "team";
}

const galleryImages: GalleryImage[] = [
    { id: 1, src: "/slider-1.jpg", alt: "Professional driving lesson in progress", category: "lessons" },
    { id: 2, src: "/slider-2.jpg", alt: "NDIS transport service", category: "ndis" },
    { id: 3, src: "/slider-3.jpg", alt: "Student learning automatic driving", category: "lessons" },
    { id: 4, src: "/hero-dashboard.jpg", alt: "Wheelchair accessible transport", category: "ndis" },
    { id: 5, src: "/slider-1.jpg", alt: "Our modern automatic vehicle fleet", category: "vehicles" },
    { id: 6, src: "/instructor.jpg", alt: "Marvel Driving team", category: "team" },
    { id: 7, src: "/slider-2.jpg", alt: "Highway driving practice", category: "lessons" },
    { id: 8, src: "/slider-3.jpg", alt: "Community transport assistance", category: "ndis" },
    { id: 9, src: "/hero-dashboard.jpg", alt: "Safe dual-control vehicle", category: "vehicles" },
];

const categories = [
    { id: "all", label: "All", icon: null },
    { id: "lessons", label: "Driving Lessons", icon: Car },
    { id: "vehicles", label: "Our Vehicles", icon: Car },
    { id: "ndis", label: "NDIS Services", icon: Users },
    { id: "team", label: "Our Team", icon: MapPin },
];

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredImages = selectedCategory === "all"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = "hidden";
        }
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = "auto";
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <img
                    src="/contact-hero.jpg"
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
                            Gallery
                        </h1>
                        <p className="text-lg text-white/90">
                            Take a look at our automatic driving lessons, modern vehicle fleet,
                            NDIS transport services, and our dedicated team in action.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-8 bg-gray-50 sticky top-0 z-40 border-b border-gray-200">
                <div className="container px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedCategory === cat.id
                                        ? "bg-[#1e5128] text-white"
                                        : "bg-white text-gray-700 hover:bg-[#1e5128]/10 border border-gray-200"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container px-4 md:px-8">
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e5128]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="font-medium text-sm">{image.alt}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-600">No images found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e5128] mb-4">Watch Us in Action</h2>
                        <p className="text-lg text-gray-600">
                            See what it's like to learn with Marvel Driving School.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-video bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center border border-gray-200">
                            <div className="text-center p-8">
                                <Car className="h-20 w-20 text-[#1e5128]/30 mx-auto mb-4" />
                                <p className="text-gray-600 font-medium">Video content coming soon</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    We're working on creating exciting video content to showcase our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && filteredImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                            aria-label="Close gallery"
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {/* Navigation Buttons */}
                        {filteredImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-10 w-10" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-10 w-10" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-5xl max-h-[85vh] p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={filteredImages[currentImageIndex].src}
                                alt={filteredImages[currentImageIndex].alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                            />
                            <p className="text-white/80 text-center mt-4">
                                {filteredImages[currentImageIndex].alt}
                            </p>
                            <p className="text-white/50 text-center text-sm mt-1">
                                {currentImageIndex + 1} / {filteredImages.length}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
