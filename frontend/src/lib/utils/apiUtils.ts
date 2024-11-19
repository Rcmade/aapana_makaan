export const fetcher = async (url: string, req?: RequestInit | null) => {
  const res = await fetch(url, {
    credentials: "include",
    next: {
      revalidate: 30,
    },
    ...req,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
};
