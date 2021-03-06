import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {

	componentDidMount() {
		const { id } = this.props.match.params; // this is provided by react-router
		this.props.fetchPost(id);
	}

	onDeletePost() {
		const {id} = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/')
		});
	}

	render() {
		// this.props === ownProps
		const { post } = this.props;

		if(!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back To Index</Link>
				<button className="btn btn-danger pull-xs-right" onClick={this.onDeletePost.bind(this)}>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);