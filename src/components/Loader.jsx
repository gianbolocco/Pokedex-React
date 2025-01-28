import React, { useEffect } from 'react';
import { quantum } from 'ldrs';

const Loader = () => {
  useEffect(() => {
    quantum.register();
  }, []);

  return (
    <div className="container-loader">
      <l-quantum size="45" speed="1.75" color="blue"></l-quantum>
    </div>
  );
};

export default Loader;
