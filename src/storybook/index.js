import React from 'react';

import MockSessionContext, { mockAuthStates } from '@tomfreudenberg/next-auth-mock';

/**
 *
 * Create the toolbar icon and menu with authStates for mocking.
 *
 */
export const mockAuthPreviewToolbarItem = ({
  name = 'mockAuthState',
  description = 'Set authentication state',
  defaultValue = null,
  icon = 'user',
  items = mockAuthStates
} = {}) => {
  return {
    mockAuthState: {
      name,
      description,
      defaultValue,
      toolbar: {
        icon,
        items: Object.keys(items).map((e) => ({ value: e, title: items[e].title }))
      }
    }
  }
}

/**
 *
 * Apply the MockSessionContext as decorator to your storybook preview.
 *
 */
export const withMockAuth = (Story, context) => {
  const session = React.useMemo(() => {
    return mockAuthStates[context.globals.mockAuthState]?.session;
  }, [context.globals.mockAuthState]);

  return React.createElement(MockSessionContext, { session: session }, React.createElement(Story, context));
};
