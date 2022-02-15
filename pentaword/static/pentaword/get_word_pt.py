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


def getword():
    for i in wordlist:
        if (len(i) == 6 and i[0:5:1].isalpha()):
            lowerword = i.lower()
            word = converter(lowerword)

            if len(set(word)) == len(word):
                with open(file='D:\\Programming\\Python\\palavras\\wordlist_pt.txt', mode='a') as txt:
                    txt.write(word)


getword()
