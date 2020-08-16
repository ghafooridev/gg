import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders create room', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/create room/i);
  expect(linkElement).toBeInTheDocument();
});
