import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard/PostCard";

// query
import { allPost } from "../utils/graphql/postQuery";

function Home() {
  const { loading, error, data } = useQuery(allPost);
  const [columns, setColumns] = useState("two");

  useEffect(() => {
    if (window.innerWidth <= 668) {
      setColumns("one");
    } else {
      setColumns("two");
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 668) {
        setColumns("one");
      } else {
        setColumns("two");
      }
    });

    return () => {
      window.removeEventListener("resize");
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