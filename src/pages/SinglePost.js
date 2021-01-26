import React, { useState, useEffect, useRef } from "react";

import { Form, Grid, Button, Image, Card, Transition } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import { useQuery, useMutation } from "@apollo/client";
import { getPostById, createComment } from "../utils/graphql/postQuery";
import { useSelector } from "react-redux";
import LikeButton from "../components/LikeButton/LikeButton";
import CommentButton from "../components/CommentButton/CommentButton";
import DeleteButton from "../components/DeleteButton/DeleteButton";

function SinglePost() {
  const history = useHistory();
  const { user } = useSelector((reducer) => reducer.authReducer);
  const { id } = useParams();
  const commentInputRef = useRef(null);
  const [body, setBody] = useState("");
  const [columns, setColumns] = useState("ten");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setColumns("sixteen");
      setIsMobile(true);
    } else {
      setColumns("ten");
      setIsMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setColumns("sixteen");
        setIsMobile(true);
      } else {
        setColumns("ten");
        setIsMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setColumns("sixteen");
          setIsMobile(true);
        } else {
          setColumns("ten");
          setIsMobile(false);
        }
      });
    };
  }, []);
  const { loading, error, data } = useQuery(getPostById, {
    variables: {
      postId: id,
    },
    onError: (err) => {},
  });

  const [addComment, {}] = useMutation(createComment, {
    variables: {
      postId: data && data.getPost.id,
      body,
    },
    update: () => {
      setBody("");
      commentInputRef.current.blur();
    },
    onError: (err) => {},
  });

  function handleRedirect() {
    history.replace("/");
  }

  function submitComment() {
    if (body.trim() !== "") {
      addComment();
    }
  }

  if (loading) {
    return <h1> Loading</h1>;
  } else if (error) {
    return <h1> {error.message} </h1>;
  }

  return (
    <Grid style={{ marginTop: 12 }} centered>
      <Grid.Row style={{justifyContent: "flex-start"}}>
      <Button labelPosition='left' icon='left chevron' content='Back' onClick={handleRedirect} />
      </Grid.Row>
      <Grid.Row>
      {!isMobile && (
        <Grid.Column width={2}>
          <Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
        </Grid.Column>
      )}
      <Grid.Column width={columns}>
        <Card fluid>
          <Card.Content>
            {isMobile && (
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              />
            )}
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
        {user && (
          <Card fluid>
            <Card.Content>
              <p> Post a comment: </p>
              <Form onSubmit={submitComment}>
                <div className="ui action input fluid">
                  <textarea
                    type="text"
                    placeholder="Type here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    ref={commentInputRef}
                    rows="3"
                    style={{marginBottom: "6px"}}
                  />
                  
                </div>
                <button type="submit" className="ui button teal">
                    {" "}
                    Submit{" "}
                  </button>
              </Form>
            </Card.Content>
          </Card>
        )}
        <Transition.Group animation="scale">
          {data.getPost.comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user &&
                  (user.username === comment.username ? (
                    <DeleteButton
                      callBack={handleRedirect}
                      postId={data.getPost.id}
                      commentId={comment.id}
                    />
                  ) : (
                    ""
                  ))}
                <Card.Header> {comment.username} </Card.Header>
                <Card.Meta> {moment(comment.createdAt).fromNow()} </Card.Meta>
                <Card.Description> {comment.body} </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Transition.Group>
      </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SinglePost;
