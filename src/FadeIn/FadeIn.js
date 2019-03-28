import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeIn.css';

// will fade in every time this.props.counter is incremented
class FadeIn extends Component {
  state = { fadeInTrigger: false }

  triggerFadeIn() {
    this.setState({fadeInTrigger: false});
    setTimeout(() => this.setState({fadeInTrigger: true}), 0);
  }

  componentDidMount() {
    this.setState({fadeInTrigger: true});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.counter !== this.props.counter) {
      this.triggerFadeIn();
    }
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