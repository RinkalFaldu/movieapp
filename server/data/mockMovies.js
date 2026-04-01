const trailer = (id) => `https://www.youtube.com/embed/${id}`;

const actionMovies = [
  {
    id: "atlas-2049",
    title: "Atlas 2049",
    overview: "A defiant courier races across a neon megacity carrying the one memory chip that can reboot the planet's failing atmosphere grid.",
    poster: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    rating: "8.6",
    releaseDate: "2026-01-14",
    genre: ["Action", "Sci-Fi"],
    trailer: trailer("B4x4Rk4cKJg"),
  },
  {
    id: "ember-protocol",
    title: "Ember Protocol",
    overview: "An ex-firefighter leads a covert rescue squad through a volcanic superstorm to extract a city-sized energy core.",
    poster: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    rating: "7.9",
    releaseDate: "2025-11-02",
    genre: ["Action", "Thriller"],
    trailer: trailer("gL6GZxYB1wU"),
  },
];

const comedyMovies = [
  {
    id: "roommates-from-mars",
    title: "Roommates from Mars",
    overview: "A burned-out podcaster accidentally rents her spare room to two aliens studying Earth through sitcom reruns.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80",
    rating: "7.4",
    releaseDate: "2024-08-19",
    genre: ["Comedy"],
    trailer: trailer("x2nM1g2Qv3A"),
  },
  {
    id: "late-fees-forever",
    title: "Late Fees Forever",
    overview: "Two former video store clerks revive their shop as an underground film club and become accidental neighborhood legends.",
    poster: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    rating: "7.2",
    releaseDate: "2024-03-28",
    genre: ["Comedy", "Drama"],
    trailer: trailer("kXYiU_JCYtU"),
  },
];

const horrorMovies = [
  {
    id: "blackwater-broadcast",
    title: "Blackwater Broadcast",
    overview: "A pirate radio team discovers their midnight signal can awaken things buried beneath the town reservoir.",
    poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    rating: "8.1",
    releaseDate: "2025-10-31",
    genre: ["Horror"],
    trailer: trailer("sNPnbI1arSE"),
  },
  {
    id: "the-silent-choir",
    title: "The Silent Choir",
    overview: "A composer inherits an abandoned cathedral where every rehearsal adds another name to a vanished parish ledger.",
    poster: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    rating: "7.7",
    releaseDate: "2025-09-12",
    genre: ["Horror", "Mystery"],
    trailer: trailer("QH2-TGUlwu4"),
  },
];

const sciFiMovies = [
  {
    id: "orbit-house",
    title: "Orbit House",
    overview: "A family relocates to the first luxury ring station and uncovers a hidden corridor looping through alternate timelines.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    rating: "8.3",
    releaseDate: "2026-02-20",
    genre: ["Sci-Fi", "Drama"],
    trailer: trailer("fLexgOxsZu0"),
  },
  {
    id: "neon-garden",
    title: "Neon Garden",
    overview: "A bioengineer cultivates sentient flora in a flooded Tokyo district where memory can be traded like currency.",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80",
    rating: "8.0",
    releaseDate: "2024-11-17",
    genre: ["Sci-Fi", "Romance"],
    trailer: trailer("4NRXx6U8ABQ"),
  },
];

const romanceMovies = [
  {
    id: "summer-in-verona",
    title: "Summer in Verona",
    overview: "A documentary translator and an opera costume designer build a fragile love story during one impossible festival season.",
    poster: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    rating: "7.5",
    releaseDate: "2023-06-01",
    genre: ["Romance", "Drama"],
    trailer: trailer("YQHsXMglC9A"),
  },
  {
    id: "signal-heart",
    title: "Signal Heart",
    overview: "Two long-distance astronauts fall in love over maintenance logs while orbiting opposite sides of the moon.",
    poster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    rating: "7.8",
    releaseDate: "2025-02-14",
    genre: ["Romance", "Sci-Fi"],
    trailer: trailer("JGwWNGJdvx8"),
  },
];

const dramaMovies = [
  {
    id: "oak-street-winter",
    title: "Oak Street Winter",
    overview: "Three siblings return to save their father's jazz club and find the secrets he recorded onto tape instead of telling them.",
    poster: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    rating: "8.4",
    releaseDate: "2024-12-05",
    genre: ["Drama"],
    trailer: trailer("RgKAFK5djSk"),
  },
  {
    id: "glass-mile",
    title: "Glass Mile",
    overview: "A marathon legend stages one last race across the city that made her famous while mentoring a rival teenager.",
    poster: "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    rating: "7.9",
    releaseDate: "2025-04-09",
    genre: ["Drama", "Sports"],
    trailer: trailer("09R8_2nJtjg"),
  },
];

const documentaryMovies = [
  {
    id: "depths-of-blue-ice",
    title: "Depths of Blue Ice",
    overview: "Marine glaciologists descend into luminous Antarctic caverns to map ancient meltwater ecosystems.",
    poster: "https://images.unsplash.com/photo-1473447198193-c7c9f1309f8c?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    rating: "8.7",
    releaseDate: "2023-09-22",
    genre: ["Documentary"],
    trailer: trailer("2Vv-BfVoq4g"),
  },
  {
    id: "vinyl-cities",
    title: "Vinyl Cities",
    overview: "A globe-spanning dig through underground record stores reveals how neighborhoods archive themselves through sound.",
    poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    rating: "7.6",
    releaseDate: "2022-10-11",
    genre: ["Documentary", "Music"],
    trailer: trailer("ktvTqknDobU"),
  },
];

const experimentalMovies = [
  {
    id: "fracture-light",
    title: "Fracture Light",
    overview: "A choreographed collage of city reflections, intercepted voice notes, and split-screen diaries that gradually assemble one breakup.",
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80",
    rating: "7.1",
    releaseDate: "2024-04-27",
    genre: ["Experimental", "Drama"],
    trailer: trailer("hLQl3WQQoQ0"),
  },
  {
    id: "echoes-for-empty-rooms",
    title: "Echoes for Empty Rooms",
    overview: "An architect records the changing acoustics of abandoned homes and transforms them into a haunting visual symphony.",
    poster: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    rating: "6.9",
    releaseDate: "2023-01-16",
    genre: ["Experimental", "Documentary"],
    trailer: trailer("e-ORhEE9VVg"),
  },
];

export const curatedRows = [
  { key: "action", title: "Action", genreId: 28, movies: actionMovies },
  { key: "comedy", title: "Comedy", genreId: 35, movies: comedyMovies },
  { key: "horror", title: "Horror", genreId: 27, movies: horrorMovies },
  { key: "scifi", title: "Sci-Fi", genreId: 878, movies: sciFiMovies },
  { key: "romance", title: "Romance", genreId: 10749, movies: romanceMovies },
  { key: "drama", title: "Drama", genreId: 18, movies: dramaMovies },
  { key: "documentary", title: "Documentary", genreId: 99, movies: documentaryMovies },
  { key: "experimental", title: "Experimental", genreId: 10770, movies: experimentalMovies },
];

export const detailedMovies = Object.fromEntries(
  curatedRows.flatMap((row) => row.movies.map((movie) => [movie.id, movie])),
);
