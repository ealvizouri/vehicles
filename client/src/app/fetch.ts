interface FetchProps {
  endpoint: string
  method?: string
  isJson?: boolean,
  body?: any
  signal?: any
}
/* REGARDING FormData instead of JSON
https://github.com/expressjs/multer/issues/776
*/
const _fetch = async ({ endpoint, method = 'GET', isJson = true, body, signal }: FetchProps) => {
    try {
    const res = await fetch(`http://localhost:8080/${endpoint}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      ...(isJson ? {
        headers: {
          'Content-Type': 'application/json'
        }
      } : {}),
      ...(signal ? { signal } : {}),
      body: isJson ? JSON.stringify(body) : body ?? {}
    });
    const data = await res.json();
    return { data, err: null };
  } catch (e) {
    return { data: null, err: e};
  }
}

export default _fetch;