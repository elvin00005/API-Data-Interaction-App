import React from "react";
import { PostCard } from "./PostCard";

export function PostsList({
  posts,
  setSelectedPostId,
  selectedPosts,
  setSelectedPosts,
  setShowModalOfDelete,
}) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          selectedPosts={selectedPosts}
          setSelectedPosts={setSelectedPosts}
          setShowModalOfDelete={setShowModalOfDelete}
          setSelectedPostId={setSelectedPostId}
        />
      ))}
    </div>
  );
}
