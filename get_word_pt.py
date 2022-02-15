import random
with open(file='D:\\Programming\\Python\\palavras\\palavras.txt', encoding='utf8') as palavras:
    wordlist = palavras.readlines()


def converter(word):
    newword = ''

    converter_dict = {
        '224': 'a',
        '225': 'a',
        '226': 'a',
        '227': 'a',
        '233': 'e',
        '234': 'e',
        '237': 'i',
        '243': 'o',
        '244': 'o',
        '245': 'o',
        '250': 'u',
        '231': 'c',
        '241': 'n',
    }

    for char in word:
        if str(ord(char)) in converter_dict:
            replacer = converter_dict.get(str(ord(char)))
            newword += replacer
        else:
            newword += char

    return newword


print(type(wordlist))

for i in wordlist:
    if len(i) == 6 and i.isalpha():
        word = converter(i)
        print(word)

print(converter('água'))


def getword():
    new_wordlist = []
    for i in wordlist:
        if len(i) == 6 and i.isalpha:
            lowerword = i.lower()
            word = converter(lowerword)

            # ex panda
            # ind 1 = a
            # if i in panda[]

            new_wordlist.append(word)

    randindex = random.randint(0, len(new_wordlist))
    random_word = new_wordlist[randindex]

    return random_word


print(getword())

# start:stop:Step
x = 'panda'
# print(len(x))
for i in x:
    print(x[i])
