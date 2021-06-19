import * as React from "react"

class Post extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            errors: null,
            isLoaded: false,
            post: props.content
        }
    }

    render () {
        const { errors, isLoaded, post } = this.state;
        console.log(post);
        return (
            <div>
                {post.content}
            </div>
        )
    }
}

export default Post;