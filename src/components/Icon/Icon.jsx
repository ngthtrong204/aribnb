import React from 'react';

const Icon = ({ nameIcon, className, ...props }) => {
  const iconPath = require(`./icon/${nameIcon}.svg`);
  return <div className={className}>
    <img src={iconPath} alt={nameIcon} {...props} />
  </div>
};

export default Icon;