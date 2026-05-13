from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Unit Converter API")

class ConversionRequest(BaseModel):
    value: float
    from_unit: str
    to_unit: str

CONVERSIONS = {
    ("miles", "kilometers"): lambda x: x * 1.60934,
    ("kilometers", "miles"): lambda x: x / 1.60934,
    ("pounds", "kilograms"): lambda x: x * 0.453592,
    ("kilograms", "pounds"): lambda x: x / 0.453592,
    ("fahrenheit", "celsius"): lambda x: (x - 32) * 5 / 9,
    ("celsius", "fahrenheit"): lambda x: (x * 9 / 5) + 32,
}

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Unit Converter API is running"}

@app.post("/convert")
def convert_units(request: ConversionRequest):
    conversion_key = (request.from_unit, request.to_unit)

    if conversion_key not in CONVERSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Conversion from {request.from_unit} to {request.to_unit} is not supported",
        )
    
    result = CONVERSIONS[conversion_key](request.value)

    return {
        "input_value": request.value,
        "from_unit": request.from_unit,
        "to_unit": request.to_unit,
        "result": round(result, 4),
    }