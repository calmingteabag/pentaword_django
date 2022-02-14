# Informação para o deploy no Heroku

Fazer deploy de um app é dificil, **BEM** dificil, por causa dos detalhes.
Vou colocar o que fiz para funcionar.

## Rode manage.py check --deploy
Se você rodar:
`manage.py check --deploy`

Ele vai olhar o django e dizer tudo que vc tem que configurar. 
Os mais importantes pra ficar esperto são:

- Variáveis de ambiente: Não coloque as strings de autenticação à vista. Use
`SECRET_KEY = os.getenv('SEU-NOME-DE-CHAVE')`. E no heroku tem um campo pra vc
definir as variaveis que voce precisa. É bom fazer isso com todas essas strings.

- Allowed hosts: Quando vc roda um app remoto, vc tem que definir qual vai ser o nome
do servidor ou servidores hospedados.
`ALLOWED_HOSTS = [
    '.herokuapp.com',
    '.google.com',
    '.gatinhofeliz.com',
]`

## Pip freeze
O app precisa saber quais imports vc usou. Pro heroku, ele olha um arquivo chamado
`requirements.txt` que lista todos eles. Vc cria esse arquivo usando:
`pip freeze > requirements.txt`

IMPORTANTE dizer, que se vc usa esse comando fora do venv ou outra coisa assim, ele vai colocar
até a torcida do flamengo dentro do requirements.

Ideal toda vez que se faz um projeto é iniciar um venv e ir dando `pip install` no que vc vai usar. Assim
o pip freeze vai só pegar o que precisa.

## Procfile
O heroku em si não é um site completo, ele só cede espaço e processamento, não sabe servir arquivos nem nada. Então vc precisa usar algo
que sirva como um Sistema operacional. Pra isso, primeiro vc `pip install gunicorn` e faz o `pip freeze` e dpois no django se cria um arquivo `procfile` com essa configuração:

`web: gunicorn nome-do-meu-projeto-django.wsgi`
Ele vai funcionar como um 'linux' pra usa aplicação

## Templates e arquivos staticos(aka imagens, javascripts, etc)
FUCKING HELL. Sério, HELL.

- O heroku não tem um sistema pra servir os arquivos, então vc tem que usar um puxadinho chamado `whitenoise` (ou pagar um lugar pra hostear que permita remoto e não só storage)

Primeiro `pip install whitenoise` e depois passar pro requirements
Depois em `settings.py`:

`MIDDLEWARE_CLASSES = (
    'whitenoise.middleware.WhiteNoiseMiddleware',
)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`

- Git não lê por default esses arquivos, vc tem que especificar em um arquivo chamado `MANIFEST.in` o que
é pra ele pegar (templates, scripts, gato, cachorro, etc). Então nele vai isso:

`include requirements.txt
recursive-include pentaword/templates *.*
recursive-include pentaword/static *.*`

## STATIC em settings.py
Outro inferno na terra. Se vc esquecer de mandar o git ler os statics, o repositorio não vai ter a pasta dos
statics. Ai quando mandar push, ele vai acusar erro dizendo que algo não existe.

No `settings.py`:

`STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATIC_URL = '/static/'`

Alguns lugares falam para fazer assim:

`STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)`

Que diz pra olhar primeiro no 'staticfiles' e depois no 'static' buscando os arquivos.








