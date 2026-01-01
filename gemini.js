async function run(event) {
    event.preventDefault();
    const userPrompt = document.getElementById("userPrompt").value;
    document.getElementById("aiResponse").innerText = "Loading";

    try {
        const response = await fetch("http://127.0.0.1:8000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userPrompt
            })
        });
        const data = await response.json();
        const text = data.result;
        // 4. Vypiš výsledek
        console.log(text);
        document.getElementById("aiResponse").innerText = text;
    } catch (error) {
        console.error("Chyba při komunikaci s AI:", error);
        document.getElementById("aiResponse").innerText = "Chyba při komunikaci s AI.";
    }
}