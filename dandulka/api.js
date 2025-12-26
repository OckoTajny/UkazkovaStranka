async function fetchDeno() {
  try {
    const response = await fetch("https://testovaci-api.deno.dev/");
    return await response.text();
  } catch (error) {
    console.log(error);
  }
}

async function testik() {
  const spanik = document.getElementById("spanik")
  spanik.innerText = (await fetchDeno())
}
