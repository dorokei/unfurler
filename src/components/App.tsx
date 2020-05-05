import React, { Component, MouseEvent, KeyboardEvent } from "react";
import marked from 'marked';
import SiteInfo from '../models/SiteInfo';

interface AppState {
  url: string;
  text: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      url: ""
    };
  }

  submit(){
    console.log("submit");
    console.log("url: " + this.state.url);

    SiteInfo.createFromUrl(this.state.url).then((siteInfo: SiteInfo) => {
      if (siteInfo.valid()) {
        const newText = this.state.text.length > 0 ? this.state.text + "\n\n" + siteInfo.outputMarkDownText() : siteInfo.outputMarkDownText();
        this.setState({ text: newText });
      } else {
      }
    })
    .catch(error => {

    });;
  }

  onClickSubmitButton(event: MouseEvent){
    console.log("onClickSubmitButton");
    this.submit();
  }

  onChangeInput(e: React.ChangeEvent<HTMLInputElement>){
    console.log('#onChangeInput');
    e.persist();
    this.setState({ url: e.target.value });
  }

  onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>){
    console.log('#onChangeTextArea');
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

    return (
      <>
        <div>
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
                      className="button is-info  is-large"
                      onClick={e => this.onClickSubmitButton(e)}
                    >
                      GET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="columns is-gapless">
          <div className="column">
            <div className="notification is-info has-text-centered">
              MARKDOWN
              <textarea
                value={this.state.text}
                className="textarea"
                placeholder="10 lines of textarea"
                onChange={e => this.onChangeTextArea(e)}
              />
            </div>
          </div>
          <div className="column">
            <div className="notification is-warning has-text-centered">
              PREVIEW
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
