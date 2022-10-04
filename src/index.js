import PropTypes from 'prop-types';

import { SessionContext } from 'next-auth/react';
import { useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const SessionContextProvider = ({ children, session }) => {
  const value = useMemo(() => {
    return session ? session : { data: undefined, status: "unauthenticated" };
  }, [session]);

  return (_jsx(SessionContext.Provider, { value: value, children: children }));
}

SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SessionContextProvider;
