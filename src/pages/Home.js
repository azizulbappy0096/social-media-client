import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid, Transition } from "semantic-ui-react";
import CreatePost from "../components/CreatePost/CreatePost";
import PostCard from "../components/PostCard/PostCard";

// query
import { allPost } from "../utils/graphql/postQuery";

//
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((reducer) => reducer.authReducer);
  const { loading, error, data } = useQuery(allPost);
  const [columns, setColumns] = useState("two");

  useEffect(() => {
    if (window.innerWidth <= 668) {
      setColumns("one");
    } else {
      setColumns("two");
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setColumns("one");
      } else {
        setColumns("two");
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setColumns("one");
        } else {
          setColumns("two");
        }
      });
    };
  }, []);

  const displayPosts = () => {
    if (loading) {
      return <h1> Loading... </h1>;
    } else if (error) {
      // need to change later
      return <h1> {error.message} </h1>;
    } else if (data) {
      return (
        // <Grid.Row centered>
          

        data.getPosts && (
          <Transition.Group animation="scale">
            {data.getPosts.map((post) => {
              return (
                <Grid.Column width="16" key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            })}
          </Transition.Group>
        )
        // </Grid.Row>
      );
    }
  };

  return (
    <div className="home">
      <Grid centered>
        <Grid.Row columns="3">
          <Grid.Column width="3">
            <h1>aaaaaaa</h1>
          </Grid.Column>

          <Grid.Column width="8" style={{ marginTop: "12px"}}>
           
           <Grid.Row style={{justifyContent: "center", marginBottom: "12px"}}>
           <h1> Recent Posts</h1>
           </Grid.Row>
          
            {user ? (
            <Grid.Column >
              <CreatePost />
            </Grid.Column>
          ) : (
            ""
          )}
            {displayPosts()}
          </Grid.Column>

          <Grid.Column width="3">
            <h1>wwwww</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
