<h3 align="center">NextAuth.js Mockup</h3>
<p align="center">
  <strong>Some helpful tool library to write tests and stories for your <a href="https://next-auth.js.org/">NextAuth.js</a> powered <a href="https://nextjs.org/">NEXT.js</a> application.</strong>
</p>
<p align="center">
-- use it with nodejs and jest, storybook, cypress, others --
</p>

<br>


## next-auth-mock

<br>


### Installation

Install this library by adding it to your devDependencies:

```bash
pnpm add --save-dev @tomfreudenberg/next-auth-mock
```

<br>


## Storybook

<br>

### Add to your storybook preview

Update `.storybook/preview.js`:

```js
import { mockAuthPreviewToolbarItem, withMockAuth } from '@tomfreudenberg/next-auth-mock/storybook';

export const globalTypes = {
  ...mockAuthPreviewToolbarItem()
};

export const decorators = [withMockAuth];
```

<br>

### Use toolbar menu

After restarting your storybook, an additional icon will appear in the toolbar:

<img width="191" alt="image" src="https://user-images.githubusercontent.com/410087/193901653-12114ea3-9a4c-4d93-ac93-46576a2409e6.png">

That allows to select the session state.

<br>


### Write stories and include your components

```jsx
// ./stories/pages/denied.stories.jsx

import DeniedPage from '@/pages/auth/denied';

export default {
  title: 'Pages/Auth',
  component: DeniedPage
};

export const DeniedPageStory = (args) => <DeniedPage />;

DeniedPageStory.parameters = {};
```

<br>

You may now control and test your component state of `useSession()` by the toolbar items:

![next-auth-mock-storybook-preview](https://user-images.githubusercontent.com/410087/193903296-0c0ba17d-0c81-4034-afb2-36f5214ad5bc.gif)

<br>


### Use a fix state to test a component

To make sure that your component may be tested with a fixed auth state regardless the the toolbar selection, you may overwrite the session properties:

```jsx
// ./stories/pages/signin.stories.jsx

import MockSessionContext from '@tomfreudenberg/next-auth-mock';
import { useSession } from 'next-auth/react';

import SigninPage from '@/pages/auth/signin';

export default {
  title: 'Pages/Auth',
  component: SigninPage
};

export const SigninPageStory = (props) => {
  // clone values from current session set by globalTypes
  const mocked_session = { ...useSession() };

  // enforce unauthenticated to make sure that the SigninPage will be shown (not authenticated)
  mocked_session.status = 'unauthenticated';

  // overrule the main MockSessionContext with mocked session
  return (
    <MockSessionContext session={mocked_session}>
      <SigninPage />
    </MockSessionContext>
  );
}

SigninPageStory.parameters = {};
```

<br>


### Customize toolbar icon and items

The additional toolbar entry could be completely customized. Just set the options to `mockAuthPreviewToolbarItem()` as you like.

```js
export const mockAuthPreviewToolbarItem = ({
  name = 'mockAuthState',
  description = 'Set authentication state',
  defaultValue = null,
  icon = 'user',
  items = mockAuthStates
} = {}) => ...
```

Let's change the language of the description as an example:

```js
export const globalTypes = {
  ...mockAuthPreviewToolbarItem({ description: 'Auswahl Anmeldestatus')
};
```

If you like to change the given states, just clone and change or rewrite the `mockAuthStates` at [@tomfreudenberg/next-auth-mock](https://github.com/TomFreudenberg/next-auth-mock/blob/df5f1a55e82fca8a182402b39c1ec216f47758a7/src/index.js#L7-L80)

<br>


## Jest

### Write tests and include your components

```jsx
// ./tests/pages/signout.stories.jsx

import { render, screen } from '@testing-library/react'
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest';
import SignoutPage from '@/pages/auth/signoutx';

describe('Pages', () => {
  describe('Signout', () => {
    it('should render want to sign out', () => {
      render(withMockAuth(<SignoutPage />, 'userAuthed'));
      expect(screen.getByText('Do you want to sign out?'));
    });
    it('should render not signed in', () => {
      render(withMockAuth(<SignoutPage />, 'unknown'));
      expect(screen.getByText('You are not signed in!'));
    });
  });
});
```

You may enter the name of an `mockAuthStates` entry as argument for `withMockAuth` or put in a session object.

```jsx
import { mockAuthStates } from '@tomfreudenberg/next-auth-mock';
render(withMockAuth(<SignoutPage />, mockAuthStates.userAuthed.session));

// is equal to

render(withMockAuth(<SignoutPage />, 'userAuthed'));
```

Valid states are: `unknown`, `loading`, `admin`, `adminAuthed`, `user`, `userAuthed`

<br>


## Contributing

If you like to contribute to next-auth-mock package or need to use it from source, you have to install the devDependencies and build the dist package.

Just go for:

```bash
git clone git@github.com:TomFreudenberg/next-auth-mock.git

cd next-auth-mock

pnpm install

pnpm build
```

Your ideas and PRs are welcome.

<br>


## npm Package

You may find, use and download the npm package on [npmjs.com](https://npmjs.com/package/@tomfreudenberg/next-auth-mock).

[![npm Version](https://img.shields.io/npm/v/@tomfreudenberg/next-auth-mock?style=for-the-badge)](https://npmjs.com/package/@tomfreudenberg/next-auth-mock) &nbsp;

<br>


## Documentation

**[Project homepage](https://github.com/TomFreudenberg/next-auth-mock)** - you will find a README at [Github](https://github.com/TomFreudenberg/next-auth-mock)

<br>


## Author & Credits

Author: [Tom Freudenberg](https://about.me/tom.freudenberg)

Copyright (c) 2022 [Tom Freudenberg](https://github.com/TomFreudenberg/), released under the MIT license
