import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import cn from "classnames";
import {
  ButtonToAddToFavorites,
  CommentButton,
  DeleteButton,
  EditButton,
} from "../../utilities/const/Buttons";
import FormForUpdatePost from "./FormForUpdatePost";
import { useFavoritePosts } from "../../utilities/context/favoritiesPostsContext";

import styles from "./PostsCard.module.scss";

export const PostCard = ({
  post,
  setSelectedPosts,
  setShowModalOfDelete,
  selectedPosts,
  setSelectedPostId,
}) => {
  const { favoritePosts, handleToggleAddFavoritePosts } = useFavoritePosts();

  const [isVisabilityComments, setIsVisabilityComments] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const handleCloseEdit = () => setIsEdit(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const userMainData = {
    title: post?.title,
    body: post?.body,
    userName: post?.user?.name,
  };
  if (isEdit) {
    return (
      <div
        key={post.id}
        className="d-flex flex-column bg-light p-3 m-1 rounded"
      >
        <FormForUpdatePost
          id={post?.id}
          editedPost={userMainData}
          handleCloseEdit={handleCloseEdit}
        />
      </div>
    );
  }

  return (
    <Card
      className={`${styles.container} ${
        favoritePosts.includes(post.id) ? "bg-warning" : "bg-light"
      }`}
    >
      <div>
        <Form.Check
          className={styles.check}
          checked={selectedPosts.includes(post.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedPosts([...selectedPosts, post.id]);
            } else {
              setSelectedPosts(
                selectedPosts.filter((postId) => postId !== post.id)
              );
            }
          }}
        />

        <h3>{post?.title}</h3>
        <h5>{post?.user?.name}</h5>
        <p>{post?.body}</p>
      </div>

      <div className={cn(styles.bntsDiv, "d-flex justify-content-center")}>
        <EditButton onClick={handleEdit} />
        <ButtonToAddToFavorites
          onClick={() => handleToggleAddFavoritePosts(post.id)}
        />
        <DeleteButton
          onClick={() => {
            setSelectedPostId(post.id);
            setShowModalOfDelete(true);
          }}
        />
        <CommentButton
          onClick={() => {
            setIsVisabilityComments((prev) => !prev);
          }}
          className={isVisabilityComments ? styles.commentButtonActive : ""}
        />
      </div>
      {isVisabilityComments &&
        post?.comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="m-1 p-2 bg-info
            rounded"
            >
              <h4>{comment.email}</h4>
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
            </div>
          );
        })}
    </Card>
  );
};
