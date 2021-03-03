import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => (
  <>
    <header>header</header>
    <main>
      {children}
    </main>
    <footer>footer</footer>
  </>
);

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
