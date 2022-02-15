from english_words import english_words_lower_set
import random

wordlist = []
for i in english_words_lower_set:
    if len(i) == 5:
        wordlist.append(i)


def rand_word():
    rand_index = random.randint(0, len(wordlist))
    gen_word = wordlist[rand_index]

    return gen_word


print(rand_word())
