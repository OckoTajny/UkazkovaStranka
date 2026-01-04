async function run(event) {
    event.preventDefault();
    const userPrompt = document.getElementById("userPrompt").value;
    document.getElementById("aiResponse").innerText = "Loading...";
    const password = document.getElementById("password").value
    try {
        const response = await fetch("https://ukazkovastranka.onrender.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userPrompt,
                password
            })
        });
        const data = await response.json();
        const text = data.result;
        if (text == undefined){
            document.getElementById("aiResponse").innerHTML = `<p  style="color: red;">Error: Wrong password</p>`;
            return; 
        }
        // 4. Vypiš výsledek
        console.log(text);
        document.getElementById("aiResponse").innerHTML = parseMarkdown(text);
    } catch (error) {
        console.error("Chyba při komunikaci s AI:", error);
        document.getElementById("aiResponse").innerText = "Chyba při komunikaci s AI.";
    }
}

function parseMarkdown(text) {
    if (!text) return "";
    
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}
