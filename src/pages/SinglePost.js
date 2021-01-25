import React from "react";

import { Grid, Image, Card } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import { useQuery } from "@apollo/client";
import { getPostById } from "../utils/graphql/postQuery";
import { useSelector } from "react-redux";
import LikeButton from "../components/LikeButton/LikeButton";
import CommentButton from "../components/CommentButton/CommentButton";
import DeleteButton from "../components/DeleteButton/DeleteButton";

function SinglePost() {
  const history = useHistory();
  const { user } = useSelector((reducer) => reducer.authReducer);
  const { id } = useParams();
  const { loading, error, data } = useQuery(getPostById, {
    variables: {
      postId: id,
    },
    onError: (err) => {},
  });

  function handleRedirect() {
    history.replace("/");
  }

  if (loading) {
    return <h1> Loading</h1>;
  } else if (error) {
    return <h1> {error.message} </h1>;
  }

  return (
    <Grid style={{ marginTop: 12 }} centered>
      <Grid.Column width={2}>
        <Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header> {data.getPost.username} </Card.Header>
            <Card.Meta> {moment(data.getPost.createdAt).fromNow()} </Card.Meta>
            <Card.Description>{data.getPost.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton
              user={user}
              likes={data.getPost.likes}
              likeCount={data.getPost.likeCount}
              postId={data.getPost.id}
            />
            <CommentButton
              user={user}
              comments={data.getPost.comments}
              commentCount={data.getPost.commentCount}
              postId={data.getPost.id}
            />

            {user
              ? user.username === data.getPost.username && (
                  <DeleteButton
                    callBack={handleRedirect}
                    postId={data.getPost.id}
                  />
                )
              : ""}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default SinglePost;
