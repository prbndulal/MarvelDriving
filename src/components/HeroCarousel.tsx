"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/slider-1.jpg",
    "/slider-2.jpg",
    "/slider-3.jpg",
];

export function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={index}
                    src={images[index]}
                    alt="Hero background"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full object-cover"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e5128]/90 via-[#1e5128]/70 to-transparent" />
        </div>
    );
}
