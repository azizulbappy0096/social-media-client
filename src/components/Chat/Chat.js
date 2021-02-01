import React from "react";


import { List, Image, Card, Icon } from "semantic-ui-react";
import TextBox from "../TextBox/TextBox";

function Chat() {
  return (
    <div className="chat">
      <section className="chat__header">
        <List selection verticalAlign="middle" size="massive">
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
            />
          </List.Item>
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
            />
          </List.Item>
        </List>
      </section>
      <section className="chat__box">
        <div className="chat__boxHeader">
          <List className="chat__boxName" verticalAlign="middle">
            <List.Item>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
              />
              <List.Content>
                <List.Header>Helen</List.Header>
              </List.Content>
            </List.Item>
          </List>
          <Icon name="close" />
        </div>
        <div className="chat__msg">

        </div>
        <TextBox />
      </section>
    </div>
  );
}

export default Chat;
