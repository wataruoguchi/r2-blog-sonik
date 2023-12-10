export function ISOtoLocal(timestamp: string, timeZone = "America/Vancouver") {
  const date = new Date(timestamp);
  const options = { timeZone };
  return date.toLocaleString("en-CA", options);
}
