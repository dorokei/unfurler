import React, { Component, MouseEvent, KeyboardEvent } from "react";
import marked from 'marked';
import SiteInfo from '../models/SiteInfo';
import ReactGA from 'react-ga';

enum Status {
  NONE,
  FETCHING,
  SUCCESS,
  FAILED,
}

interface AppState {
  url: string;
  text: string;
  status: Status;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      url: "",
      status: Status.NONE
    };
  }

  componentDidMount() {
    ReactGA.pageview("/");
  }

  submit(){
    if (this.state.status == Status.FETCHING) {
      return;
    } else {
      this.setState({ status: Status.FETCHING });
    }

    SiteInfo.createFromUrl(this.state.url).then((siteInfo: SiteInfo) => {
      if (siteInfo.valid()) {
        // const newText = this.state.text.length > 0 ? this.state.text + "\n\n" + siteInfo.outputMarkDownText() : siteInfo.outputMarkDownText();
        const newText = siteInfo.outputMarkDownText();
        this.setState({
          text: newText,
          status: Status.SUCCESS
        });
      } else {
        this.setState({
          status: Status.FAILED
        });
      }
    })
    .catch(error => {
      this.setState({
        status: Status.FAILED
      });
    });;
  }

  onClickSubmitButton(e: MouseEvent){
    this.submit();
  }

  onChangeInput(e: React.ChangeEvent<HTMLInputElement>){
    e.persist();
    this.setState({ url: e.target.value });
  }

  onCopyButtonClicked(e: MouseEvent){
    const textarea = document.getElementsByTagName("textarea")[0];
    textarea.select();
    document.execCommand("copy");
  }

  onLeaveCopyButton(e: MouseEvent){
  }

  onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>){
    e.persist();
    this.setState({ text: e.target.value });
  }

  onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      // Pressed Enter key
      e.preventDefault();
      this.submit();
    } else if (e.keyCode == 27) {
      // Pressed Esc key
    }
  }

  render() {
    const preview: string = marked(this.state.text)

    var statusMessage = (<></>);
    switch (+this.state.status) {
      case Status.FETCHING:
          statusMessage = (
            <>
              <span className="icon">
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
              Fetching...
            </>
          );
          break;
      case Status.SUCCESS:
          statusMessage = (
            <>
              <span className="icon">
                <i className="fas fa-check-square"></i>
              </span>
              OK!
            </>
          );
          break;
      case Status.FAILED:
          statusMessage = (
            <div className="has-text-danger">
              <span className="icon">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
              Faild!
            </div>
          );
          break;
      default:
          break;
    }

    return (
      <>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Unfurler
              </h1>
              <h2 className="subtitle">
                Get site information markdown.
              </h2>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="Paste a URL"
                    onChange={e => this.onChangeInput(e)}
                    onKeyDown={e => this.onKeyPress(e)}
                  />
                </div>
                <div className="control">
                  <button
                    disabled={this.state.status == Status.FETCHING}
                    className="button is-info  is-large"
                    onClick={e => this.onClickSubmitButton(e)}
                  >
                    GET
                  </button>
                </div>
              </div>
              <div className="has-text-right">
                {statusMessage}
              </div>
            </div>
          </div>
        </section>
        <div className="columns is-gapless">
          <div className="column area has-background-info is-textarea">
            <div className="area-content has-text-centered">
              <span className="title is-4">Markdown</span>
              <button
                className="button is-small is-pulled-right is-primary"
                onClick={e => this.onCopyButtonClicked(e)}
                onMouseLeave={e => this.onLeaveCopyButton(e)}
              >
                Copy
              </button>
              <textarea
                value={this.state.text}
                className="textarea"
                placeholder="Markdown here!"
                onChange={e => this.onChangeTextArea(e)}
              />
            </div>
          </div>
          <div className="column area has-background-warning">
            <div className="area-content has-text-centered">
              <span className="title is-4">Preview</span>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: preview
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
