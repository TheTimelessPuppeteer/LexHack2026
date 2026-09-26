from fastapi import FastAPI
from pydantic import BaseModel

from app.detector import analyze_rules

app = FastAPI()
class AnalyzeRequest(BaseModel):
    rule_a: str
    rule_b: str


@app.get("/")
def home():
    return {
        "name": "RuleTrace",
        "status": "running"
    }

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    return analyze_rules(
        request.rule_a,
        request.rule_b
    )
    