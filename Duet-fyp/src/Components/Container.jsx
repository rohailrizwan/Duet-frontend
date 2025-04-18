import React from 'react';

function Container({ children }) {
  return (
    <div className="container w-[88%] sm:max-w-[1200px] mx-auto ">
      {children}
    </div>
  );
}

export default Container;
