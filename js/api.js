async function getDataCallApi(url) {
  let result;
    result = await  fetch(url);
    if (result.ok) {
      let json = await result.json();
      return json;
  } else {
      alert("HTTP Request Error: " + result.status);
      return {};
  }
}
