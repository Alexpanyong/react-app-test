import React, { Component } from 'react';
import './PostItem.css';

export class PostItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <li key={post.id} className="postItem">
        <div className="postUserID">User ID: {post.userId}</div>
        <div className="postTitle">{post.title}</div>
        <div className="postBody">{post.body}</div>
      </li>
    );
  }
}