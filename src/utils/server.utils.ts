import { networkInterfaces } from 'os';
/**
 * Utils helper
 */
export class ServerUtils {
  public static getLocalIPv4(): string | undefined {
    const { address } = (Object.values(networkInterfaces()).reduce(
      (accum, arr) => (accum || []).concat(arr || []),
    ) || []).find(
      ({ family, internal }) => !internal && family === 'IPv4',
    ) || {};

    return address;
  }
}
export default {};
