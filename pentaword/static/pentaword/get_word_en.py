from english_words import english_words_lower_set


def getworden():
    for i in english_words_lower_set:
        if len(i) == 5 and (len(set(i)) == len(i)):
            with open(file='D:\\Programming\\Python\\palavras\\wordlist_en.txt', mode='a') as txt:
                txt.write(i + '\n')


getworden()
