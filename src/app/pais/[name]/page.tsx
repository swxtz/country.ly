import { Country } from "@/app/page";
import { CountryCard } from "@/components/CountryCard";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CountryParams {
    params: {
        name: string;
    };
}

async function getCountryByName(name: string): Promise<Country> {
    const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    return (await response.json())[0];
}

async function getCountryBordersByName(name: string) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();

    const country = countries.find(
        (country: Country) => country.name.common === name
    )!;

    return country.borders?.map((border) => {
        const borderCountry = countries.find(
            (country) => country.cca3 === border
        )!;
        return {
            name: borderCountry.name.common,
            ptName: borderCountry.translations.por.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt,
        };
    });
}

export default async function CountryPage({ params: { name } }: CountryParams) {
    const country = await getCountryByName(name);
    const borderCountries = await getCountryBordersByName(decodeURI(name));

    const formatter = Intl.NumberFormat("en", { notation: "compact" });

    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">
                {country.translations.por.common}
            </h1>
            <Link href="/" className="flex gap-2 items-center py-2">
                <MoveLeft width={24} height={24} /> Voltar
            </Link>
            <article className="flex flex-row justify-between min-w-full p-10 bg-white rounded-xl">
                <section>
                    {country.capital && (
                        <h2 className=" text-xl text-gray-800 mb-3">
                            <b>🏙️ Capital:</b> - {country.capital}
                        </h2>
                    )}
                    <h2 className=" text-xl text-gray-800 mb-3">
                        <b>🗺️ Continente:</b> - {country.region}
                        {country.subregion && `- ${country.subregion}`}
                    </h2>
                    <h2 className=" text-xl text-gray-800 mb-3">
                        <b>👨‍👩‍👧‍👦 População:</b>{" "}
                        {formatter.format(country.population)}
                    </h2>
                    {country.languages && (
                        <h2 className=" text-xl text-gray-800 mb-3">
                            <b>🗣️ Línguas faladas:</b>
                            <br />
                            {Object.values(country.languages).map((lang) => (
                                <span
                                    key={lang}
                                    className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
                                >
                                    {lang}
                                </span>
                            ))}
                        </h2>
                    )}
                </section>
                <div className="relative h-auto w-96 shadow-xl rounded-xl overflow-hidden">
                    <Image
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        fill
                        className="object-cover"
                    />
                </div>
            </article>
            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-800">
                    Países que fazem fronteira
                </h3>
                <div className="grid grid-cols-5 w-full gap-2">
                    {borderCountries?.map((border) => (
                        <CountryCard key={border.name} {...border} />
                    ))}
                </div>
            </section>
        </section>
    );
}
