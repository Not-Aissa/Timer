function storageGet<T>(key: string, parse: boolean): T {
  let value: T;

  if (parse) value = JSON.parse(`${localStorage.getItem(key)}`) as T;
  else value = localStorage.getItem(key) as T;

  return value;
}

export default storageGet;
