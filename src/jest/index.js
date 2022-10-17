import MockSessionContext, { mockAuthStates as defaultMockAuthStates } from '@tomfreudenberg/next-auth-mock';

/**
 *
 * Apply the MockSessionContext as decorator to your test.
 *
 */
export const withMockAuth = (children, session, mockAuthStates = defaultMockAuthStates) => {
  const useSession = (typeof session === 'string') ? mockAuthStates[session]?.session : session;
  return (
    <MockSessionContext session={useSession}>
      { children }
    </MockSessionContext>
  );
};
