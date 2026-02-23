import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';

interface Props {
  children: ReactNode;
  buttonText?: string;
  navigateTo?: string;
}

interface State {
  hasError: boolean;
}

export default class PlaceErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PlaceErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <PlaceNotFoundPage
          buttonText={this.props.buttonText}
          navigateTo={this.props.navigateTo}
        />
      );
    }

    return this.props.children;
  }
}
