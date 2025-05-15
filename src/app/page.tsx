"use client"

import {Button} from "@/components/ui/button";
import Aurora from "@/components/Aurora";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 w-full h-1/2 top-0 overflow-hidden">
                <Aurora 
                    colorStops={["#9900ff", "#d666ff", "#9900ff"]}
                    blend={0.5}
                    amplitude={0.45}
                    speed={1}
                />
            </div>
            <div className="text-center z-10 px-4 max-w-2xl">
                <h1 className="text-6xl font-bold text-white mb-4 animate-pulse font-display">Find Your Daily Spark.</h1>
                <p className="text-lg text-white mb-8"> Explore motivational, inspirational, and humorous quotes <br />tailored by theme. Save your favorites and get inspired every day.</p>
                <Link href="/source">
                    <Button variant={"outline"} className="bg-black border-white text-white hover:bg-white hover:text-black h-15  px-8 py-2">Get Started</Button>
                </Link>
            </div>
        </div>
    )
}
