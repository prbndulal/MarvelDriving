import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    const packages = [
        {
            name: "Starter Package",
            price: "$299",
            description: "Perfect for beginners getting started.",
            features: [
                "5 Hours of Behind-the-Wheel Training",
                "Online Theory Course Access",
                "Dual-Control Vehicle",
                "Road Test Preparation",
            ],
            cta: "Get Started",
        },
        {
            name: "Standard Package",
            price: "$499",
            description: "Most popular for comprehensive learning.",
            features: [
                "10 Hours of Behind-the-Wheel Training",
                "Online Theory Course Access",
                "Defensive Driving Module",
                "Simulated Road Test",
                "Free Pick-up & Drop-off",
            ],
            cta: "Choose Standard",
            featured: true,
        },
        {
            name: "Premium Package",
            price: "$899",
            description: "Complete preparation for guaranteed success.",
            features: [
                "20 Hours of Behind-the-Wheel Training",
                "Advanced Theory & Hazard Perception",
                "Test Day Car Rental & Insurance",
                "Unlimited Mock Tests",
                "Priority Scheduling",
                "Highway Driving Lesson",
            ],
            cta: "Go Premium",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter mb-4">Transparent Pricing</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the package that fits your needs. No hidden fees, just quality instruction.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg, i) => (
                            <Card
                                key={i}
                                className={`flex flex-col ${pkg.featured
                                        ? "border-primary shadow-lg scale-105 relative z-10"
                                        : "border-border shadow-sm hover:shadow-md transition-shadow"
                                    }`}
                            >
                                {pkg.featured && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                    <CardDescription>{pkg.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="text-4xl font-bold mb-6">
                                        {pkg.price}
                                        <span className="text-base font-normal text-muted-foreground">/package</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {pkg.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={pkg.featured ? "default" : "outline"}
                                        size="lg"
                                        asChild
                                    >
                                        <Link href="/contact">{pkg.cta}</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Do you offer pick-up and drop-off services?",
                                a: "Yes, for our Standard and Premium packages, we offer free pick-up and drop-off within our service area.",
                            },
                            {
                                q: "Can I pay in installments?",
                                a: "We offer flexible payment plans for our Standard and Premium packages. Contact us for details.",
                            },
                            {
                                q: "What if I need to cancel a lesson?",
                                a: "We require 24 hours notice for cancellations. Late cancellations may incur a fee.",
                            },
                        ].map((faq, i) => (
                            <Card key={i} className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
