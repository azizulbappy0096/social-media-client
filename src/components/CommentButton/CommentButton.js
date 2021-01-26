import React, { useEffect, useState } from "react";
import "../LikeButton/LikeButton.css";
import { Button, Label, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";

function LikeButton({ commentCount, postId }) {
  return (
    <Button as="div" labelPosition="right">
      <Button basic color="teal" as={Link} to={`/post/${postId}`}>
        <Icon name="comments" />
      </Button>
      <Label as="a" basic color="teal" pointing="left">
        {commentCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
