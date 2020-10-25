import { React } from "./../deps.ts";

function Page(props) {
  return <html>
    <head>
      <title>Nextpp Page</title>
    </head>
    <body>
      <div id="root">
        {props.children}
      </div>
    </body>
  </html>;
}

export default Page;
