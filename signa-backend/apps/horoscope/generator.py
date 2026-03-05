"""
Horoscope content generator.
In production, this could call an LLM API.
For the MVP, it uses templated, deterministic content.
"""
import random
from datetime import date


THEMES = {
    "aries":       ["energy", "courage", "action", "leadership"],
    "taurus":      ["stability", "pleasure", "persistence", "comfort"],
    "gemini":      ["communication", "curiosity", "adaptability", "wit"],
    "cancer":      ["intuition", "nurturing", "emotions", "home"],
    "leo":         ["creativity", "confidence", "warmth", "generosity"],
    "virgo":       ["precision", "service", "health", "analysis"],
    "libra":       ["harmony", "balance", "relationships", "beauty"],
    "scorpio":     ["transformation", "depth", "mystery", "power"],
    "sagittarius": ["freedom", "adventure", "philosophy", "optimism"],
    "capricorn":   ["ambition", "discipline", "achievement", "tradition"],
    "aquarius":    ["innovation", "community", "independence", "vision"],
    "pisces":      ["compassion", "dreams", "spirituality", "creativity"],
}

TEMPLATES = [
    "Today, {name}'s energy aligns with {theme1} and {theme2}. Embrace opportunities that come your way and trust your instincts.",
    "A day of {theme1} awaits {name}. Focus on what matters most, and let {theme2} guide your decisions.",
    "{name}, the cosmos highlight {theme1} today. Balance this with {theme2} for maximum harmony.",
    "The stars encourage {name} to embrace {theme1}. Challenges today involve {theme2}, but you have what it takes to shine.",
]


def generate_horoscope_content(sign, target_date: date) -> dict:
    """Generate deterministic horoscope content for a sign on a given date."""
    # Use date + sign as seed for determinism (same input → same output)
    seed = int(target_date.strftime('%Y%m%d')) + sign.id
    rng  = random.Random(seed)

    themes = THEMES.get(sign.slug, ["energy", "growth"])
    t1, t2 = rng.sample(themes, 2) if len(themes) >= 2 else (themes[0], themes[0])
    template = rng.choice(TEMPLATES)
    content  = template.format(name=sign.name, theme1=t1, theme2=t2)

    return {
        'content':      content,
        'love_score':   rng.randint(5, 10),
        'work_score':   rng.randint(5, 10),
        'health_score': rng.randint(5, 10),
        'lucky_number': rng.randint(1, 99),
        'lucky_color':  rng.choice(['Gold', 'Violet', 'Teal', 'Crimson', 'Silver', 'Indigo', 'Rose']),
    }
