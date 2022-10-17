import { mockAuthPreviewToolbarItem, withMockAuth } from '@tomfreudenberg/next-auth-mock/storybook';

export const decorators = [withMockAuth];

export const globalTypes = { ...mockAuthPreviewToolbarItem() };
