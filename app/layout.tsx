import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentalida — Cabinet Dentaire Premium à Alger",
  description:
    "Cabinet dentaire premium à Hai El Badr, Kouba, Alger. Hollywood Smile, implants, orthodontie, laser. Votre sourire mérite l'excellence.",
  openGraph: {
    title: "Dentalida — Votre sourire mérite l'excellence",
    description:
      "Cabinet Dentaire Premium à Alger — Hollywood Smile, Implants, Laser, Orthodontie.",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Cabinet Dentaire Dentalida",
  priceRange: "$$",
  telephone: "+213553994355",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cité CNEP Hai el Badr Bt 23A n°3",
    addressLocality: "Kouba",
    addressRegion: "Alger",
    addressCountry: "DZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 36.7175, longitude: 3.0955 },
  openingHours: ["Mo-Th 09:00-19:00", "Fr 09:00-12:00", "Sa 09:00-18:00"],
  sameAs: [
    "https://www.instagram.com/dentalida/",
    "https://www.facebook.com/CabinetDentaire.Dentalida.HaiElbadr/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "1000",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
