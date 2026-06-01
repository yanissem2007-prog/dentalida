import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dentalida.dz";
const OG_IMAGE = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&h=630&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dentalida — Cabinet Dentaire Premium à Alger",
    template: "%s · Dentalida",
  },
  description:
    "Cabinet dentaire premium à Hai El Badr, Kouba, Alger. Hollywood Smile, implants, orthodontie, laser et esthétique du sourire. Redéfinir le sourire avec douceur et précision.",
  keywords: [
    "dentiste Alger", "cabinet dentaire Kouba", "Hollywood Smile Alger",
    "implant dentaire Alger", "orthodontie Alger", "facettes dentaires",
    "esthétique dentaire", "Dentalida", "Hai El Badr", "blanchiment dentaire Alger",
  ],
  authors: [{ name: "Cabinet Dentaire Dentalida" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    url: SITE_URL,
    siteName: "Dentalida",
    title: "Dentalida — Votre sourire, réinventé",
    description:
      "Cabinet dentaire premium à Alger — Hollywood Smile, implants, orthodontie, laser, esthétique du sourire.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sourire transformé — Dentalida" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentalida — Votre sourire, réinventé",
    description: "Cabinet Dentaire Premium à Alger.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

const realReviews = [
  { author: "Hadoula", body: "Vous m'avez fait un excellent travail, très satisfaite. Un dentiste compétent qui travaille avec le cœur, elle a changé ma vie et m'a rendu le sourire." },
  { author: "Asmaa Messedaa", body: "J'ai pu enfin surmonter ma phobie des dentistes grâce à Dentalida. Très compétente, minutieuse, et surtout douce." },
  { author: "Mohamed Chenane", body: "Excellente équipe. Très satisfait de mon Hollywood Smile. Sans exagérer, ça ressemble à ceux des stars." },
  { author: "Sehad Dalia", body: "Je recommande fortement Dentalida, qui fait un travail exceptionnel et très professionnel." },
  { author: "Lydia Abbas", body: "Un travail parfait, des dentistes très respectueux, avec un prix raisonnable. Je vous conseille d'y aller." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#dentalida`,
  name: "Cabinet Dentaire Dentalida",
  url: SITE_URL,
  image: OG_IMAGE,
  priceRange: "$$",
  telephone: "+213553994355",
  currenciesAccepted: "DZD",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cité CNEP Hai el Badr Bt 23A n°3",
    addressLocality: "Kouba",
    addressRegion: "Alger",
    addressCountry: "DZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 36.7175, longitude: 3.0955 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  ],
  sameAs: [
    "https://www.instagram.com/dentalida/",
    "https://www.facebook.com/CabinetDentaire.Dentalida.HaiElbadr/",
  ],
  medicalSpecialty: ["CosmeticDentistry", "Orthodontic", "Implant"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: String(realReviews.length), bestRating: "5" },
  review: realReviews.map((r) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.body,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
