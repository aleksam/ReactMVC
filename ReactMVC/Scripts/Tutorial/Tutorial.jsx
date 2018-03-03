class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
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
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
};

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

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: ''
        };
    }

    // R16 use constructor this.state in constuctor
    //getInitialState() {
    //    return { author: '', text: '' };
    //}

    handleAuthorChange = (e) => {
        this.setState({ author: e.target.value });
    }
    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ Author: author, Text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form className="commentForm form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Your name"
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Say something..."
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                </div>
                <div className="form-group">
                    <input className="btn btn-default" type="submit" value="Post" />
                </div>
            </form>
        );
    }
};

class Comment extends React.Component {
    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
};

ReactDOM.render(
    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
    document.getElementById('content')
);