import React, {Component} from 'react';

export default class NoMapDisplay extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show
            ? (
              <div>
                <h3>Error loading map</h3>
                <p>Check your internet connection!</p>
              </div>
            )
            : (<div><h3>Loading... </h3></div>)
        } </div>
    )
  }
}
