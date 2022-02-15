# Versão web do pentaword.

Pentaword colocado em cima do backend django. 

Se alguem tem a intenção de fazer isso, se prepare, pois mexer com static files no django é bastante caótico por conta da forma como ele lê os arquivos, além de ter bastante detalhes e configurações para mudar. Esse foi meu segundo deploy e foi infinitamente mais dificil por conta disso. Coisas que posso dizer, se é que eu to em posição de dizer algo:

- Debug = True no deploy, pois você precisa ver o que ta saindo errado. Depois mude.
- Cuidado com `\` e `/`. Web & Bash = `/`, Windows = `\`
- Olhe se seu app está em INSTALLED APPS. 

Ainda preciso entender melhor como funciona `os.path`. Não cheguei a olhar essa parte quando mexi com django, depois dessa sofrencia é uma boa hora pra dar uma olhada.



