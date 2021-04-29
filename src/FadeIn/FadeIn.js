import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeIn.css';

export default function FadeIn(props) {
  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  useEffect(() => {
    setShouldFadeIn(true);
  }, []);

  return (
    <CSSTransition in={shouldFadeIn} classNames="fade" timeout={props.timeout}>
      {props.children}
    </CSSTransition>
  );
}
