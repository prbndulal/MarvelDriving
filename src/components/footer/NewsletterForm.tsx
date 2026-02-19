"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        console.log("Newsletter subscription for:", email);
        alert("Thanks for subscribing!");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-input text-foreground h-10"
                required
            />
            <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4">
                Subscribe
            </Button>
        </form>
    );
}
