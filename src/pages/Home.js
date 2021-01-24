import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import CreatePost from "../components/CreatePost/CreatePost";
import PostCard from "../components/PostCard/PostCard";


// query
import { allPost } from "../utils/graphql/postQuery";

//
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector(reducer => reducer.authReducer);
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
        <Grid.Row>
         {user ? ( <Grid.Column fluid="true">
                <CreatePost />
          </Grid.Column>) : ""}
          {data.getPosts.map((post) => {
            return (
              <Grid.Column fluid="true" key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      );
    }
  };

  return (
    <div className="home">
      <Grid columns={columns}>
        <Grid.Row centered style={{ marginTop: "12px" }}>
          <h1> Recent Posts</h1>
        </Grid.Row>

        {displayPosts()}
      </Grid>
    </div>
  );
}

export default Home;
