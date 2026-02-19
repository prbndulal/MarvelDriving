"use client";

import Link, { LinkProps } from "next/link";
import React from "react";

interface ScrollLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

export function ScrollLink({ children, ...props }: ScrollLinkProps) {
    // In Next.js, Link handles scrolling by default for hash links, 
    // and page transitions for internal links.
    return (
        <Link {...props}>
            {children}
        </Link>
    );
}
