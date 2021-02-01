import React from "react";
import { Form, TextArea, Icon } from "semantic-ui-react";

function TextBox() {
  return (
    <Form className="textBox">
      <Icon
       name="picture"
       className="textBox__icon"
       
      />
      <Icon
       name="mix"
       
       className="textBox__icon"
      />
      <div className="textBox__inputBox">
      <textarea className="textBox__input" rows="1" cols="1" placeholder="Tell us more" />
      <Icon name="eye"  className="textBox__icon" />
      </div>
      <Icon name="like"  className="textBox__icon" />
    </Form>
  );
}

export default TextBox;
