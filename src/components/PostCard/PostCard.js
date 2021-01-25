import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

//
import "./PostCard.css";
import DeleteButton from "../DeleteButton/DeleteButton";

// redux-store
import { useSelector } from "react-redux";
import LikeButton from "../LikeButton/LikeButton";
import CommentButton from "../CommentButton/CommentButton";

function PostCard({
  post: {
    id,
    username,
    body,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) {
  const { user } = useSelector((reducer) => reducer.authReducer);
  const handleLike = () => {
    console.log("I am Like");
  };

  const handleComment = () => {
    console.log("I am comment");
  };

  return (
    <Card fluid className="postCard">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header> {username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          user={user}
          likes={likes}
          likeCount={likeCount}
          postId={id}
        />
        <CommentButton
          user={user}
          comments={comments}
          commentCount={commentCount}
          postId={id}
        />

        {user ? user.username === username && <DeleteButton postId={id} /> : ""}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
