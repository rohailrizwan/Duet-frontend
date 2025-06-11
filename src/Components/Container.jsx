import React from 'react';

function Container({ children }) {
  return (
    <div className="container  sm:max-w-[1200px] ">
      {children}
    </div>
  );
}

export default Container;
