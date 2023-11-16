"use client";   

import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">
                Ooops! ocorreu um erro ao exibir esse país.
            </h1>
            <Link href="/" className="flex gap-2 items-center py-2 text-2xl">
                <MoveLeft width={48} height={48} /> Voltar
            </Link>
        </div>
    );
}