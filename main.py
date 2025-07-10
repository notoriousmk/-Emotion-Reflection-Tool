# bankend file main.py

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# CORS for frontend
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Emoji(BaseModel):
    name: str

class Emojis(BaseModel):
    emojis: list[Emoji]

class ReflectionRequest(BaseModel):
    text: str

# In-memory storage
memory_db = {"emojis": []}

@app.get("/emojis", response_model=Emojis)
def get_emojis():
    return Emojis(emojis=memory_db['emojis'])

@app.post("/emojis/add")
def add_emoji(emoji: Emoji):
    memory_db["emojis"].append(emoji)
    return {"message": "Emoji added successfully"}

@app.post("/analyze")
def analyze_emotion(request: ReflectionRequest):
    fake_emotions = ["Happy", "Sad", "Anxious", "Excited", "Angry"]
    emotion = random.choice(fake_emotions)
    confidence = round(random.uniform(0.7, 0.99), 2)
    return {
        "emotion": emotion,
        "confidence": confidence
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)