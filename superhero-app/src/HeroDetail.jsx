import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function HeroDetail() {
  const  { id } = useParams();
  const [hero, setHero] = useState(null);
  const [similarHeroes, setSimilarHeroes] = useState([]);

  useEffect(() => {
    // Fetch the selected hero
    fetch(`https://www.superheroapi.com/api.php/${import.meta.env.VITE_API_KEY}/${id}`)
      .then(res => res.json())
      .then(data => {
        setHero(data);
        window.scrollTo(0, 0);
        // Fetch some Marvel + DC heroes randomly
        const ids = Array.from({ length: 20 }, () => Math.floor(Math.random() * 731) + 1); // generate random hero IDs
Promise.all(
  ids.map((hid) =>
    fetch(`https://www.superheroapi.com/api.php/${import.meta.env.VITE_API_KEY}/${hid}`)
      .then(res => res.json())
  )
)
  .then(data => {
    // Keep only Marvel or DC heroes
    const filtered = data.filter(hero => {
      const pub = hero.biography?.publisher?.toLowerCase();
      return pub === "marvel comics" || pub === "dc comics";
    });

    // Remove the current hero and pick 10 random ones
    const randomPicks = filtered
      .filter(h => h.id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);

    setSimilarHeroes(randomPicks);
  })
  .catch(err => console.error("Error fetching random heroes:", err));

      });
  }, [id]);

  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500 text-2xl animate-pulse">Loading hero...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/comic.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-blue-900/30 via-red-900/30 to-yellow-900/30 animate-pulse-slow pointer-events-none"></div>

      <div className="p-6 relative z-10 max-w-7xl mx-auto">
        <Link to="/" className="text-white hover:text-red-500 text-lg font-semibold transition-colors">
          ← Back to Heroes
        </Link>

        {/* Main Hero Card */}
       <div className="mt-6 flex flex-col md:flex-row gap-6 bg-gray-900/80 rounded-2xl p-6  backdrop-blur-md animate-fade-in">

          <img
            src={hero.image?.url}
            alt={hero.name}
            className="w-full md:w-1/3 rounded-lg transform hover:scale-105 transition-transform duration-500"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-red-500">
              {hero.name}
            </h1>
            <p className="mt-2 text-gray-300 text-lg">{hero.biography?.["full-name"]}</p>

            {/* Power Stats */}
            <h2 className="mt-6 text-2xl font-semibold text-blue-400">Power Stats</h2>
            <ul className="mt-2 space-y-2 text-gray-200">
              {Object.entries(hero.powerstats || {}).map(([stat, value]) => (
                <li key={stat} className="capitalize flex items-center gap-2">
                  <span className="w-24 font-bold">{stat}:</span>
                  <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-500 h-full transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            {/* Appearance */}
            <h2 className="mt-6 text-2xl font-semibold text-blue-400">Appearance</h2>
            <ul className="mt-2 space-y-1 text-gray-200">
              {Object.entries(hero.appearance || {}).map(([k, v]) => (
                <li key={k} className="capitalize">
                  {k}: {Array.isArray(v) ? v.join(", ") : v}
                </li>
              ))}
            </ul>

            {/* Work */}
            <h2 className="mt-6 text-2xl font-semibold text-blue-400">Work</h2>
            <p className="text-gray-200">Occupation: {hero.work?.occupation}</p>
            <p className="text-gray-200">Base: {hero.work?.base}</p>
          </div>
        </div>

        {/* Similar Heroes Section */}
        {similarHeroes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-red-500 mb-6">
              Similar Heroes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {similarHeroes.map(h => (
                <Link
                  onClick={()=>window.location.href=`/hero/${h.id}`}
                  key={h.id}
                  className="bg-gray-900/80 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover: transition-transform duration-300"
                >
                  <img src={h.image?.url} alt={h.name} className="w-full h-48 object-cover" />
                  <div className="p-3 text-center">
                    <p className="text-lg font-semibold text-red-500">{h.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroDetail;
