export function ISOtoLocal(
  timestamp: string,
  timeZone = "America/Vancouver",
  locale = "en-CA",
) {
  const date = new Date(timestamp);
  const options = { timeZone };
  return date.toLocaleString(locale, options);
}
