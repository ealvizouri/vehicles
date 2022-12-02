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
  /* if (body && body instanceof FormData) {
    const newBody = new URLSearchParams();
    const iterator = body.entries();
    let entry = iterator.next();
    while (entry.value) {
      const [key, value] = entry.value;
      newBody.append(key, value);
      entry = iterator.next();
    }
    body = newBody;
  } */
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
      /* headers: {
        'Content-Type': (isJson ? 'application/json' : 'form-data')
      }, */
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