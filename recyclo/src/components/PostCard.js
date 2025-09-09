// src/components/PostCard.js
import React from "react";

export default function PostCard({ post }) {
  // post.photo might be null, a relative path like "/media/..." or a full URL
  const getPhotoSrc = () => {
    if (!post.photo) return null;
    if (typeof post.photo !== "string") return null; // safety
    if (post.photo.startsWith("http://") || post.photo.startsWith("https://")) {
      return post.photo;
    }
    // assume relative path from Django, prefix the backend origin
    return `http://127.0.0.1:8000${post.photo}`;
  };

  //const photoSrc = getPhotoSrc();

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-green-800">
          {post.user || "Anonymous"}
        </span>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        {post.description}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        📍 {post.location_text || post.location}
      </p>
      {post.latitude && post.longitude && (
        <p className="text-sm text-gray-600">
          {post.latitude.toFixed(5)}, {post.longitude.toFixed(5)}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.images.map((img) => (
            <img
              key={img.id}
              src={img.image} // already a full URL now
              alt="report"
              className="rounded-lg object-cover max-h-48 w-full"
            />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">
        {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
}