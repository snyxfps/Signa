# SIGNA — Astrology SaaS Platform

> A modern, scalable astrology platform built with Django REST Framework + Next.js 14 + PostgreSQL + Redis.

## Project Structure

```
Signa/
├── signa-backend/          # Django API
├── signa-frontend/         # Next.js frontend
└── docker-compose.yml      # Full stack orchestration
```

## Quick Start (Docker)

```bash
# 1. Copy env files
cp signa-backend/.env.example signa-backend/.env

# 2. Start all services
docker compose up -d

# 3. Run migrations
docker compose exec backend python manage.py migrate

# 4. Create superuser
docker compose exec backend python manage.py createsuperuser

# 5. Seed initial data (signs)
docker compose exec backend python manage.py shell -c "
from apps.signs.models import Sign
signs = [
    {'slug':'aries',       'name':'Aries',       'symbol':'♈','element':'fire', 'modality':'cardinal','ruling_planet':'Mars',      'date_start':'Mar 21','date_end':'Apr 19'},
    {'slug':'taurus',      'name':'Taurus',       'symbol':'♉','element':'earth','modality':'fixed',   'ruling_planet':'Venus',     'date_start':'Apr 20','date_end':'May 20'},
    {'slug':'gemini',      'name':'Gemini',       'symbol':'♊','element':'air',  'modality':'mutable', 'ruling_planet':'Mercury',   'date_start':'May 21','date_end':'Jun 20'},
    {'slug':'cancer',      'name':'Cancer',       'symbol':'♋','element':'water','modality':'cardinal','ruling_planet':'Moon',      'date_start':'Jun 21','date_end':'Jul 22'},
    {'slug':'leo',         'name':'Leo',          'symbol':'♌','element':'fire', 'modality':'fixed',   'ruling_planet':'Sun',       'date_start':'Jul 23','date_end':'Aug 22'},
    {'slug':'virgo',       'name':'Virgo',        'symbol':'♍','element':'earth','modality':'mutable', 'ruling_planet':'Mercury',   'date_start':'Aug 23','date_end':'Sep 22'},
    {'slug':'libra',       'name':'Libra',        'symbol':'♎','element':'air',  'modality':'cardinal','ruling_planet':'Venus',     'date_start':'Sep 23','date_end':'Oct 22'},
    {'slug':'scorpio',     'name':'Scorpio',      'symbol':'♏','element':'water','modality':'fixed',   'ruling_planet':'Pluto',     'date_start':'Oct 23','date_end':'Nov 21'},
    {'slug':'sagittarius', 'name':'Sagittarius',  'symbol':'♐','element':'fire', 'modality':'mutable', 'ruling_planet':'Jupiter',   'date_start':'Nov 22','date_end':'Dec 21'},
    {'slug':'capricorn',   'name':'Capricorn',    'symbol':'♑','element':'earth','modality':'cardinal','ruling_planet':'Saturn',    'date_start':'Dec 22','date_end':'Jan 19'},
    {'slug':'aquarius',    'name':'Aquarius',     'symbol':'♒','element':'air',  'modality':'fixed',   'ruling_planet':'Uranus',    'date_start':'Jan 20','date_end':'Feb 18'},
    {'slug':'pisces',      'name':'Pisces',       'symbol':'♓','element':'water','modality':'mutable', 'ruling_planet':'Neptune',   'date_start':'Feb 19','date_end':'Mar 20'},
]
for s in signs:
    Sign.objects.get_or_create(slug=s['slug'], defaults=s)
print('Signs seeded!')
"
```

## Local Development (without Docker)

### Backend

```bash
cd signa-backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env           # edit DATABASE_URL
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd signa-frontend
npm install
npm run dev
```

## API Docs

| Service  | URL                          |
|----------|------------------------------|
| Backend  | http://localhost:8000        |
| Frontend | http://localhost:3000        |
| Admin    | http://localhost:8000/admin/ |

## Architecture

See [full architecture document](../SIGNA_Architecture.md) for:
- System architecture diagram
- Database schema (SQL)
- API endpoint definitions
- Feature flow explanations
- Monetization hooks
- Scalability considerations

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Backend  | Python 3.12, Django 5, DRF |
| Frontend | Next.js 14, React, TypeScript, Tailwind |
| Database | PostgreSQL 16           |
| Cache    | Redis 7                 |
| Queue    | Celery + Redis Broker   |
| Auth     | JWT (SimpleJWT)         |
| Payments | Stripe                  |
