// ##########################################################
// ################## Game Initialization ###################
// ##########################################################


// item_pos tracks the char position on a row
// active_row tracks which row is being filled
let item_pos = 0;
let active_row = 0;
let arr = [];
let tried_words = [];
let word = '';
let style_arr = [];



function getDailyWord() {
    let dailyguess = document.getElementById('daily_word').textContent
    word += dailyguess
}

async function rowGlowAnimate() {
    // Little animation on opening 
    let allChars = document.getElementsByClassName('char')

    for (let char of allChars) {
        await new Promise((resolve, reject) => setTimeout(resolve, 25))
        char.style.animation = 'char_animation 0.7s ease-in-out 0s 2 alternate'
    }
};

function currentTime() {
    // Get current date
    let fullDate = new Date();
    let currTime = fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds();

    return currTime
}

function showTimerDOM() {
    // Show remaining time to next game

    let nowDate = new Date()
    let hour = 23 - parseInt(nowDate.getHours(), 10)
    let minute = 59 - parseInt(nowDate.getMinutes(), 10)
    let second = 59 - parseInt(nowDate.getSeconds(), 10)

    let hour_a = leadZerotime(hour)
    let minute_a = leadZerotime(minute)
    let second_a = leadZerotime(second)


    let fullcountdown = hour_a + ":" + minute_a + ":" + second_a


    document.getElementById('countdown').innerHTML = fullcountdown
}

// async function startCheck() {
//     // Check if game is playable

//     let currDate = new Date()
//     let currDay = currDate.getDate()

//     await new Promise((resolve, reject) => {


//         if ((currDate.getDate() == localStorage.getItem('nextday')) && isLastMonthDay(currDay) == false) {
//             resolve(localStorage.setItem('game_state', 'active'))
//             resolve(localStorage.setItem('last_game_state', ''))
//             resolve(localStorage.setItem('nextday', currDay++)) // needs rewrite to account for last day of the month and leap years
//         } else if ((currDate.getDate() == localStorage.getItem('nextday')) && isLastMonthDay(currDay) == true) {
//             resolve(localStorage.setItem('game_state', 'active'))
//             resolve(localStorage.setItem('last_game_state', ''))
//             resolve(localStorage.setItem('nextday', currDay = 0))
//         }
//     });
// };

function createUserData() {
    // Create user Data
    let userID = randInt(0, 600000)
    let insertValues = new Map([
        ['user', userID],
        ['playedGames', 0],
        ['wonGames', 0],
        ['lostGames', 0],
        ['currStreak', 0],
        ['maxStreak', 0],
        ['row_0', 0],
        ['row_1', 0],
        ['row_2', 0],
        ['row_3', 0],
        ['row_4', 0],
        ['row_5', 0],
        ['game_state', 'active'],
        ['last_game_state', ''],
        ['nextday', '']
    ]);

    for (let values of insertValues) {
        localStorage.setItem(values[0], values[1])
    }
}

async function checkExistUserData() {
    // Check if user exists
    // Create new if not, retrieve last game stat to show if yes
    let currDate = new Date()
    let currDay = currDate.getDate()

    if (!localStorage.getItem('user') && isLastMonthDay(currDay) == true) {
        createUserData()
        localStorage.setItem('nexday', currDay = 0)

    } else if (!localStorage.getItem('user') && isLastMonthDay(currDay) == false) {
        createUserData()
        localStorage.setItem('nexday', currDay++)
    } else {

        // get last game results from saved localstorage
        let get_states = JSON.parse(localStorage.getItem('last_game_state'))
        let charElements = document.getElementsByClassName('char')

        await new Promise((resolve, reject) => setTimeout(resolve, 2000))

        for (let entry = 0; entry < Object.keys(get_states).length; entry++) {
            await new Promise((resolve, reject) => setTimeout(resolve, 25))
            charElements[entry].removeAttribute('style')
            await new Promise((resolve, reject) => setTimeout(resolve, 25))
            charElements[entry].setAttribute('style', get_states[entry][1])
            charElements[entry].innerHTML = get_states[entry][0]
        }
    }
}

function updateUserData(storageItem, value) {
    // Update user data
    localStorage.setItem(storageItem, value)
}

function saveEndGameVisuals() {
    // Saves current 'state' of the game after game has ended, which means
    // the visual part (characters entered and color)
    let charElements = document.getElementsByClassName('char')
    let letterVisualsMap = new Map()

    for (let char = 0; char < charElements.length; char++) {
        if (charElements[char].innerHTML) {
            letterVisualsMap.set(char, [charElements[char].innerHTML, charElements[char].getAttribute('style')])
        }
    }

    let letterVisualsObj = Object.fromEntries(letterVisualsMap)
    let jsonier = JSON.stringify(letterVisualsObj)
    localStorage.setItem('last_game_state', jsonier)
}

// ##########################################################
// #################### User Iteration ######################
// ##########################################################

function resetGambiarra() {
    localStorage.setItem('last_game_state', '')
    localStorage.setItem('game_state', 'active')
    window.location.reload()
};

function getKeyPress(currentKey) {
    //Populates display as the user presses a key

    const current_key = document.getElementById(currentKey)
    const current_char = current_key.textContent

    if (item_pos < 5 && localStorage.getItem('game_state') == 'active') {

        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = current_char
        item_pos++
        arr.push(current_char)
    }
};

function addCharListener(classname, atrib) {
    let btn_elem = document.getElementsByClassName(classname)

    for (let elem of btn_elem) {
        let current_attb = elem.getAttribute(atrib)
        elem.addEventListener("click", function () { getKeyPress(current_attb) }, false)
    }
};

function delCharListener(delElem) {
    let del_btn = document.getElementById(delElem)
    del_btn.addEventListener("click", delChar, false)
};

function checkWordListener(checkElem) {
    let sub_btn = document.getElementById(checkElem)
    sub_btn.addEventListener("click", subWord, false)
};

function exitStatListener(exitStat) {
    let exit_btn = document.getElementById(exitStat)
    exit_btn.addEventListener("click", function () { closeStat('score_wrapper') }, false)
}

function showStatsListener(statElement) {
    let stat_listener = document.getElementById(statElement)
    stat_listener.addEventListener("click", function () { statToggle('score_wrapper') }, false)
}

function helpCloseStatListener(helpElement) {
    let exit_btn = document.getElementById(helpElement)
    exit_btn.addEventListener("click", function () { helpClose('help_wrapper') }, false)
}

function helpShowStatsListener(helpStat) {
    let stat_listener = document.getElementById(helpStat)
    stat_listener.addEventListener("click", function () { helpToggle('help_wrapper') }, false)
}

function addGambiarraListener(gambiarra) {
    let gambi = document.getElementById(gambiarra)
    gambi.addEventListener("click", function () { resetGambiarra() }, false)
}

function helpToggle(helpElement) {
    // Show/Hides help window

    let helpToggle = document.getElementById(helpElement)
    if (helpToggle.style.visibility == 'hidden') {
        helpShow('help_wrapper')
    } else {
        helpClose('help_wrapper')
    }
}

function helpShow(statElement) {
    // When user clicks on (i) populates it with current statistics
    let help_stat = document.getElementById(statElement)
    help_stat.style.visibility = 'visible'
}

function helpClose(helpElement) {
    // Close help window
    let help_window = document.getElementById(helpElement)
    help_window.style.visibility = 'hidden'
}

function statToggle(toggleElement) {
    // Show/Hides stats when user clicks on (i)

    let viewToggle = document.getElementById(toggleElement)
    if (viewToggle.style.visibility == 'hidden') {
        showStat('score_wrapper')
    } else {
        closeStat('score_wrapper')
    }
}

function showStat(statElement) {
    // When user clicks on (i) populates it with current statistics
    let show_stat = document.getElementById(statElement)
    let hide_word = document.getElementById('daily_word')
    populateInfo()

    show_stat.style.visibility = 'visible'

    if (show_stat.style.visibility == 'visible' && localStorage.getItem('playedGames') == '0') {
        hide_word.style.opacity = '0'
    } else if (show_stat.style.visibility == 'visible' && localStorage.getItem('game_state') == 'active') {
        hide_word.style.opacity = '0'
    }
}

// document.getElementById('daily_word').style.opacity = '1'
function closeStat(statElement) {
    // Close statistics window. Styling to ensure that stat window will return
    // to original state after a win or lose.
    let stat_window = document.getElementById(statElement)
    stat_window.style.visibility = 'hidden'
    document.getElementById('score_wrapper').style.backgroundColor = 'rgb(39, 39, 39)'
    document.getElementById('score_wrapper').style.borderColor = 'rgb(151, 56, 159)'
    document.getElementById('score_title').style.color = 'rgb(255, 42, 184)'
    document.getElementById('score_title').innerHTML = 'Statistics'
}

function delChar() {
    // While user is trying a word, he should be able to delete chracters but
    // only on current row.
    if (item_pos > 0 && localStorage.getItem('game_state') == 'active') {
        let curr_row = document.getElementsByClassName('row_try')[active_row]
        let curr_char = curr_row.getElementsByClassName('char')[item_pos - 1]
        curr_char.innerHTML = ''
        arr.pop()
        item_pos--
    }
};

function keyPressAlpha(usrkey) {
    /*
    Like the original, characters can be entered by typing on the physical
    keyboards, so I thought it would be nice to have this functionality
    here too.
    */

    if (item_pos < 5 && isAlpha(usrkey.key) == true && usrkey.key != '' && localStorage.getItem('game_state') == 'active') {
        let rowlist = document.getElementsByClassName('row_try')[active_row];
        let curr_char = rowlist.children;

        curr_char[item_pos].innerHTML = usrkey.key.toUpperCase()
        item_pos++
        arr.push(usrkey.key.toUpperCase())

    } else if (item_pos <= 5 && usrkey.key == 'Backspace' && localStorage.getItem('game_state') == 'active') {
        delChar()

    } else if (item_pos == 5 && usrkey.key == 'Enter' && localStorage.getItem('game_state') == 'active') {
        subWord()
    }
};

// ##########################################################
// ##################### Game Engine ########################
// ##########################################################


function populateInfo() {
    // Grabs data to be used on showStat()
    let htmlElements = document.getElementsByClassName('score_info_value')
    let winRatio = (parseInt(localStorage.getItem('wonGames')) / parseInt(localStorage.getItem('playedGames')) * 100).toFixed(1)
    let updateElements = ['playedGames', 'winRatiodummy', 'currStreak', 'maxStreak']

    for (let i = 0; i < htmlElements.length; i++) {
        /*
        Ran into kind of a issue here. The idea is iterate either over DOM elements and update it with data
        from localStorage or the reverse, iterate over localStorage and fill DOM elements. 'For of' loop over
        htmlElements (4 elements) returned a blank result on second element ('winratio') because it is trying
        to retrieve contents of variable winRatio on localStorage which doesn't exist. 
 
        Tried the 'normal' for loop with incrementing indexes, ran into the same issue but found a workaround
        that is manually set the value I needed on specific part of the loop (which was on second iteration).
        */
        if (i == 1 && localStorage.getItem('wonGames') != '0') {

            htmlElements[i].innerHTML = winRatio + '%'
            i++
        } else if (i == 1 && localStorage.getItem('wonGames') == 0) {
            htmlElements[i].innerHTML = '0.0' + '%'
            i++
        }
        htmlElements[i].innerHTML = localStorage.getItem(updateElements[i])
    }

    // histogram
    let fillElements = document.getElementsByClassName('score_info_graph_fill')

    if (!localStorage.getItem('user')) {
        for (let col = 0; col < fillElements.length; col++) {
            fillElements[col].style.width = '0' + '%'
        }
    } else if (localStorage.getItem('wonGames') == '0') {
        for (let col = 0; col < fillElements.length; col++) {
            fillElements[col].style.width = '0' + '%'
        }
    } else {
        for (let col = 0; col < fillElements.length; col++) {
            // it fills the div with another div, and its width will be (localstorage's won rows/ totalwons) *100
            let winRatioColumn = parseInt(localStorage.getItem(`row_${col}`)) / parseInt(localStorage.getItem('wonGames')) * 100
            fillElements[col].style.width = winRatioColumn.toFixed(2) + '%'
        }
    }
}

// Main game 'engine'
function subWord() {
    /*
    This function controls the main flow of the game and uses checkWord()
    to process the visual part
 
    Why there is set of conditionals just for the last row:
 
    Game needs to know which row is the active one so it can populate the
    'tiles' with characters and it does so by looking at the 'active_row' variable. 
    Betweem rows 0 and 5, it works just fine. User tries to guess, it doesn't
    match the daily word and game skips to the next row by doing 'active_row++'.
 
    If the game is on the last row and we increment active_row it'll go
    out of range and break the function we use to populate tiles because it'll try
    to process a row that doesn't exists, returning an error.
 
    So the solution that I kinda of found out was to set those conditionals just for the
    last row that doesn't increment 'active_row' so the game can safely end without
    breaking anything.
    */
    let dailyWordArr = word.toUpperCase().split('')

    // Wrong Guess, row < last. Continue Game.
    if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && localStorage.getItem('game_state') == 'active') {
        checkWord()
        tried_words.push(arr)
        active_row++
        item_pos = 0
        arr = []

        // Right guess, row < last.
    } else if (active_row < 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && localStorage.getItem('game_state') == 'active') {
        checkWord()
        saveEndGameVisuals()
        localStorage.setItem('game_state', 'inactive')

        let updateData = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']
        for (let key of updateData) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }

        document.getElementById('daily_word').style.opacity = '1'
        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'


        // Right guess, row == last.
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == true && localStorage.getItem('game_state') == 'active') {
        checkWord()
        saveEndGameVisuals()
        localStorage.setItem('game_state', 'inactive')

        let updateData = ['playedGames', 'wonGames', `row_${active_row}`, 'currStreak']

        for (let key of updateData) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        if (parseInt(localStorage.getItem('currStreak')) > parseInt(localStorage.getItem('maxStreak'))) {
            localStorage.setItem('maxStreak', localStorage.getItem('currStreak'))
        }

        document.getElementById('daily_word').style.opacity = '1'
        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(4, 29, 8)'
        document.getElementById('score_wrapper').style.borderColor = 'rgb(2, 255, 23)'
        document.getElementById('score_title').style.color = 'rgb(2, 255, 23)'
        document.getElementById('score_title').innerHTML = 'You got it!'


        // Wrong guess, row == last.
    } else if (active_row == 5 && item_pos == 5 && compareArr(arr, dailyWordArr) == false && localStorage.getItem('game_state') == 'active') {
        checkWord()
        saveEndGameVisuals()
        localStorage.setItem('game_state', 'inactive')

        let updateStorage = ['playedGames', 'lostGames']

        for (let key of updateStorage) {
            let getValue = parseInt(localStorage.getItem(key), 10)
            localStorage.setItem(key, getValue + 1)
        }

        localStorage.setItem('currStreak', 0)

        document.getElementById('daily_word').style.opacity = '1'
        populateInfo()
        document.getElementById('score_wrapper').style.visibility = 'visible'
        document.getElementById('score_wrapper').style.backgroundColor = 'rgb(24, 2, 2)'
        document.getElementById('score_wrapper').style.borderColor = 'red'
        document.getElementById('score_title').style.color = 'red'
        document.getElementById('score_title').innerHTML = 'Try again tomorrow'
    }
};

function checkWord() {
    // To declutter a bit of the subWord() function, did a separate one
    // just to handle visuals.

    let check_pos = 0
    let daily_word_arr = word.toUpperCase().split('')
    let check_row = document.getElementsByClassName('row_try')[active_row]

    for (let char of arr) {

        if (daily_word_arr.includes(char) && char == daily_word_arr[check_pos]) {
            let letterDomElement = check_row.children[check_pos];
            // need to color specific letter on screen keyboard.
            // how tf i get it

            letterDomElement.style.color = 'green';
            letterDomElement.style.borderColor = '#00FF00';
            // would be nice if this effect worked only on current row
            // will think about it later
            letterDomElement.style.animation = 'glow_lighten 1.5s ease-in-out infinite alternate'
            check_pos++

        } else if (daily_word_arr.includes(char) && char != daily_word_arr[check_pos]) {
            let letterDomElement = check_row.children[check_pos];

            letterDomElement.style.color = 'yellow'
            letterDomElement.style.borderColor = '#FFFF00';
            check_pos++

        } else {
            let letterDomElement = check_row.children[check_pos];

            letterDomElement.style.color = 'red'
            letterDomElement.style.borderColor = '#FF0000';
            check_pos++

        }
    }
};

// ##########################################################
// ################### Auxiliary Functions ##################
// ##########################################################


function isLastMonthDay(day) {
    let currDate = new Date()
    let currDay = currDate.getDate()
    let currMonth = currDate.getMonth()
    let currYear = currDate.getFullYear()
    let evenmonth = [4, 6, 9, 11]


    if (currDay == 31) {
        return true
    } else if (evenmonth.includes(currMonth) == true && currDay == 30) {
        return true
    } else if ((leapYear(currYear) == false) && (currMonth == 2) && (currDay == 28)) {
        return true
    } else if ((leapYear(currYear) == true) && (currMonth == 2) && (currDay == 29)) {
        return true
    } else {
        return false
    }
}
// if returns true, means its last day, so target variable should be set to 0

function leapYear(year) {
    if ((!year % 100) && (year % 4 == 0)) {
        return true
    } else if ((year % 100 == 0) && (year % 400 == 0)) {
        return true
    } else {
        return false
    }
};

function leadZerotime(zeroes) {
    if (zeroes < 10) {
        newzeroes = '0' + zeroes
        return newzeroes
    } else {
        return zeroes
    }
}

function isAlpha(word) {
    alphabet = 'abcdefghijklmnopqrstuvwxyz'

    for (let check of word) {
        if (alphabet.includes(check)) {
            return true
        } else {
            return false
        }
    }
};

function compareArr(arr_a, arr_b) {
    let iter = 0

    if (arr_a.length == 0) {
        return false

    } else {
        for (let element of arr_a) {
            if (arr_b[iter] != element) {
                return false
            }
            iter++
        }
        return true
    }
};

function randInt(start, end) {
    let percent = Math.random();
    let num = Math.floor(percent * (Math.floor(end) - Math.ceil(start) + 1) + start)

    return num
}

// document.addEventListener("DOMContentLoaded", startCheck, false);
document.addEventListener("DOMContentLoaded", rowGlowAnimate, false);
document.addEventListener("DOMContentLoaded", function () { addCharListener('keybutton', 'id') }, false);
document.addEventListener("DOMContentLoaded", function () { delCharListener('del_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { checkWordListener('sub_elem') }, false);
document.addEventListener("DOMContentLoaded", function () { exitStatListener('exit_stats') }, false);
document.addEventListener("DOMContentLoaded", function () { showStatsListener('show_stat') }, false);
document.addEventListener("DOMContentLoaded", function () { helpCloseStatListener('btn_exit_help') }, false);
document.addEventListener("DOMContentLoaded", function () { helpShowStatsListener('show_help') }, false);
document.addEventListener('keyup', keyPressAlpha);
document.addEventListener("DOMContentLoaded", checkExistUserData, false);
document.addEventListener("DOMContentLoaded", function () { setInterval(showTimerDOM, 1000) }, false);
document.addEventListener("DOMContentLoaded", getDailyWord, false);
document.addEventListener("DOMContentLoaded", function () { addGambiarraListener('title_gambiarra') })

