# Quick Setup for deployment with django

Don't mess around and DO follow these. Deployment != Production and things can go wrong quickly.

# Basic setup

- pip install if not already: `whitenoise` and `gunicorn`
- run `python manage.py check -deploy`
- run `pip freeze > requirements.txt`
- create `MANIFEST.in` in project root. It is case-sensitive. Add this in the file:
`include requirements.txt
recursive-include pentaword/templates *.*
recursive-include pentaword/static *.*`
- create `Procfile` in project root. It is case-sensitive, NO extensions(.txt/.md/etc). Add this to it:
`web: gunicorn wordle_clone.wsgi`

# Templates

- make sure your templates are on project ROOT and not on app folder. Structure should be:
`project\templates\app`. If several apps on same project, then:
`project\templates\app1`
`project\templates\app2`
`etc`

- on views.py check slashes `\`. Windows has `\` but linux uses `/`. Match deployment server.

# Static

- Same structure as templates. static folder on ROOT separated by appname.

# settings.py

- make sure your app is in INSTALLED_APPS. 
- `SECRET_KEY = os.getenv('DJANGO-KEY')`
- `ALLOWED_HOSTS = [
    '.yourhosname.com',
]`
- The whitenoise stuff needs to be AFTER `django.middleware.security.SecurityMiddleware`.
`MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ...
    ...`

- Add a line on `DIRS` at TEMPLATES
`
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'), << ADD THIS
        ],
        ...
        ...
        ...`

- DATABASE should look like this:
`DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'), << ADD THIS
    }
}`

- STATIC must look E-X-A-C-T-L-Y like this:

`STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)`

