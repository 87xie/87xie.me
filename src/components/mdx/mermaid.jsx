import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import mermaid from 'mermaid';

const Mermaid = ({ code }) => {
  const config = { startOnLoad: true, theme: 'neutral' };

  useEffect(() => {
    mermaid.initialize(config);
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="mermaid">
      {code}
    </div>
  );
};

Mermaid.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Mermaid;
