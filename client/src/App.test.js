import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders create room', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Engage, socialize and connect/i);
  expect(linkElement).toBeInTheDocument();
});
