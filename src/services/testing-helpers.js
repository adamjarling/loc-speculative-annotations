import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

/**
 * Testing Library utility function to wrap tested component in React Router history
 * @param {ReactElement} ui A React element
 * @param objectParameters
 * @param objectParameters.route Starting route to feed React Router's history
 * @param objectParameters.history Override the history object if desired
 */
export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    state = {},
  } = {}
) {
  if (Object.keys(state).length > 0) {
    history.push(route, state);
  }

  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
