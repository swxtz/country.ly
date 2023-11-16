import Image from "next/image";
import Link from "next/link";

export interface Country {
    name: {
        common: string;
    };

    translations: {
        por: {
            common: string;
        };
    };

    flags: {
        svg: string;
        alt: string;
    };

    capital: string;
    region: string;
    subregion: string;
    population: number;
    languages?: {
        [key: string]: string;
    };


}

async function getContries(): Promise<Country[]> {
    const response = await fetch("https://restcountries.com/v3.1/all");
    return response.json();
}

export default async function Home() {
    const countries = await getContries();

    return (
        <section className="grid grid-cols-5 w-full container gap-2 mt-16">
            {countries.map((country) => (
                <Link
                    href={`/pais/${country.name.common}`}
                    key={country.name.common}
                >
                    <article className="h-64 min-w-full bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl">
                        <div className="relative w-full h-40 p-2 overflow-hidden rounded-lg">
                            <Image
                                src={country.flags.svg}
                                alt={country.flags.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h1 className="font-bold text-xl text-center mt-1">
                            {country.translations.por.common}
                        </h1>
                    </article>
                </Link>
            ))}
        </section>
    );
}
