import React, { Component } from "react";
import "./App.css";

function Post({ title, creator }) {
  return (
    <div className="Post">
      <div className="Post_Columns">{title}</div>
      <div className="Post_Columns">{creator}</div>
    </div>
  );
}

class Tmp extends Component {
  state = {};

  componentDidMount() {
    this._getPosts();
  }

  _getPosts = async () => {
    const posts = await this._callApi();
    this.setState({
      posts
    });
  };

  _callApi = () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    return fetch(proxyUrl + "http://lunahc92.tplinkdns.com/api/posts/list")
      .then(response => response.json())
      .then(json => json.posts)
      .catch(err => console.log(err));
  };

  _renderPosts = () => {
    const posts = this.state.posts.map(post => {
      return <Post title={post.title} creator={post.creator} key={post.id} />;
    });
    return posts;
  };

  render() {
    return (
      <div className="App">
        {this.state.posts ? this._renderPosts() : "Loading!!"}
      </div>
    );
  }
}

export default Tmp;
