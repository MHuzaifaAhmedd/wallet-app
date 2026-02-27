import Constants from "expo-constants";
import { Platform } from "react-native";

function getExpoHost() {
  // Expo Go / dev builds often expose host info here.
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.expoConfig?.debuggerHost ||
    Constants.manifest?.debuggerHost ||
    Constants.manifest2?.extra?.expoClient?.hostUri;

  if (!hostUri) return null;

  // Examples:
  // - "192.168.100.22:8081"
  // - "192.168.100.22:8081/some/path"
  // - "exp://192.168.100.22:8081"
  const withoutScheme = hostUri.replace(/^[a-z]+:\/\//i, "");
  const withoutPath = withoutScheme.split("/")[0];
  const host = withoutPath.split(":")[0];
  return host || null;
}

function resolveApiUrl() {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  const expoHost = getExpoHost();

  const isAndroidEmulator = Platform.OS === "android" && !Constants.isDevice;
  const fallbackHost = isAndroidEmulator ? "10.0.2.2" : "localhost";
  const fallbackUrl = `http://${fallbackHost}:5001/api`;

  if (envUrl) {
    // If env is set to localhost but running on a physical device, rewrite to dev-machine LAN IP.
    if (Constants.isDevice && expoHost && /\/\/localhost(?=[:/]|$)/i.test(envUrl)) {
      return envUrl.replace(/\/\/localhost(?=[:/]|$)/i, `//${expoHost}`);
    }
    // Android emulator can't reach your PC via "localhost".
    if (isAndroidEmulator && /\/\/localhost(?=[:/]|$)/i.test(envUrl)) {
      return envUrl.replace(/\/\/localhost(?=[:/]|$)/i, "//10.0.2.2");
    }
    return envUrl;
  }

  // If env var is missing, still try to be usable in Expo Go on device.
  if (Constants.isDevice && expoHost) return `http://${expoHost}:5001/api`;

  return fallbackUrl;
}

export const API_URL = resolveApiUrl();
