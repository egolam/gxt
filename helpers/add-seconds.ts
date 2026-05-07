export function addSeconds(date: Date, seconds: number) {
  // Making a copy with the Date() constructor
  const dateCopy = new Date(date);
  dateCopy.setSeconds(date.getSeconds() + seconds);
  return dateCopy;
}
