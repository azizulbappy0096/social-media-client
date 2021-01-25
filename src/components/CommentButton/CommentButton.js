import React, { useEffect, useState } from 'react';
import "../LikeButton/LikeButton.css";
import { Button, Label, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { likePostById } from "../../utils/graphql/postQuery";
import { useHistory } from "react-router-dom";


function LikeButton({ user, comments, commentCount, postId }) {
    const history = useHistory();

    const [commentPost, { error }] = useMutation(likePostById, {
        variables: {
            postId
        },
        update: () => {

        },
        onError: (err) => {
            // console.log(err)
        }
    });

    const handleComment = () => {
        if(user) {
            
        }else {
            history.push("/login")
        }   
    }

    return (
        <Button as="div" labelPosition="right">
            <Button basic color="teal" onClick={handleComment}>
              <Icon name="comments" />
            
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              { commentCount }
            </Label>
        </Button>
    )
}

export default LikeButton;