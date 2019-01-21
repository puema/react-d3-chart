import * as React from 'react';
import { Component, ReactNode } from 'react';
import { DomainLinear, DomainTime } from './d3Chart.models';

export interface ChartStateProps {
  initialXDomain: DomainTime;
  initialYDomain: DomainLinear;
  children(state: ChartStateAndActions): ReactNode;
}

export interface ChartStateAndActions {
  state: ChartStateState;
  actions: {
    changeXDomain(domain: DomainTime): void;
    changeYDomain(domain: DomainLinear): void;
  };
}

export interface ChartStateState {
  xDomain: DomainTime;
  yDomain: DomainLinear;
}

export class ChartState extends Component<ChartStateProps, ChartStateState> {
  state: ChartStateState = {
    xDomain: this.props.initialXDomain,
    yDomain: this.props.initialYDomain,
  };

  changeXDomain = (domain: DomainTime) => {
    this.setState({ xDomain: domain });
  };

  changeYDomain = (domain: DomainLinear) => {
    this.setState({ yDomain: domain });
  };

  render() {
    return this.props.children(this.getStateAndActions());
  }

  getStateAndActions() {
    return {
      state: this.state,
      actions: {
        changeXDomain: this.changeXDomain,
        changeYDomain: this.changeYDomain,
      },
    };
  }
}
