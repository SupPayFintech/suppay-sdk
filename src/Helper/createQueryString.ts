export function createQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(`${key}[]`, item.toString());
        }
      });
    } else {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    }
  }

  return searchParams.toString();
}
