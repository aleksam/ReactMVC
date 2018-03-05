var React = require('react');
var Comment = require('./Comment');

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author} key={comment.Id}>
                    {comment.Text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
};

module.exports = CommentList;

// do not need with server side rendering
//ReactDOM.render(
//    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//    document.getElementById('content')
//);