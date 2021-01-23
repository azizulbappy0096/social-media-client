import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

//
import "./PostCard.css";

function PostCard({
  post: { username, body, createdAt, likeCount, commentCount },
}) {

    const handleLike = () => {
        console.log("I am Like")
    };

    const handleComment = () => {
        console.log("I am comment")
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
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
     
        <Button as="div" labelPosition="right">
            <Button basic color="teal" onClick={handleLike}>
              <Icon name="heart" />
            
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              { likeCount }
            </Label>
          </Button>
          <Button as="div" labelPosition="right">
            <Button basic color="grey" onClick={handleComment}>
              <Icon name="comments" />
              
            </Button>
            <Label as="a" basic color="grey" pointing="left">
              { commentCount }
            </Label>
          </Button>

    
      </Card.Content>
    </Card>
  );
}

export default PostCard;
