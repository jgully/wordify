const urlBase = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3001";

export async function fetchJson(route, body, method, headers ) {
  let newBody = JSON.stringify(body);
  let newMethod = method || "GET";
  let newHeaders = { "Content-Type": "application/json; charset=utf-8" };
  Object.assign(newHeaders, headers);

  const options = { method: newMethod, headers: newHeaders, body: newBody };
  const response = await fetch(`${urlBase}${route}`, options);
  const responseJson = await response.json();
  if (response.ok) {
    return responseJson;
  } else {
    throw new Error(responseJson.message);
  }
}

export async function deleteJson(route, body, headers) {
  return fetchJson(route, body, "DELETE", headers);
}

export async function getJson(route, body, headers) {
  return fetchJson(route, body, "GET", headers);
}

export async function postJson(route, body, headers) {
  return fetchJson(route, body, "POST", headers);
}

export async function putJson(route, body, headers) {
  return fetchJson(route, body, "PUT", headers);
}
