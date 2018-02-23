import React, { Component } from 'react';
import { PostItem } from './PostItem/PostItem';
import './Route1.css';

export class Route1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataPosts: [],
      selectedUserId: null,
      showAllPosts: true,
      alphSorted: false
    }
    this.sortByUserID = this.sortByUserID.bind(this);
    this.getAllUserID = this.getAllUserID.bind(this);
    this.setSelectedNumber = this.setSelectedNumber.bind(this);
    this.showAllPosts = this.showAllPosts.bind(this);
    this.alphabeticallySort = this.alphabeticallySort.bind(this);
    this.showPostsByID = this.showPostsByID.bind(this);
  }

  componentWillMount () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        this.setState({
          dataPosts: json
        });
      })
      .catch(
        () => {console.log("Fetch posts failed")}
      )
  }

  sortByUserID (posts, userID) {
      return posts ? posts.filter(post => post.userId === userID) : [];
  }

  getAllUserID (posts) {
    if (posts) {
      let arr = posts.map(post => post.userId);
      return arr.reduce((init, current) => {
        if (!init.includes(current)) {
          init.push(current);
        }
        return init;
      }, []).sort(function (a, b) { return parseInt(a) > parseInt(b)});
    }
  }

  setSelectedNumber (e) {
    const theID = parseInt(e.target.innerHTML);
    this.setState({
      selectedUserId: theID,
      showAllPosts: false,
      alphSorted: false
    });
  }

  alphabeticallySort (posts) {
    this.setState({
      showAllPosts: true,
      alphSorted: true
    });
    return !this.state.alphSorted ?
      posts.sort(function (a, b) {
        return a.title.substring(0, 1).toLowerCase().charCodeAt(0) - b.title.substring(0, 1).toLowerCase().charCodeAt(0);
      }) :
      [];
  }

  showAllPosts (posts) {
    this.setState({
      showAllPosts: true,
      alphSorted: false
    });
    return (!this.state.showAllPosts || this.state.alphSorted) ?
      posts.sort(function (a, b) { return parseInt(a.id) - parseInt(b.id); }) :
      [];
  }

  showPostsByID (posts, userId) {
    return posts ? this.sortByUserID(posts, userId) : [];
  }

  render() {
    const { dataPosts, showAllPosts, selectedUserId, alphSorted } = this.state;
    return (
      <div>
        <h2>Route 1</h2>
        <div>
          Group by user ID:
          <ul className="userIdList">
            {this.getAllUserID(dataPosts).map(item => <li key={item} onClick={this.setSelectedNumber}>{item}</li>)}
            <li onClick={() => this.showAllPosts(dataPosts)}>Show all posts</li>
            <li onClick={() => this.alphabeticallySort(dataPosts)}>Alphabetically sort</li>
          </ul>
        </div>
        <ul>
          {(showAllPosts && !alphSorted) && dataPosts.map(post => <PostItem key={post.id} post={post} />)}
          {!showAllPosts && this.showPostsByID(dataPosts, selectedUserId).map(post => <PostItem key={post.id} post={post} />)}
          {alphSorted && dataPosts.map(post => <PostItem key={post.id} post={post} />)}
        </ul>
      </div>
    );
  }
}
