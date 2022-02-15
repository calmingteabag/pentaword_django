# Sobre o jogo

O metodo de usar db pra pegar as palavras não funciona pq 1: heroku não aceita db.sqlite e o postgress que ele usa é pago. 2. é um cu rodar um script só pra mudar a palavra no database. A opção de usar celery é analmente chata e provavelmente só as opções internas deles (do heroku) funcionam. E obviamente pagas. Existe a opção de rodar um script com timer manualmente, mas ele não aceita por motivos de crashar as coisas eu suponho.

Então voltamos a estaca 0
SO QUE

Descobri alguns modulos que contem lista de palavras 
`nltk` e `english-words`

Esquema provavel então é

Criar uma variavel global pra guardar a palavra e o dia

Na view, se o dia atual != dia da variavel, manter tudo igual
se o dia atual == dia da variavel
dia da variavel +1 (seguindo o lance de olhar mes de 30/31 dias, fevereiro, ano bissesto, etc)
mudar a palavra do dia pegando random desses dicionarios

ops e antes, colocar que se o dia for nulo (programa cabou de dar deploy)
set a variavel dia pro dia de hoje + 1
e pegue uma palavra



Preciso olhar melhor o frontend, que ele não ta resetando as cores quando muda o dia.
resolve(localStorage.setItem('last_game_state', '')) resolve pra limpar a estatistica
