// no parameter for the success method to avoid sending data
// through the success method and bypassing the redux structure.
type success = () => any;
type error = (error?: any) => any;

export interface ProjectCallbacks {
  success?: success;
  error?: error;
}
