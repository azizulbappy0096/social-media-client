import React from 'react';
import { Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { allPost, deletePostById } from '../../utils/graphql/postQuery';

function DeleteButton({ postId, callBack }) {
    const [deletePost, { error }] = useMutation(deletePostById, {
        variables: {
            postId
        },
        update: (proxy) => {
            const prevPosts = proxy.readQuery({
                query: allPost
            });
          
            const updatedPosts = prevPosts.getPosts.filter(post => post.id !== postId);

            proxy.writeQuery({
                query: allPost,
                data: {
                    getPosts: updatedPosts
                }
            });

            if(callBack) {
                callBack();
            }

        },
        onError: (err) => {
            console.log("del", err)
        }
    })

    return (
        <Button animated='vertical' color="red" floated="right" onClick={deletePost}>
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name='trash' />
        </Button.Content>
      </Button>
    )
}

export default DeleteButton
