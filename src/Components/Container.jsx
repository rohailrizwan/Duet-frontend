import React from 'react';

function Container({ children }) {
  return (
    <div className="w-[90%]  mx-auto sm:max-w-[1200px]">
      {children}
    </div>
  );
}

export default Container;
