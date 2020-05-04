import React, { Component, MouseEvent } from "react";
import marked from 'marked';

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

  toggleCreateListForm(event: MouseEvent){
    // console.log(event);
    // console.log('#toggleCreateListForm');
  }

  onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>){
    console.log('#onChangeTextArea');
    this.setState({ text: e.target.value });
    e.persist();
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
                  Primary bold subtitle
                </h2>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input className="input is-large" type="text" placeholder="Paste a URL" />
                  </div>
                  <div className="control">
                    <button
                      className="button is-info  is-large"
                      onClick={e => this.toggleCreateListForm(e)}
                    >
                      Search
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
