// import React from 'react';
// import { Loader } from '@tap-payments/loader';
// import './Loader.css';

// function TapLoader(props) {
//   return (
//     <div
//       style={props.style}
//       className={props.className != null && props.className != '' ? props.className : 'dashboard_loader'}
//     >
//       <Loader toggleAnimation={true} duration={2.5} />
//     </div>
//   );
// }
// export default TapLoader;

import React, { Fragment } from 'react';
const loaderContainerStyle = {
  width: '100px',
  height: '100px',
  display: 'block',
  position: 'relative',
  margin: 'auto',
};
const svgBoxLoaderStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  margin: '0',
  left: '0',
  right: '0',
};
function Loader({ outerColor, innerColor, duration, toggleAnimation, size, style }) {
  //// basic size is 50px
  let scaleStyle = size ? { transform: 'scale(' + size / 40.0 + ')' } : {};
  return (
    <div className="loader-container" style={style != null ? style : loaderContainerStyle}>
      <svg className="box-loader" style={Object.assign(scaleStyle, svgBoxLoaderStyle)}>
        <circle
          className="path-loader"
          style={{ stroke: outerColor }}
          cx="50%"
          cy="50%"
          r="20"
          fill="none"
          strokeLinecap="round"
          strokeWidth=" 3.6px"
          strokeDasharray=" 125, 124"
        >
          {toggleAnimation && (
            <Fragment>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur={duration / 3 + 's'}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0; 122; 122; 0; 0"
                keyTimes="0; 0.45; 0.55; 0.9; 1"
                dur={duration + 's'}
                repeatCount="indefinite"
              />
            </Fragment>
          )}
        </circle>
        <circle
          className="path-loader-inner"
          style={{ stroke: innerColor }}
          cx="50%"
          cy="50%"
          r="14"
          fill="none"
          strokeLinecap="round"
          strokeWidth=" 3.6px"
          strokeDasharray=" 88, 124"
        >
          {toggleAnimation && (
            <Fragment>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 50 50"
                to="0 50 50"
                dur={duration / 3 + 's'}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0; -85; -85; 0; 0"
                keyTimes="0; 0.45; 0.55; 0.9; 1"
                dur={duration + 's'}
                repeatCount="indefinite"
              />
            </Fragment>
          )}
        </circle>
      </svg>
    </div>
  );
}
Loader.defaultProps = {
  outerColor: '#423e3c',
  innerColor: '#423e3c',
  duration: 3.0,
  toggleAnimation: true,
  size: 50,
  style: {
    width: '100px',
    height: '100px',
    display: 'block',
    position: 'relative',
    margin: 'auto',
  },
};
export default Loader;
