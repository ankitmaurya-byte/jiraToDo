let clicked = false
let body = document.querySelector('.main')
let newDIv
var uid = new ShortUniqueId();
let alowToDelet = false
let ticketColor = "blue"
let colorArray = ['ticketblue', 'ticketgreen', 'ticketred', 'ticketorange']
let modeDel = document.querySelector('.modeDel')
let Add = document.querySelector('.modeAdd')
let delIcon = document.querySelector('.modeDel .material-icons')
let addIcon = document.querySelector('.modeAdd .material-icons')
let addClick = true
let allData


loadtickets()

let allHeaderColor=document.querySelectorAll('.colorBox div')
    for(let i=0;i<allHeaderColor.length;i++){
        allHeaderColor[i].addEventListener('click',function(e){
            e.stopPropagation()
            let allTicketToDelet=document.querySelectorAll('.ticket')
            for(let j=0;j<allTicketToDelet.length;j++){
                allTicketToDelet[j].remove()
            }
            loadtickets("ticket"+e.currentTarget.classList[0])

        })
    }

if (!localStorage.getItem("allData")) {
    allData = {}
    allData = JSON.stringify(allData)
    localStorage.setItem("allData", allData)
}

// make div when add button clicked
let modeAdd = document.querySelector('.modeAdd')
modeAdd.addEventListener('click', function (e) {
    alowToDelet = false
    e.stopPropagation()

    if (clicked == false) {
        newDIv = document.createElement("div");
        newDIv.classList.add("grid");
        newDIv.innerHTML = `<div class="taskArea" contenteditable="true">
        </div>
        <div class="grid-colorBox">
            <div class="blue"><span class="material-icons">
            verified
            </span></div>
            <div class="green"></div>
            <div class="red"></div>
            <div class="orange"></div>
        </div>`
        body.append(newDIv)
        clicked = true
        //    stop propagation when clicked on black color grid box---------
        newDIv.querySelector('.grid-colorBox').addEventListener('click', function (e) {
            e.stopPropagation()
        })
        // tick on click--------------------------------------
        let allColor = document.querySelectorAll('.grid-colorBox div')
        ticketColor = allColor[0].classList[0]
        for (let i = 0; i < allColor.length; i++) {
            allColor[i].addEventListener('click', function (e) {
                e.stopPropagation()
                ticketColor = e.currentTarget.classList[0]
                for (let j = 0; j < allColor.length; j++) {
                    allColor[j].innerHTML = ""
                }
                e.currentTarget.innerHTML = `<span class="material-icons">
                verified
                </span>`
            })
        }

        let taskArea = document.querySelector('.taskArea')
        taskArea.addEventListener('click', function(e) {
            e.stopPropagation()
        })
        // ticket on enter---------------------------------------------
        taskArea.addEventListener('keypress', function (e) {
            if (e.key == 'Enter') {
                let newId = uid()
                let getData = JSON.parse(localStorage.getItem('allData'))
                getData[newId] = {
                    color: "ticket" + ticketColor,
                    text: taskArea.textContent,
                }
                localStorage.setItem('allData', JSON.stringify(getData))
                addIcon.style.cssText = 'font-size:40px !important'
                modeAdd.style.width = '10vh'
                modeAdd.style.height = '6vh'
                modeAdd.style.margin = '3.5vh'
                modeAdd.style.border = '2px solid black'
                addClick = true
                let newTicket = document.createElement('div')
                newTicket.classList.add('ticket')
                newTicket.innerHTML = `<div class="ticket-color ticket${ticketColor}"></div>
                <div class="ticket-id">${newId}</div>
                <div class="ticket-text" contenteditable="true">${taskArea.textContent}</div>`
                body.append(newTicket)

                newTicket.querySelector('.ticket-text').addEventListener('input', function (e) {
                    let dataForText = JSON.parse(localStorage.getItem('allData'))
                    dataForText[newTicket.querySelector('.ticket-id').textContent].text = e.currentTarget.textContent
                    localStorage.setItem('allData', JSON.stringify(dataForText))
                })
                // delet newDiv-----------------------
                newDIv.remove()
                clicked = false
                // click ticket-color to change color
                let counter = colorArray.indexOf(`ticket${ticketColor}`)
                newTicket.querySelector('.ticket-color').addEventListener('click', function (e) {
                    e.stopPropagation()
                    let idContent = newTicket.querySelector('.ticket-id').textContent
                    let dataObject = JSON.parse(localStorage.getItem('allData'))
                    dataObject[idContent].color = colorArray[(counter + 1) % 4]
                    localStorage.setItem('allData', JSON.stringify(dataObject))
                    e.currentTarget.classList.remove(colorArray[counter % 4])
                    e.currentTarget.classList.add(colorArray[(counter + 1) % 4])
                    counter++
                })
                newTicket.addEventListener('click', function (e) {
                    e.stopPropagation()
                    if (alowToDelet) {
                        e.currentTarget.remove()
                        let dataObject = JSON.parse(localStorage.getItem('allData'))
                        delete dataObject[e.currentTarget.querySelector('.ticket-id').textContent]
                        localStorage.setItem('allData', JSON.stringify(dataObject))
                    }
                })
            }
        })
    }
    else {
        newDIv.remove()
        clicked = false
    }
})




// on mouse over add
Add.addEventListener('mouseover', function (e) {
    if (addClick) {
        addIcon.style.cssText = 'font-size:50px !important'
        e.currentTarget.style.width = '12vh'
        e.currentTarget.style.height = '8vh'
        e.currentTarget.style.margin = '2.5vh'
        e.currentTarget.style.border = '4px solid black'
    }
})
Add.addEventListener('mouseout', function (e) {
    if (addClick) {
        addIcon.style.cssText = 'font-size:40px !important'
        e.currentTarget.style.width = '10vh'
        e.currentTarget.style.height = '6vh'
        e.currentTarget.style.margin = '3.5vh'
        e.currentTarget.style.border = '2px solid black'
    }
})

// on click change style add------------------------------------------------------

modeAdd.addEventListener('click', function (e) {
    if (addClick) {
        addIcon.style.cssText = 'font-size:50px !important'
        e.currentTarget.style.width = '12vh'
        e.currentTarget.style.height = '8vh'
        e.currentTarget.style.margin = '2.5vh'
        e.currentTarget.style.border = '4px solid black'
        addClick = false
    }
    else {
        addIcon.style.cssText = 'font-size:40px !important'
        e.currentTarget.style.width = '10vh'
        e.currentTarget.style.height = '6vh'
        e.currentTarget.style.margin = '3.5vh'
        e.currentTarget.style.border = '2px solid black'
        addClick = true
    }
})
// on mouse over del
modeDel.addEventListener('mouseover', function (e) {
    if (delClick) {
        delIcon.style.cssText = 'font-size:50px !important'
        e.currentTarget.style.width = '12vh'
        e.currentTarget.style.height = '8vh'
        e.currentTarget.style.margin = '2.5vh'
        e.currentTarget.style.border = '4px solid black'
    }
})
modeDel.addEventListener('mouseout', function (e) {
    if (delClick) {
        delIcon.style.cssText = 'font-size:40px !important'
        e.currentTarget.style.width = '10vh'
        e.currentTarget.style.height = '6vh'
        e.currentTarget.style.margin = '3.5vh'
        e.currentTarget.style.border = '2px solid black'
    }
})
// on click change style del---------------------------------------------------------------
let delClick = true
modeDel.addEventListener('click', function (e) {
    if (delClick) {

        delIcon.style.cssText = 'font-size:50px !important'
        e.currentTarget.style.width = '12vh'
        e.currentTarget.style.height = '8vh'
        e.currentTarget.style.margin = '2.5vh'
        e.currentTarget.style.border = '4px solid black'
        delClick = false
        alowToDelet = true
        newDIv.remove()
    } else {
        delIcon.style.cssText = 'font-size:40px !important'
        e.currentTarget.style.width = '10vh'
        e.currentTarget.style.height = '6vh'
        e.currentTarget.style.margin = '3.5vh'
        e.currentTarget.style.border = '2px solid black'
        delClick = true
        alowToDelet = false
    }
    e.stopPropagation()



})


// click on body to remove grid
document.querySelector('.main').addEventListener('click', function () {
    if (clicked == true) {
        addIcon.style.cssText = 'font-size:40px !important'
        modeAdd.style.width = '10vh'
        modeAdd.style.height = '6vh'
        modeAdd.style.margin = '3.5vh'
        modeAdd.style.border = '2px solid black'
        addClick = true
        newDIv.remove()
        clicked = false
    }
})


function loadtickets(paraColor) {
    let colorArray = ['ticketblue', 'ticketgreen', 'ticketred', 'ticketorange']
    let dataFromLocal = JSON.parse(localStorage.getItem('allData'))
    for (x in dataFromLocal) {
        let IdFromLocal = x;
        let ColorFromLocal = dataFromLocal[x].color

if( paraColor && paraColor!==ColorFromLocal)continue


        let TextFromLocal = dataFromLocal[x].text
        let newTicket = document.createElement('div')
        newTicket.classList.add('ticket')
        newTicket.innerHTML = `<div class="ticket-color ${ColorFromLocal}"></div>
        <div class="ticket-id">${IdFromLocal}</div>
        <div class="ticket-text" contenteditable="true">${TextFromLocal}</div>`





        newTicket.querySelector('.ticket-text').addEventListener('input', function (e) {
            let dataObject = JSON.parse(localStorage.getItem('allData'))
            dataObject[IdFromLocal].text = e.currentTarget.textContent
            localStorage.setItem('allData', JSON.stringify(dataObject))
        })


        let counter = colorArray.indexOf(`${ColorFromLocal}`)
        newTicket.querySelector('.ticket-color').addEventListener('click', function (e) {
            e.stopPropagation()
            let dataObject = JSON.parse(localStorage.getItem('allData'))
            dataObject[IdFromLocal].color = colorArray[(counter + 1) % 4]
            localStorage.setItem('allData', JSON.stringify(dataObject))
            e.currentTarget.classList.remove(colorArray[counter % 4])
            e.currentTarget.classList.add(colorArray[(counter + 1) % 4])
            counter++
        })
        newTicket.addEventListener('click', function (e) {
            e.stopPropagation()
            if (alowToDelet) {
                e.currentTarget.remove()
                let dataObject = JSON.parse(localStorage.getItem('allData'))
                delete dataObject[e.currentTarget.querySelector('.ticket-id').textContent]
                localStorage.setItem('allData', JSON.stringify(dataObject))
            }
        })
        body.append(newTicket)


    }
}






