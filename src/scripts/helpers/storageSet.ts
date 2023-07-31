function storageSet<T>(key: string, value: T): void {
  if (typeof value === "string") localStorage.setItem(key, value);
  else localStorage.setItem(key, JSON.stringify(value));
}

export default storageSet;
