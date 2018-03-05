var React = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData
        };
    }

    loadCommentsFromServer = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    }

    handleCommentSubmit = (comment) => {
        var data = new FormData();
        data.append('Author', comment.Author);
        data.append('Text', comment.Text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    }

    // R16 use constructor this.state in constuctor
    //getInitialState() {
    //    return { data: [] };
    //}

    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments for article {this.props.articleId}</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
};

// do not need with server side rendering
//ReactDOM.render(
//    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//    document.getElementById('content')
//);

module.exports = CommentBox;

