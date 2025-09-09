import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import GameHome from "./pages/GameHome";
import TrashGame from "./pages/TrashGame";
import VideoModule from "./pages/VideoModule";
import Quiz from "./pages/Quiz";
import QuizDetail from "./pages/QuizDetail";
import VideoRoadmap from "./pages/VideoRoadmap";
import VideoLesson from "./pages/VideoLesson";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <div className="App">

      {/* Dialogflow Chatbot */}
      <df-messenger
        intent="WELCOME"
        chat-title="Waste Helper"
        agent-id="7c4f1bf1-efdb-41b6-aab6-21a8074aff48"
        language-code="en"
      ></df-messenger>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Feed />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/game" element={<GameHome />} />
          <Route path="/game/trash" element={<TrashGame />} />
          <Route path="/game/videos" element={<VideoModule />} />
          <Route path="/game/quizzes" element={<Quiz />} />
          <Route path="/game/quizzes/:id" element={<QuizDetail />} />
          <Route path="/game/videos/:id" element={<VideoRoadmap />} />
          <Route path="/game/videos/:moduleId/:lessonId" element={<VideoLesson />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
