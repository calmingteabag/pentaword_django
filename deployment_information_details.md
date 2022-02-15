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

`MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    ...
    ...`

E depois:

`STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`


- Git não lê por default esses arquivos, vc tem que especificar em um arquivo chamado `MANIFEST.in` o que
é pra ele pegar (templates, scripts, gato, cachorro, etc). Então nele vai isso:

`include requirements.txt
recursive-include pentaword/templates *.*
recursive-include pentaword/static *.*`

## STATIC em settings.py
Outro inferno na terra. Se vc esquecer de mandar o git ler os statics, o repositorio não vai ter a pasta dos
statics. Ai quando mandar push, ele vai acusar erro dizendo que algo não existe.

No `settings.py`:

`STATIC_ROOT = os.path.join(BASE_DIR, 'static/')` é a base onde o django vai procurar os arquivos.
Se o caminho completo até o css for
`projeto/meuapp/static/meuapp/arquivocss.css` , colocando assim ele vai procurar a pasta static e ir atras da continuação, por isso o
`/`. Se vc parar a busca em `'static'` vai dar erro pq ele vai parar a busca sem olhar as subpastas.

`STATICFILES_DIRS` é o lugar extra onde ele vai procurar pelos statics só lembre
`'folder'` ele para a busca ali. `folder/` ele vai atras do resto


## Deploy no heroku (NESSA ordem)
- git clone repositorio
- cd repositorio
- heroku create nomedoapp
- git push heroku master

o push SO VAI se vc criar o app dentro da pasta que vc deu clone e der push de lá

## Migrar as coisas
- heroku run python manage.py migrate

## ADD env vars (ex, django screte key) no app


Quando acordar, testar 2 coisas
- Tirar db.sqlite3 do gitignore e dar deploy pra ver se o heroku lê
- Se não, tentar colocar postree no projeto

# Templates não carregando

- se vc tem
`projeto\app\templates\index.html` ele não vai conseguir ler
a estrutura tem que ser `projeto\app\templates\app\index.html` - sim, com app duas vezes nesse caminho esquisito

Em settings.py:
`TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates/'), <=== Add essa linha
        ],
    },
]`

- CUIDADO COM "\" E "/"
diretorios no windows:
`c:\folder\cat.jpg`
diretorios na web:
`path/folder/cat.jpg`

## GIT

- Se vc cagar e quiser trocar o remote (aka, deletou o git do heroku e teve que criar um novo)
`PS D:\pentaword_django> git remote rm heroku      
PS D:\pentaword_django> git remote add heroku https://git.heroku.com/novo_git_do_heroku.git
PS D:\pentaword_django> git push heroku master`





