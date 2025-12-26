async function fetchDeno() {
  try {
    const response = await fetch("https://testovaci-api.deno.dev/");
    return await response.text();
  } catch (error) {
    console.log(error);
  }
}

async function testik() {
  const spanik = document.getElementById("spanik");
  const humanTime = document.getElementById("humanTime");
  
  // Zobraz loading state
  spanik.innerText = "Načítám...";
  spanik.classList.add("loading");
  humanTime.innerText = "";
  
  // Počkej minimálně 800ms, aby se loading měl čas ukázat
  const startTime = Date.now();
  const response = await fetchDeno();
  const elapsed = Date.now() - startTime;
  const remainingDelay = Math.max(0, 400 - elapsed);
  
  if (remainingDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingDelay));
  }
  
  spanik.innerText = response;
  spanik.classList.remove("loading");
  
  // Extrahuj čas z odpovědi
  try {
    // Vyzkoušej ISO formát
    let dateMatch = response.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    
    // Pokud ne, vyzkoušej JavaScript Date string formát
    if (!dateMatch) {
      dateMatch = response.match(/\w+ \w+ \d+ \d{4} \d{2}:\d{2}:\d{2}/);
    }
    
    if (dateMatch) {
      const date = new Date(dateMatch[0]);
      // API vrací čas v UTC, přidej 1 hodinu pro CET
      date.setHours(date.getHours() + 1);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      humanTime.innerText = "Právě je: " + date.toLocaleDateString('cs-CZ', options);
    } else {
      humanTime.innerText = "Čas se nepodařilo sparsovat";
    }
  } catch (e) {
    humanTime.innerText = "Chyba: " + e.message;
  }
}
