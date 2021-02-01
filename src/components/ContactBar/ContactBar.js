import React from "react";


import { List, Image, Sidebar } from "semantic-ui-react";

function ContactBar() {
  return (
    <Sidebar
      className="contact__sidebar"
      direction="right"
      visible
      verticalAlign
      >
    <div className="contactBar">
      
        <div className="contactBar__message">
            <h5>
                Recent messages
            </h5>
            <List className="contactBar__message--list" selection verticalAlign="middle">
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
          />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
          />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        
        
      </List>
        </div>
        <hr />
      <div className="contactBar__contact">
      <h5>Contacts</h5>
      <List className="contactBar__contact--list" selection verticalAlign="middle">
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
          />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
          />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
       
      </List>
      </div>
      
    </div>
    </Sidebar>
  );
}

export default ContactBar;
