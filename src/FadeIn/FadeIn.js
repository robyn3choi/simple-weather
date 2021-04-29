import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeIn.css';

class FadeIn extends Component {
  state = { fadeInTrigger: false };

  componentDidMount() {
    this.setState({ fadeInTrigger: true });
  }

  render() {
    return (
      <CSSTransition in={this.state.fadeInTrigger} classNames="fade" timeout={this.props.timeout}>
        {this.props.children}
      </CSSTransition>
    );
  }
}

export default FadeIn;
