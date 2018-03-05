var React = require('react');

class Comment extends React.Component {

    // breaking server side rendering no need with R16
    //rawMarkup() {
    //    var md = new (global.Remarkable || window.Remarkable)();  
    //    var rawMarkup = md.render(this.props.children.toString());
    //    return { __html: rawMarkup };
    //}

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span> {this.props.children.toString()} </span>
            </div>
        );
    }
};

module.exports = Comment;

// do not need with server side rendering
//ReactDOM.render(
//    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//    document.getElementById('content')
//);