import * as React from "react"
import Post from "../models/Post"
import "@material-ui/core"
// styles
const pageStyles = {
  color: "#232129",
  padding: 72,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const serverUrl = "http://localhost:5050";

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    }
  }

  componentDidMount() {
    fetch(`${serverUrl}/api/posts/`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          posts: result.posts
        });
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, posts } = this.state;
    if(error) {
      return <div>Error: {error.message} @ {serverUrl}/api/posts/</div>;
    } else if (!isLoaded) {
      return <div>Loading posts...</div>;
    } else {
      console.log(posts);
      var postListItems = posts.map((post) =>
        <Post content={post}></Post>
      );
      return (
        <main style={pageStyles}>
          <title>Salvi Blog</title>
          <h1>Salvi Blog</h1>
          <hr></hr>
          <ul>{postListItems}</ul>
        </main>
      )
    }
  }
}

export default IndexPage
