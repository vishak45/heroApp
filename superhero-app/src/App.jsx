import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import HeroDetail from "./HeroDetail.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
const BASE_URL = `https://www.superheroapi.com/api.php/${import.meta.env.VITE_API_KEY}`;

function Home() {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // separate loading for load more
  const navigate = useNavigate();

  // Fetch random heroes (default count is 20)
  const fetchRandomHeroes = async (append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const ids = Array.from({ length: 50 }, () => Math.floor(Math.random() * 731) + 1); // fetch more, we'll filter
    const data = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/${id}`).then((res) => res.json()))
    );

    // Filter only Marvel or DC publishers
    const filtered = data.filter(hero => {
      const pub = hero.biography?.publisher?.toLowerCase();
      return pub === "marvel comics" || pub === "dc comics";
    });

    const limited = filtered.slice(0, 20);

    if (append) {
      setHeroes((prev) => [...prev, ...limited]);
      setLoadingMore(false);
    } else {
      setHeroes(limited);
      setLoading(false);
    }
  };

  const searchHero = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    const res = await fetch(`${BASE_URL}/search/${search}`);
    const data = await res.json();
    setHeroes(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomHeroes();
  }, []);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/comic.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-blue-900/30 via-red-900/30 to-yellow-900/30 animate-pulse-slow pointer-events-none"></div>

      {/* Welcome Banner */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
          <span className="text-red-500">Hero</span>
          <span className="text-white">Dex</span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto animate-fade-in">
          Explore the ultimate database of superheroes from all universes. Search your favorite heroes, view their power stats, and discover hidden legends.
        </p>
      </section>

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-950/80 backdrop-blur-md shadow-lg sticky top-0 z-10 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-extrabold drop-shadow-lg">
          <span className="text-red-500">Hero</span>
          <span className="text-white">Dex</span>
        </h1>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a hero..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border-2 border-white focus:outline-none focus:border-red-500 w-64 sm:w-72 transition-all duration-300 shadow-lg"
            />
            <button
              onClick={searchHero}
              className="absolute right-0 top-0 h-full px-4 bg-white rounded-r-full font-bold text-gray-900 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Search
            </button>
          </div>
          <button
            onClick={() => fetchRandomHeroes(false)}
            className="bg-red-600 px-4 py-2 rounded-full font-bold text-white hover:bg-white hover:text-red-600 transition-all duration-300 animate-bounce-subtle"
          >
            Random
          </button>
        </div>
      </header>

      {/* Hero Grid */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative h-full">
        {loading ? (
          <div className="h-100">
            <p className="col-span-full text-center text-red-500 text-xl animate-pulse">
              Loading heroes...
            </p>
          </div>
        ) : heroes.length > 0 ? (
          heroes.map((hero) => (
            <div
              key={hero.id}
              className="group bg-gray-800/80 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-red-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm animate-fade-in"
              onClick={() => navigate(`/hero/${hero.id}`)}
            >
              <div className="relative">
                <img
                  src={hero.image?.url}
                  alt={hero.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-red-500 drop-shadow-md">
                  {hero.name}
                </h2>
                <div className="mt-2 space-y-1 text-sm text-gray-300">
                  <p>💪 Strength: {hero.powerstats?.strength}</p>
                  <p>⚡ Speed: {hero.powerstats?.speed}</p>
                  <p>🧠 Intelligence: {hero.powerstats?.intelligence}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-lg">
            No heroes found. Try another search!
          </p>
        )}
      </main>

      {/* Load More Button */}
      {heroes.length > 0 && !loading && (
        <div className="flex justify-center my-8">
          <button
            onClick={() => fetchRandomHeroes(true)}
            disabled={loadingMore}
            className="bg-red-600 px-6 py-3 rounded-full font-bold text-white hover:bg-white hover:text-red-600 transition-all duration-300 shadow-lg"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-red-500 text-center py-10 px-6 mt-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white">
          Ready to find your favorite hero?
        </h2>
        <p className="mt-2 text-white/90">
          Use the search above or click "Random" to discover new heroes!
        </p>
      </section>
    </div>
  );
}


function HeroDetailWrapper() {
  const params = useParams();
  return <HeroDetail id={params.id} />;
}

export default function App() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 0, 0.8); }
          50% { text-shadow: 0 0 12px rgba(255, 255, 0, 1); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hero/:id" element={<HeroDetailWrapper />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
