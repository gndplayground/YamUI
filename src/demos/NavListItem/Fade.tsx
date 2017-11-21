/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import autobind from 'core-decorators/lib/autobind';
import TimedTransition, { TransitionStyles } from './TimedTransition';

export interface FadeProps {
  /**
   * Time to wait before showing the children (in milliseconds).
   */
  showAfter?: number;

  /**
   * Duration of the animation (in milliseconds).
   */
  duration: number;

  /**
   * Time to wait before hiding the children (in milliseconds).
   */
  hideAfter?: number;

  /**
   * Animation end callback handler.
   */
  onAnimationEnd?: () => void;
}

export default class Fade extends React.PureComponent<FadeProps, {}> {
  render() {
    return (
      <TimedTransition {...this.props} getStyle={this.getStyle}>
        <div>{this.props.children}</div>
      </TimedTransition>
    );
  }

  @autobind
  private getStyle(state: string) {
    const { showAfter, duration } = this.props;
    const opacityTransition = `opacity ${duration}ms ${showAfter}ms`;
    const transition = {
      transition: opacityTransition,
      MSTransition: opacityTransition,
    };

    const transitionStyles: TransitionStyles = {
      entering: {
        opacity: 0,
      },
      entered: {
        opacity: 1,
        ...transition,
      },
      exiting: {
        opacity: 1,
      },
      exited: {
        opacity: 0,
        ...transition,
      },
    };

    return transitionStyles[state];
  }
}
