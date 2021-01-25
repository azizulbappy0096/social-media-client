import React, { useState } from "react";
import "./DeleteButton.css"
import { Button, Confirm, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { allPost, deletePostById } from "../../utils/graphql/postQuery";

function DeleteButton({ postId, callBack }) {
    const [isConfirm, setIsConfirm] = useState(false);
  const [deletePost, { error }] = useMutation(deletePostById, {
    variables: {
      postId,
    },
    update: (proxy) => {
        setIsConfirm(false)
      const prevPosts = proxy.readQuery({
        query: allPost,
      });

      const updatedPosts = prevPosts.getPosts.filter(
        (post) => post.id !== postId
      );

      proxy.writeQuery({
        query: allPost,
        data: {
          getPosts: updatedPosts,
        },
      });

      if (callBack) {
        callBack();
      }
    },
    onError: (err) => {
      console.log("del", err);
    },
  });

  return (
<>
      <Button
        animated="vertical"
        color="red"
        floated="right"
        onClick={() => setIsConfirm(true)}
      >
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name="trash" />
        </Button.Content>
     
      </Button>
  
      <Confirm
        open={isConfirm}
        content="Are you sure about this?"
        onConfirm={deletePost}
        onCancel={() => setIsConfirm(false)}
        size="mini"
      /></>   

  );
}

export default DeleteButton;
