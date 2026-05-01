import React from 'react';

const Polaroid = React.forwardRef(
  ({ src, alt, rotation = 'rotate-0', className = '' }, ref) => (
    <div
      ref={ref}
      className={`p-3 inline-block max-w-[300px] ${rotation} ${className}`}
    >
      <img src={src} alt={alt} className="w-full object-cover" />
    </div>
  ),
);

export default Polaroid;
