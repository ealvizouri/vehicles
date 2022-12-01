interface FetchProps {
  endpoint: string
  method?: string
  body?: any
  signal?: any
}

const _fetch = async ({ endpoint, method = 'GET', body, signal }: FetchProps) => {
  try {
    const res = await fetch(`http://localhost:8080/${endpoint}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      ...(signal ? { signal } : {}),
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    return { data: await res.json(), err: null };
  } catch (e) {
    return { data: null, err: e};
  }
}

export default _fetch;