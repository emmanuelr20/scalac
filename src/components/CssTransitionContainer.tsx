import React from 'react'
import { CSSTransition } from 'react-transition-group';

interface Props{
    children: JSX.Element;
}

export default function CssTransitionContainer({ children, ...props }: Props) {
    const nodeRef = React.useRef(null);
    return (
        <CSSTransition
            nodeRef={nodeRef}
            timeout={500}
            classNames="move"
            {...props}
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    );
}
