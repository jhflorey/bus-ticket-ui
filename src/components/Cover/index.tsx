import * as React from 'react';

interface ICoverProps {
}

const Cover: React.FunctionComponent<ICoverProps> = (props) => {
  return (
    <React.Fragment>
      <img src="/cover.png" alt="Cover" className="cover" />
    </React.Fragment>
  );
};

export default Cover;
