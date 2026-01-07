import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#Načte api_key
client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

#Definice obsahu JSONu který odešle front end
class PromptRequest(BaseModel):
    userPrompt: str
    password: str

@app.post("/")
async def generate_response(request: PromptRequest):
    #Generuje odpověď pomocí gemini-2.5-flash api
    #Vím že není hashováni a že máme heslo na githubu je to naschvál 😊
    try:
        if request.password != "ricany":
            return {"message": "Wrong password", "success": False}
        if not request.userPrompt:
            return {"message": "You need to send prompt", "success": False}

        # Systémový kontext pro model
        system_instruction = (
            "Jsi ukázkový robot na naší stránce a snažíš se starostovi (David Michalička) a jeho kolegům "
            "doporučit náš projekt, aby nás (Jáchym Šolta a Daniel Černý) vybrali na tvorbu webové stránky pro město Říčany. "
            "Udělej text krátký, tak 1 až 10 řádků. Kdyžtak děláme stránky v Next.js což můžeš hezky odpromovat. "
            "Cíl není napsat email nebo tak ale cíl je odpovídat ne prompty od pana starosty."
        )

        # Volání Gemini pomocí nové knihovny google-genai
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_instruction} Tady jejich prompt: {request.userPrompt}"
        )

        if not response or not response.text:
            return {"message": "Ai didn't respond, try resubmitting the message.", "success": False}

        return {
            "result": response.text,
            "success": True
        }

    except Exception as e:
        #Chytá error
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error 500")

if __name__ == "__main__":
    #Spustí server
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)