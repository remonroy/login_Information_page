import React from "react";
import ReactHelmet from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <ReactHelmet>
      <title>{title}</title>
    </ReactHelmet>
  );
};

export default MetaData;
