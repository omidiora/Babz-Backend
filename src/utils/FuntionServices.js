export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function errorActionMessage(error) {
  for (const key in error) {
    if (error.hasOwnProperty(key)) {
      const element = error[key];
      return element
    }
  }
}
