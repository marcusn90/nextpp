import { React, ReactDOM, ReactDOMServer } from "nextpp/deps.ts";

export function to_static(Component) {
  return ReactDOMServer.renderToStaticMarkup(<>{Component}</>);
}
