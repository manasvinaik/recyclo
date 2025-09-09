// src/pages/Feed.js
import React, { useEffect, useState } from "react";
import api from "../api";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/posts/")
      .then((res) => {
        if (!cancelled) {
          // DRF may return list or paginated object; handle both
          const data = res.data.results || res.data;
          setPosts(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        alert(
          "Could not load posts. Is the backend running at http://127.0.0.1:8000 ?"
        );
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // called after successful creation from PostForm
  const handleCreated = (post) => {
    // prepend so newest appears first
    setPosts((prev) => [post, ...prev]);
    setShowForm(false); // hide form after posting (as you wanted)
  };

  const toggleForm = () => setShowForm((s) => !s);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-800">
          🌍 Community Waste Reports
        </h1>

        {/* feed view */}
        {!showForm ? (
          <>
            <div className="space-y-4 mb-6">
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading posts…
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                  No reports yet — be the first to report an issue.
                </div>
              ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>

            {/* plus button centered below the cards */}
            <div className="flex justify-center">
              <button
                onClick={toggleForm}
                aria-label="Create report"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-xl transform hover:-translate-y-1 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          // form-only view (with close)
          <div className="bg-white shadow-lg rounded-2xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-800">
                Submit a report
              </h2>
              <button
                onClick={toggleForm}
                aria-label="Close form"
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <PostForm onCreated={handleCreated} />
          </div>
        )}
      </div>
    </div>
  );
}