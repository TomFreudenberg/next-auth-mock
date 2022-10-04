<h3 align="center">Next-Auth Mockup</h3>
<p align="center">
  <strong>Some helpful tools to test and write stories for your Next-Auth NextJS application.</strong>
</p>
<p align="center">
-- use it with nodejs and jest, storybook, cypress, others --
</p>

<br>


## next-auth-mock

**ATTENTION:** To use this library currently you need to install a version from [Next-Auth](https://github.com/nextauthjs/next-auth) later than currently published release **4.12.2**. Otherwise the necessary `SessionContext` is not exported and available. Checkout the [commit](https://github.com/nextauthjs/next-auth/commit/97feae791630e0f38e3e26b3bd70cc77e94b3eda) from [PR #5438](https://github.com/nextauthjs/next-auth/pull/5438).

The next steps are only necessary until a new release of next-auth will be published by them!

<br>


### Prepare for next-auth while release <= 4.12.2

Get next-auth from github and build yourself:

```bash
cd /my-work-folder/

git clone https://github.com/nextauthjs/next-auth.git

cd ./next-auth

# get the commit from PR
git checkout 97feae791630e0f38e3e26b3bd70cc77e94b3eda

pnpm install

pnpm build
```

Now you have a working self-build release of next-auth.

<br>


### Get this mock library and build while <= next-auth@4.12.2

```bash
cd /my-work-folder/

git clone https://github.com/TomFreudenberg/next-auth-mock.git

cd ./next-auth-mock

pnpm install
```

<br>


### IMPORTANT to link the next-auth self build library

You have to link the self built next-auth library to this component as well as to your app to replace the "outdated" 4.12.2 release.

```bash
cd /my-work-folder/next-auth-mock

pnpm link ../next-auth/packages/next-auth

cd /my-app/

pnpm link /my-work-folder/next-auth/packages/next-auth
```

_Please check pathes to be correct for your system and environment_

<br>


## Using next-auth-mock

### Installation

Install this library by adding it to your devDependencies:

```bash
pnpm add --save-dev @tomfreudenberg/next-auth-mock
```

<br>

### Include into storybook preview

Update your `.storybook/preview.js`:

```js
import SessionContextProvider from '@tomfreudenberg/next-auth-mock';
import { mockPreviewAuthentications, mockPreviewAuthenticationsToolbar } from '@tomfreudenberg/next-auth-mock/storybook';

export const globalTypes = {
  appAuthenticated: mockPreviewAuthenticationsToolbar()
};

const withAuthProvider = (Story, context) => {
  const session = mockPreviewAuthentications[context.globals.appAuthenticated]?.session;

  return (
    <SessionContextProvider session={session}>
      <Story {...context} />
    </SessionContextProvider>
  );
};

export const decorators = [withAuthProvider];
```

<br>

### Toolbar integration

After restarting your storybook, an icon will appear in the toolbar:

<img width="191" alt="image" src="https://user-images.githubusercontent.com/410087/193901653-12114ea3-9a4c-4d93-ac93-46576a2409e6.png">

That allows to select the session state.

<br>


## Writing stories and include your components

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

You may now control and test your component state of `useSession()` by the toolbar items:

![next-auth-mock-storybook-preview](https://user-images.githubusercontent.com/410087/193903296-0c0ba17d-0c81-4034-afb2-36f5214ad5bc.gif)

<br>


## Using a fix state to test a component

To make sure that your component may be tested with a fixed auth state regardless the the toolbar selection, you may overwrite the session properties:

```jsx
// ./stories/pages/signin.stories.jsx

import SessionContextProvider from '@tomfreudenberg/next-auth-mock';
import { useSession } from 'next-auth/react';

import SigninPage from '@/pages/auth/signin';

export default {
  title: 'Pages/Auth',
  component: SigninPage
};

export const SigninPageStory = (props) => {
  // get values from current session set by globalTypes
  const current_session = useSession();

  // enforce no session to make sure that the SigninPage will be shown (not authenticated)
  current_session.status = 'unauthenticated';

  // overrule the main SessionContextProvider with updated settings
  return (
    <SessionContextProvider session={current_session}>
      <SigninPage />
    </SessionContextProvider>
  );
}

SigninPageStory.parameters = {};
```

<br>


## npm Package

You may find, use and download the npm package on [npmjs.com](https://npmjs.com/package/@tomfreudenberg/next-auth-mock).

[![npm Version](https://badge.fury.io/js/@tomfreudenberg%2Fnext-auth-mock.svg)](https://badge.fury.io/js/@tomfreudenberg%2Fnext-auth-mock) &nbsp;

<br>


## Documentation

**[Project homepage](https://github.com/TomFreudenberg/next-auth-mock)** - you will find a README at [Github](https://github.com/TomFreudenberg/next-auth-mock)

<br>


## Author & Credits

Author: [Tom Freudenberg](https://about.me/tom.freudenberg)

Copyright (c) 2022 [Tom Freudenberg](https://github.com/TomFreudenberg/), released under the MIT license
