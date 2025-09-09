import React, { useState } from "react";
import compostBinImg from "../assets/images/composttrash.png";
import recycleBinImg from "../assets/images/recycletrash.png";
import electronicBinImg from "../assets/images/electronictrash.png";
import nonrecycleBinImg from "../assets/images/nonrecycletrash.png";
import gameBg from "../assets/images/gamebg.png";

function TrashGame() {
  const allItems = [
    { id: 1, name: "Banana Peel", type: "compost" },
    { id: 2, name: "Paper", type: "recyclable" },
    { id: 3, name: "Plastic Bottle", type: "recyclable" },
    { id: 4, name: "Metal Pin", type: "non-recyclable" },
    { id: 5, name: "Laptop Battery", type: "electronic" },
    { id: 6, name: "Cardboard Box", type: "recyclable" },
    { id: 7, name: "Food Leftovers", type: "compost" },
    { id: 8, name: "Old Mobile Phone", type: "electronic" },
    { id: 9, name: "Glass Bottle", type: "recyclable" },
    { id: 10, name: "Plastic Wrapper", type: "non-recyclable" },
    { id: 11, name: "Eggshells", type: "compost" },
    { id: 12, name: "Broken Earphones", type: "electronic" },
  ];

  const bins = [
    { id: "compost", img: compostBinImg },
    { id: "recyclable", img: recycleBinImg },
    { id: "electronic", img: electronicBinImg },
    { id: "non-recyclable", img: nonrecycleBinImg },
  ];

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [roundItems, setRoundItems] = useState(() =>
    allItems
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((i) => ({ ...i, done: false, correct: null }))
  );

  const handleDragStart = (item) => {
    if (item.done) return;
    setDraggedItem(item);
  };

  const handleDrop = (binType) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.type === binType;

    setRoundItems((prev) =>
      prev.map((i) =>
        i.id === draggedItem.id
          ? { ...i, done: true, correct: isCorrect }
          : i
      )
    );

    if (isCorrect) {
      setMessage(`✅ Correct! ${draggedItem.name} goes to ${binType}.`);
      setScore((prev) => prev + 1);
    } else {
      setMessage(`❌ Wrong! ${draggedItem.name} doesn’t belong here.`);
    }

    setDraggedItem(null);
  };

  const nextRound = () => {
    if (round < 5) {
      setRound(round + 1);
      setMessage("");
      setRoundItems(
        allItems
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((i) => ({ ...i, done: false, correct: null }))
      );
    } else {
      setMessage(`🎉 Game Over! Your score: ${score} / ${round * 3}`);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        height: "96vh",
        overflow: "hidden", // remove vertical scroll
        backgroundImage: `url(${gameBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "#fff",
      }}
    >
      <h2 style={{ color: "black" }}>Trash Sorting Game</h2>
      <p style={{ color: "black" }}>Round {round} of 5</p>
      <p style={{ color: "black" }}>Score: {score}</p>

      {/* Items */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {roundItems.map((item) => (
          <div
            key={item.id}
            draggable={!item.done}
            onDragStart={() => handleDragStart(item)}
            style={{
              border: "1px solid #333",
              padding: "1rem",
              borderRadius: "8px",
              cursor: item.done ? "not-allowed" : "grab",
              background: item.done
                ? item.correct
                  ? "rgba(0, 128, 0, 0.7)"
                  : "rgba(255, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.8)",
              minWidth: "120px",
              opacity: item.done ? 0.6 : 1,
              textAlign: "center",
            }}
          >
            {item.done
              ? item.correct
                ? `${item.name} ✔️`
                : `${item.name} ❌`
              : item.name}
          </div>
        ))}
      </div>

      {/* Bins as images */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop:"8rem",
        }}
      >
        {bins.map((bin) => (
          <div
            key={bin.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(bin.id)}
            style={{
              width: "200px",  // bigger bins
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={bin.img}
              alt={bin.id}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>

      {message && <p style={{color: "black" }}>{message}</p>}

      {/* Next Round Button */}
      {round <= 5 && (
        <button
          onClick={nextRound}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
            background: "#047857",
            color: "white",
            cursor: "pointer",
          }}
        >
          {round < 5 ? "Next Round" : "Finish Game"}
        </button>
      )}
    </div>
  );
}

export default TrashGame;
