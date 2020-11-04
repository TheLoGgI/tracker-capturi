let gen = idMaker() // Id generator function from developer.mozilla

const trackerList = []
let trackedList = [
    {
        id: gen.next().value,
        name: 'Election',
        trackerList: ['Trump','Biden', 'Election', 'voting', 'Kanyay']
    },
    {
        id: gen.next().value,
        name: 'Trump',
        trackerList: ['Rep', 'Repulican', 'Trum', 'President', ]
    },
    {
        id: gen.next().value,
        name: 'Biden',
        trackerList: ['Demokrat', 'Dem', 'Biden']
    },
    ]

document.addEventListener('DOMContentLoaded', e => {
    displayList(trackedList)
    removeHandlerEvent()
})


document.getElementById('formtracker').addEventListener('submit', e => {
    e.preventDefault()

    const trackerName = document.getElementById('nametracker').value
    
    createTracker(trackerName, trackerList)

    displayList(trackedList)

    e.target.reset()

    removeHandlerEvent()
})

// Add tracker words to tracker
document.getElementById('wordTrackerInput').addEventListener('click', e => {
    const addTrackWord = document.getElementById('wordtracker').value
    trackerList.push(addTrackWord)

    const htmlstring = `<div class="tracked">${addTrackWord}</div>`

    document.getElementById('trackedWords').insertAdjacentHTML('afterbegin', htmlstring)
})


// Filtre tracker list
document.getElementById('filterTrackers').addEventListener('keyup', e=> {

    let filterdArray = []


    if (e.target.value !== '') {
        if (isNaN(e.target.value)) {
            filterdArray = trackedList.filter(item => {
                // console.log(item.name.toLowerCase().includes(e.target.value.toLowerCase()));
                return item.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            displayList(filterdArray)
        } else {

            filterdArray = trackedList.filter(item => {
                return item.trackerList.length === Number(e.target.value)
            })
            displayList(filterdArray)
        }
    } else {
        displayList(trackedList)
    }
    
})


function displayList(list) {
    let htmlstring = ''
    for (const prop of list) {
        htmlstring += `
        <div class="tracker-item" data-id="${prop.id}">
            <p>${prop.name}</p>
            <p class="tracker-item-list">${stringList(prop.trackerList)}</p>
            <svg class="remove" viewBox="0 0 365.696 365.696"><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
        </div>` 
        
    }

    document.getElementById('trackerList').innerHTML = htmlstring
    removeHandlerEvent()
}


function removeHandlerEvent() {
    const removeList = document.querySelectorAll('.remove')
    for (const remover of removeList) {
        remover.addEventListener('click', removeTracker)
    }
}


function removeTracker(e) {
    // console.dir(e.target);
    let elementId = null
    if (e.target.tagName === 'svg') {
        // console.log(e.target.parentNode.dataset.id);
        elementId = e.target.parentNode.dataset.id
    } else if (e.target.tagName === 'path') {
        elementId = e.target.parentNode.parentNode.dataset.id
        // console.dir(e.target.parentNode.parentNode.dataset.id);
    }

    trackedList.forEach((item, index) => {
        if (item.id === Number(elementId)) {
            trackedList.splice(index, 1)
        }
    })

    displayList(trackedList)
}

function createTracker(name, trackerList) {
    trackedList.push({
        id: gen.next().value,
        name,
        trackerList
    })
}

function stringList(array) {
    return array.toString().split(',').join(' - ')
}

// Soruce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
function* idMaker() {
    let index = 0;
    while (true)
      yield index++;
  }

// Hide tracker application form
document.getElementById('addtracker').addEventListener('click', e => {
    document.getElementById('formtracker').classList.toggle('hidden')
})

