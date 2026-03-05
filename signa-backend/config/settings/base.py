from pathlib import Path
from datetime import timedelta
import environ

env = environ.Env()
BASE_DIR = Path(__file__).resolve().parent.parent.parent

environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env('SECRET_KEY', default='unsafe-default-key')
DEBUG = env.bool('DEBUG', default=False)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost'])

# ─── Applications ─────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    # SIGNA apps
    'apps.users',
    'apps.profiles',
    'apps.signs',
    'apps.horoscope',
    'apps.compatibility',
    'apps.subscriptions',
]

AUTH_USER_MODEL = 'users.CustomUser'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ─── Database ─────────────────────────────────────────────────────────────────
DATABASES = {
    'default': env.db('DATABASE_URL', default='sqlite:///db.sqlite3')
}

# ─── Cache ────────────────────────────────────────────────────────────
if env('REDIS_URL', default=''):
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": env('REDIS_URL'),
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
            }
        }
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        }
    }

# ─── JWT ──────────────────────────────────────────────────────────────────────
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# ─── DRF ──────────────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '200/day',
        'user': '1000/day',
    },
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'DEFAULT_PAGINATION_CLASS': 'core.pagination.StandardResultsPagination',
    'PAGE_SIZE': 20,
}

# ─── CORS ─────────────────────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = list({
    'http://localhost:3000',
    env('FRONTEND_URL', default='http://localhost:3000'),
})

# ─── Celery ───────────────────────────────────────────────────────────────────
CELERY_BROKER_URL = env('REDIS_URL', default='memory://')
CELERY_RESULT_BACKEND = env('REDIS_URL', default='cache+memory://')
CELERY_TIMEZONE = 'UTC'
from celery.schedules import crontab
CELERY_BEAT_SCHEDULE = {
    'generate-daily-horoscopes': {
        'task': 'apps.horoscope.tasks.generate_daily_horoscopes',
        'schedule': crontab(hour=0, minute=5),
    },
}

# ─── Stripe ───────────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY = env('STRIPE_SECRET_KEY', default='')
STRIPE_WEBHOOK_SECRET = env('STRIPE_WEBHOOK_SECRET', default='')
STRIPE_PREMIUM_PRICE_ID = env('STRIPE_PREMIUM_PRICE_ID', default='')
STRIPE_ANNUAL_PRICE_ID = env('STRIPE_ANNUAL_PRICE_ID', default='')

# ─── Internationalisation ─────────────────────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

FRONTEND_URL = env('FRONTEND_URL', default='http://localhost:3000')
