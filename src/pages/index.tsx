import { useState, useEffect } from "react";
import EcranDebut from "@/components/commons/ecrandebut";
import EcranFin from "@/components/commons/ecranfin";

const allCards: string[] = [
  "Balance.png", "bélier.png", "Cancer.png", "Capricorn.png", "Gémeaux.png", "Lion.png", "Poisson.png", "Sagittaire.png", "Scorpion.png", "Taureau.png", "Verseau.png", "Vierge.png"
];

const levelConfigs: number[] = [
  3,  
  6,  
  9,   
  12,
];

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(0);
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (gameStarted) {
      const selectedCards = shuffleArray(allCards).slice(0, levelConfigs[level]);
      const shuffledCards = shuffleArray([...selectedCards, ...selectedCards]);
      setCards(shuffledCards);
      setClickCounts({});
      setFlipped([]);
      setMatched([]);
    }
  }, [level, gameStarted]);

  const handleCardClick = (index: number): void => {
    if (flipped.length === 2 || matched.includes(index)) return;

    setClickCounts((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));

    if ((clickCounts[index] || 0) >= 3) {
      setScore((prev) => Math.max(0, prev - 1));
    }

    setFlipped((prev) => [...prev, index]);

    if (flipped.length === 1) {
      const firstIndex = flipped[0];
      if (cards[firstIndex] === cards[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setScore((prev) => prev + 2); 
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const handleNextLevel = (): void => {
    if (matched.length === cards.length) {
      setLevel((prev) => (prev + 1) % levelConfigs.length);
      setMatched([]);
      setFlipped([]);
    }
  };

  const handleRestart = (): void => {
    setGameStarted(false);
    setLevel(0);
    setScore(0);
    setMatched([]);
    setFlipped([]);
    setCards([]);
  };

  if (!gameStarted) {
    return (
      <EcranDebut
        onClic={() => setGameStarted(true)}
        titre="Jeu de mémoire"
        texte="Cliquez sur les cartes pour les retourner et trouver les paires correspondantes."
        />
    );
  }

  if (matched.length === cards.length && cards.length > 0 && level === levelConfigs.length - 1) {
    return (
      <EcranFin
        onClic={handleRestart}
        contenu={`Score final : ${score}`}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Jeu de mémoire - niveau {level + 1}</h1>
      <p className="text-xl mb-4">Score : {score}</p>
      {matched.length === cards.length && (
        <button
          onClick={handleNextLevel}
          className="my-4 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Prochain niveau
        </button>
      )}
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div
              key={index}
              className={`w-20 h-32 flex items-center justify-center bg-gray-700 rounded-lg ${
              flipped.includes(index) || matched.includes(index) ? "bg-green-500" : "cursor-pointer"
              }`}
              onClick={() => !flipped.includes(index) && !matched.includes(index) && handleCardClick(index)}
            >
              {flipped.includes(index) || matched.includes(index) ? (
              <img
                src={`/cartes/${card}`}
                alt="Card"
                className="w-full h-full bg-white pointer-events-none"
              />
              ) : (
              <div className="w-full h-full bg-white "></div>
              )}
            </div>
          ))
        ) : (
          <p>Chargement des cartes...</p>
        )}
      </div>
      
    </div>
  );
}