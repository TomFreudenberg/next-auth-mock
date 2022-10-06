import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { SessionContext } from 'next-auth/react';

/**
 *
 * default items for toolbar menu to select different auth-states while mocking
 *
 */
export const mockAuthStates = {
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

/**
 *
 * Create a SessionContext based on NextAuth SessionContext to mock useSession()
 *
 */
const MockSessionContext = ({ children, session }) => {
  const value = useMemo(() => {
    return session ? session : { data: undefined, status: "unauthenticated" };
  }, [session]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

MockSessionContext.propTypes = {
  children: PropTypes.node.isRequired
};

export default MockSessionContext;
