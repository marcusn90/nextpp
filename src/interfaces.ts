export interface IConfigRouteEntry {
  prepare: Function;
  resolve_uri: Function;
  path: string;
}

export interface IConfig {
  output_dir: string;
  index_page: string;
  routes: Array<IConfigRouteEntry>;
}
