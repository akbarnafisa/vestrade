import React from "react";
export default ({
  children,
  className,
  disabled = false,
  type = `btn-primary`,
  loading = false,
  onClick,
}) => {
  const _className = () => {
    let _className = `btn ${type} relative py-3 px-8 `;
    return className ? _className + className : _className;
  };
  const Spinner = () => {
    return loading ? (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <style jsx>
          {`
            .spinner-wrapper {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            .spinner,
            .spinner:after {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }

            .spinner {
              transition-property: width height padding box-shadow border-width
                background opacity;
              transition-duration: 0.3s;
              transition-timing-function: ease-in-out;
              background: transparent;
              box-shadow: 0 0 0 #006799;
              border-top: 4px solid #4122dd;
              border-right: 4px solid #d9d3f8;
              border-bottom: 4px solid #d9d3f8;
              border-left: 4px solid #d9d3f8;
              transform: translateZ(0);
              animation: load8 1s infinite linear;
              animation-delay: 0.2s;
            }

            @-webkit-keyframes load8 {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes load8 {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    ) : null;
  };
  const Children = () => {
    return <span className={loading ? `opacity-0` : null}>{children}</span>;
  };
  return (
    <button className={_className()} disabled={disabled} onClick={onClick}>
      <Children />
      <Spinner />
    </button>
  );
};
