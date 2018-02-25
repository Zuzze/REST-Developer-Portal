/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* To import JSON from file instead of HTTP */
declare module "*.json" {
  const value: any;
  export default value;
}
