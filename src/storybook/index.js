import MockSessionContext from '@tomfreudenberg/next-auth-mock';
import previewMockAuthStates from '@tomfreudenberg/next-auth-mock/storybook/preview-mock-auth-states';

import { SB_PARAMETER_KEY } from './constants';

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
  items = previewMockAuthStates
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

  // Set a session value for mocking
  const session = (() => {
    // Allow overwrite of session value by parameter in story
    const paramValue = context?.parameters[SB_PARAMETER_KEY];
    if (typeof paramValue?.session === 'string') {
      return previewMockAuthStates[paramValue.session]?.session;
    } else {
      return paramValue?.session ? paramValue.session : previewMockAuthStates[context.globals.mockAuthState]?.session;
    }
  })();

  return (
    <MockSessionContext session={session}>
      <Story {...context} />
    </MockSessionContext>
  );
};
