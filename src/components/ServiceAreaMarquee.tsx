"use client";
import { MapPin } from "lucide-react";

const areas = [
    "SYDNEY, NSW", "PENSHURST", "HURSTVILLE", "BEXLEY", "KINGSGROVE", "BEVERLY HILLS",
    "NARWEE", "RIVERWOOD", "PEAKHURST", "MORTDALE", "OATLEY",
    "CARLTON", "ALLAWAH", "KOGARAH", "ROCKDALE", "BANKSIA",
    "ARNCLIFFE", "WOLLI CREEK", "EARLWOOD", "BARDWELL PARK"
];

export function ServiceAreaMarquee() {
    return (
        <div className="bg-[#1e5128] text-white py-2.5 overflow-hidden whitespace-nowrap relative z-20 border-b border-[#ffffff]/10">
            <div className="flex animate-marquee items-center">
                {[...areas, ...areas, ...areas].map((area, index) => (
                    <div key={index} className="flex items-center mx-6 opacity-90 hover:opacity-100 transition-opacity">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-[#fbbf24]" />
                        <span className="text-xs font-bold tracking-wider">
                            {area}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
