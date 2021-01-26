import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [formattedBody, setFormattedBody] = useState("");

  useEffect(() => {
    if(body.length > 120) {
      let txt = body.substring(0, 120);
      txt = txt.substring(0, txt.lastIndexOf(" "))
      setFormattedBody(txt)
    }else {
      setFormattedBody(body)
    }
  }, [body]);

  const handleViewMore = () => {
    if(body.length > 120) {
      history.push(`/post/${id}`)
    }
  }

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
        <Card.Description style={body.length > 120 ? {cursor: "pointer"} : {}} onClick={handleViewMore} className="postCard__description">{formattedBody} {body.length > 120 && <span style={{fontWeight: "bold"}}> view more.... </span>} </Card.Description>
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
