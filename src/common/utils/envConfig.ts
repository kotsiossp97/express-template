import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const getPort = () => getEnvVar<number>("API_PORT", "number");
// export const getNodeEnv = () => getEnvVar<string>("NODE_ENV", "string");
export const getNodeEnv = () => process.env.NODE_ENV;
export const getIsProduction = () => getNodeEnv() === "production";
export const getCorsOrigin = () => getEnvVar<string>("CORS_ORIGIN", "string");

export function getEnvVar<T extends string | number>(key: string, type: "string" | "number"): T {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Unknown process.env.${key}: ${value}. Is your .env file setup?`);
  }

  if (type === "number") {
    const numValue = parseInt(value);
    if (Number.isNaN(numValue)) {
      throw new Error(`process.env.${key} must be a number. Got ${value}`);
    }
    return numValue as T;
  }

  return value as T;
}
