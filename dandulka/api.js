async function fetchDeno() {
  try {
    const response = await fetch("https://testovaci-api.deno.dev/");
    return await response.text();
  } catch (error) {
    return "Chyba: " + error.message;
  }
}

async function testik() {
  const container = document.getElementById("container");
  container.classList.remove("hidden");
  
  const packet = document.querySelector(".packet");
  packet.classList.remove("animating");
  
  setTimeout(() => {
    packet.classList.add("animating");
  }, 10);
  
  setTimeout(async () => {
    const data = await fetchDeno();
    document.getElementById("response").textContent = data;
  }, 3000);
}
