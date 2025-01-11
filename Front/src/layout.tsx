import React from "react";
import Navi from "./components/ui/navi";
import { BackgroundDots } from "./components/ui/BackgroundDots";
import { Toaster } from "./components/ui/sonner";

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <BackgroundDots />
            <Navi />
            <main className="relative">
                {children}
            </main>
            <Toaster />
        </>
    )
}