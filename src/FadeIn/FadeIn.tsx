import { useLayoutEffect, useState, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeIn.css';

type Props = {
  timeout: number;
  children: ReactNode;
};

export default function FadeIn({ timeout, children }: Props) {
  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  useLayoutEffect(() => {
    setShouldFadeIn(true);
  }, []);

  return (
    <CSSTransition in={shouldFadeIn} classNames="fade" timeout={timeout}>
      {children}
    </CSSTransition>
  );
}
