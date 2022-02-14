# Info pra eu não me perder 

O desafio agora ta sendo setar um timer, para pegar uma palavra nova a cada X tempo (24h no caso)
Essa palavra vai pra uma view, que vai pra html ser processada pelo jogo do frontend.


## Erro, que o python não consegue importar celery.schedules

Consegui pelo menos descobrir por que, graças a stackoverflow. 
Aparentemente, o nome do script que inicia o Celery (celery.py) conflita com o nome
do modulo (que vc instala usando pip install). Ai o python fica tentando buscar o import
desse arquivo invez de olhar o modulo.





### Nota para não esquecer

- python manage.py check --deploy => olha as coisas que tão erradas pro deploy do django
- Coisas que me lembro do heroku é que vc faz login na pasta do projeto, faz as coisas nele (pip install, etc), configura e 'git push heroku master'. Então achoque a parte de deploy está 90% andado, o que não está e usar Celery com Redis

- CELERY NOT IMPORT WORK. WHY.
