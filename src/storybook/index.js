
export const mockPreviewAuthentications = {
  unknown: {
    title: 'session unknown',
    session: null
  },
  loading: {
    title: 'session loading',
    session: {
      data: null,
      status: 'loading'
    }
  },
  admin: {
    title: 'admin not authenticated',
    session: {
      data: {
        id: 1,
        login: 'admin',
        role: 'admin',
        roles: ['admin', 'user'],
        username: 'Administrator',
        email: 'admin@local'
      },
      status: 'unauthenticated'
    }
  },
  adminAuthed: {
    title: 'admin authenticated',
    session: {
      data: {
        id: 1,
        login: 'admin',
        role: 'admin',
        roles: ['admin', 'user'],
        username: 'Administrator',
        email: 'admin@local'
      },
      status: 'authenticated'
    }
  },
  user: {
    title: 'user not authenticated',
    session: {
      data: {
        id: 999,
        login: 'user',
        role: 'user',
        roles: ['user'],
        username: 'User',
        email: 'user@local'
      },
      status: 'unauthenticated'
    }
  },
  userAuthed: {
    title: 'user authenticated',
    session: {
      data: {
        id: 999,
        login: 'user',
        role: 'user',
        roles: ['user'],
        username: 'User',
        email: 'user@local'
      },
      status: 'authenticated'
    }
  }
};

export const mockPreviewAuthenticationsToolbar = ({
  name = 'appAuthenticated',
  description = 'Set authentication state',
  defaultValue = null,
  icon = 'user',
  items = mockPreviewAuthentications
} = {}) => {
  return {
    name,
    description,
    defaultValue,
    toolbar: {
      icon,
      items: Object.keys(items).map((e) => ({ value: e, title: items[e].title }))
    }
  }
}
