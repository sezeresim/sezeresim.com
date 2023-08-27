import * as React from 'react';
import { SVGProps } from 'react';
const SvgCirclePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 1024 1024'
    {...props}
  >
    <path
      fill='currentColor'
      d='M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z'
    />
  </svg>
);
export default SvgCirclePlus;
