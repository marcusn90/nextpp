import { React, ReactDOM, ReactDOMServer } from "./../../deps.ts";

export function to_static(Component) {
  return ReactDOMServer.renderToStaticMarkup(<>{Component}</>);
}
