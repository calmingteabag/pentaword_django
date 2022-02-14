# Info pra eu não me perder 

O desafio agora ta sendo setar um timer, para pegar uma palavra nova a cada X tempo (24h no caso)
Essa palavra vai pra uma view, que vai pra html ser processada pelo jogo do frontend.



## Melhor solução:

- view.py pega palavra do DB. ponto
- celery roda um script a cada 24h pra update essa palavra
- profit

### agora só(???!!) resta: 

- aprender e instalar Celery com Redis ou outro 'meio de campo'
- reaprender a setup django pra deploy
- deploy no heroku

### Nota para não esquecer

- python manage.py check --deploy => olha as coisas que tão erradas pro deploy do django
- Coisas que me lembro do heroku é que vc faz login na pasta do projeto, faz as coisas nele (pip install, etc), configura e 'git push heroku master'. Então achoque a parte de deploy está 90% andado, o que não está e usar Celery com Redis
