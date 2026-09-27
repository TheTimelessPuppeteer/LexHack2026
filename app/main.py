from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from app.detector import analyze_rules


app = FastAPI()


app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


class AnalyzeRequest(BaseModel):
    rule_a: str
    rule_b: str


@app.get("/")
def home():
    return FileResponse("app/static/index.html")


@app.get("/health")
def health():
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