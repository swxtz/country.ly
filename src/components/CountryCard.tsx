import Image from "next/image";
import Link from "next/link";

interface CountryCardProps {
    name: string;
    flag: string;
    flagAlt: string;
    ptName: string;

}

export function CountryCard({ name, flag, flagAlt, ptName }: CountryCardProps) {
    return (
        <Link href={`/pais/${name}`}>
            <article className="h-64 min-w-full bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl">
                <div className="relative w-full h-40 p-2 overflow-hidden rounded-lg">
                    <Image
                        src={flag}
                        alt={flagAlt}
                        fill
                        className="object-cover"
                    />
                </div>
                <h1 className="font-bold text-xl text-center mt-1">
                    {ptName}
                </h1>
            </article>
        </Link>
    );
}
