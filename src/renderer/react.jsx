import React, { ReactDOM, ReactDOMServer } from "nextpp/deps/react.ts";

export function to_static(Component) {
  return ReactDOMServer.renderToStaticMarkup(
    <>{Component}</>,
  );
}
