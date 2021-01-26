import React, { useState } from "react";
import "./DeleteButton.css"
import { Button, Confirm, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { allPost, deletePostById, deleteComment } from "../../utils/graphql/postQuery";

function DeleteButton({ postId, commentId, callBack, size }) {
    const [isConfirm, setIsConfirm] = useState(false);
  const [deletePost, { error }] = useMutation(commentId ? deleteComment : deletePostById, {
    variables: {
      postId,
      commentId
    },
    update: (proxy) => {
        setIsConfirm(false)
      if(!commentId) {
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
      }

      if (callBack) {
        if(!commentId) {
          callBack();
        }
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
        size={size && size}
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
