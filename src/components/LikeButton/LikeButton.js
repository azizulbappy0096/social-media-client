import React, { useEffect, useState } from "react";
import "./LikeButton.css";
import { Button, Label, Icon, Popup } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { likePostById } from "../../utils/graphql/postQuery";
import { useHistory } from "react-router-dom";

function LikeButton({ user, likes, likeCount, postId }) {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    if (user) {
      let checkLiked = likes.find((like) => like.username === user.username);
      if (checkLiked) {
        setIsLiked(false);
      } else setIsLiked(true);
    } else {
      setIsLiked(true);
    }

    return () => {
      setIsLiked(true);
    };
  }, [user, likes]);

  const [likePost, { error }] = useMutation(likePostById, {
    variables: {
      postId,
    },
    update: () => {},
    onError: (err) => {
      // console.log(err)
    },
  });

  const handleLike = () => {
    if (user) {
      likePost();
    } else {
      history.push("/login");
    }
  };

  return (
    <Button as="div" labelPosition="right">
      <Button basic={isLiked} color="teal" onClick={handleLike}>
        <Icon name="heart" />
      </Button>
      <Popup
        content={likes.length < 1 ? (<p style={{marginTop: "4px"}}> No one liked this post </p>): (likes.map((like, i) => i < 6 ? (<p> ♥️ {like.username} </p>) : (<small> and {likes.length - 5} others </small>)))}
        header={"See who liked this post:"}
        trigger={<Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>}
      />
      
    </Button>
  );
}

export default LikeButton;
