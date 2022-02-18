# Versão web do pentaword.

Pentaword colocado em cima do backend django. 

Se alguem tem a intenção de fazer isso, se prepare, pois mexer com static files no django é bastante caótico por conta da forma como ele lê os arquivos, além de ter bastante detalhes e configurações para mudar. Esse foi meu segundo deploy e foi infinitamente mais dificil por conta disso. Coisas que posso dizer, se é que eu estou em posição de dizer algo:

- Debug = True no deploy, pois você precisa ver o que esta saindo errado. Depois mude.
- Cuidado com `\` e `/`. Web & Bash = `/`, Windows = `\`
- Olhe se seu app está em `INSTALLED_APPS`. 
- Trabalhar com tempo (horas, dias, etc) é bem, BEM dificil. O jogo ficou quebrado por causa disso e tive que apelar para o modo gambiarra (Se você clica no titulo, o jogo reset e dá pra jogar de novo).

Ainda preciso entender melhor como funciona `os.path`. Não cheguei a olhar essa parte quando mexi com django,  mas depois dessa sofrencia é uma boa hora pra dar uma olhada. E deveria decidir de vez se documento em portugues ou ingles, misturar os dois está ficando complicado.

O codigo original `pentaword.js` estava um caos e provavelmente daria ulcera em quem fizesse review dele. A segunda versão `pentaword_fix.js`, agora melhorada, dá úlcera, mas com classes e metodos.



