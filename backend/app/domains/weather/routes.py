from fastapi import APIRouter, Query

router = APIRouter(prefix="/weather", tags=["Weather Integration"])

@router.get("/current")
def get_current_weather(location: str = Query("New York")):
    # Smart default weather generator / external weather hook
    return {
        "location": location,
        "temperature_celsius": 24,
        "temperature_fahrenheit": 75,
        "condition": "Partly Cloudy",
        "humidity": 45,
        "recommendation_vibe": "Light layering: Oversized Tee + Raw Denim + Sneakers"
    }
