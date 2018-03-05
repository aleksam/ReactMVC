var React = require('react');

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

module.exports = CommentForm;

// do not need with server side rendering
//ReactDOM.render(
//    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//    document.getElementById('content')
//);