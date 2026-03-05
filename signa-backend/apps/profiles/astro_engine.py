"""
Core astrology computation engine.
Calculates sun, moon, and rising signs from birth data.
Uses PyEphem for astronomical calculations.
"""
from datetime import date, time
from dataclasses import dataclass
from typing import Optional

try:
    import ephem
    EPHEM_AVAILABLE = True
except ImportError:
    EPHEM_AVAILABLE = False

import math

SIGNS_ORDERED = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
]

# (month_start, day_start, month_end, day_end, slug)
SUN_SIGN_RANGES = [
    (3, 21, 4, 19,  "aries"),
    (4, 20, 5, 20,  "taurus"),
    (5, 21, 6, 20,  "gemini"),
    (6, 21, 7, 22,  "cancer"),
    (7, 23, 8, 22,  "leo"),
    (8, 23, 9, 22,  "virgo"),
    (9, 23, 10, 22, "libra"),
    (10, 23, 11, 21, "scorpio"),
    (11, 22, 12, 21, "sagittarius"),
    (12, 22, 1, 19,  "capricorn"),
    (1, 20, 2, 18,   "aquarius"),
    (2, 19, 3, 20,   "pisces"),
]


@dataclass
class BirthData:
    birth_date: date
    birth_time: Optional[time] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


def get_sun_sign(birth_date: date) -> str:
    """Determine sun sign from birth date."""
    m, d = birth_date.month, birth_date.day
    for sm, sd, em, ed, slug in SUN_SIGN_RANGES:
        if sm <= em:  # same-year range
            if (m == sm and d >= sd) or (sm < m < em) or (m == em and d <= ed):
                return slug
        else:  # wraps year (Capricorn: Dec 22 – Jan 19)
            if (m == sm and d >= sd) or (m == em and d <= ed):
                return slug
    return "capricorn"  # fallback


def _ecliptic_longitude_to_sign(lon_deg: float) -> str:
    index = int(lon_deg / 30) % 12
    return SIGNS_ORDERED[index]


def get_moon_sign(birth_data: BirthData) -> Optional[str]:
    """
    Compute moon sign using PyEphem.
    Requires birth_time and coordinates for accuracy.
    """
    if not EPHEM_AVAILABLE or not birth_data.birth_time:
        return None

    dt = birth_data.birth_date
    bt = birth_data.birth_time

    observer = ephem.Observer()
    observer.lat = str(birth_data.latitude or 0)
    observer.lon = str(birth_data.longitude or 0)
    observer.date = f"{dt.year}/{dt.month}/{dt.day} {bt.hour}:{bt.minute}:00"

    moon = ephem.Moon(observer)
    moon_ecl = ephem.Ecliptic(moon, epoch=observer.date)
    longitude_deg = math.degrees(float(moon_ecl.lon))
    return _ecliptic_longitude_to_sign(longitude_deg)


def get_rising_sign(birth_data: BirthData) -> Optional[str]:
    """
    Compute ascendant (rising sign).
    Requires birth_time and coordinates.
    """
    if not EPHEM_AVAILABLE or not birth_data.birth_time or not birth_data.latitude:
        return None

    dt = birth_data.birth_date
    bt = birth_data.birth_time

    observer = ephem.Observer()
    observer.lat = str(birth_data.latitude)
    observer.lon = str(birth_data.longitude)
    observer.date = f"{dt.year}/{dt.month}/{dt.day} {bt.hour}:{bt.minute}:00"

    # Calculate Local Sidereal Time (LST) to determine ascendant
    lst = float(observer.sidereal_time())  # radians
    lst_deg = math.degrees(lst)
    # Simplified ascendant: LST ≈ ascendant longitude on the ecliptic
    return _ecliptic_longitude_to_sign(lst_deg)


def compute_astro_profile(birth_data: BirthData) -> dict:
    """
    Returns dict with sun_sign, moon_sign, rising_sign slugs.
    moon_sign and rising_sign may be None if birth_time not provided.
    """
    return {
        "sun_sign":    get_sun_sign(birth_data.birth_date),
        "moon_sign":   get_moon_sign(birth_data),
        "rising_sign": get_rising_sign(birth_data),
    }
