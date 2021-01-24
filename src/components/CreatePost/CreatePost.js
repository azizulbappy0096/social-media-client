import React from "react";
import "./CreatePost.css";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../../utils/FormHooks";
import { useMutation } from "@apollo/client";
import { allPost, createPost } from "../../utils/graphql/postQuery";

function CreatePost() {
  const { values, onChange, onSubmit } = useForm(
    { body: "" },
    createPostOnSubmit
  );
  const [publishPost, { error }] = useMutation(createPost, {
      variables: values,
      update: (proxy, response) => {
        console.log(response)
        console.log(proxy);

        const prevPost = proxy.readQuery({
            query: allPost,
        });
        console.log(prevPost)
        const newPost = response.data.addPost;

        proxy.writeQuery({
            query: allPost,
            data: {
                getPosts: [newPost, ...prevPost.getPosts]
            }
        })
        values.body = ""
      },
      onError: (err) => {
          
      }
  });

  function createPostOnSubmit() {
      publishPost();
  }
  if(error) {
      console.log(error.message)
  }

  return (
    <Form error onSubmit={onSubmit} className="post__form">
      <h4>Add Post</h4>
      <Form.Field>
        <Form.Input
          type="text"
          placeholder="Write something boss..."
          name="body"
          error={error ? true : false}
          value={values.body}
          onChange={onChange}
        />

        <Button type="submit">Post</Button>
      </Form.Field>

      {error ? (<div className="ui error message">
            <ul className="list">
                <li> {error.message} </li>
            </ul>
      </div>): ""}
    </Form>
  );
}

export default CreatePost;
