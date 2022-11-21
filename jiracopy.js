let clicked=false
let body=document.querySelector('.main')
let newDIv
let alowToDelet=false
let ticketColor="blue"
let colorArray=['ticketblue','ticketgreen','ticketred','ticketorange']
// make div when add button clicked
    let modeAdd=document.querySelector('.modeAdd')
    modeAdd.addEventListener('click',function(e){
        alowToDelet=false
        e.stopPropagation()
     
    if(clicked==false){
        newDIv = document.createElement("div");
        newDIv.classList.add("grid");
        newDIv.innerHTML=`<div class="taskArea" contenteditable="true">
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
        clicked=true
       
        // tick on click--------------------------------------
        let allColor=document.querySelectorAll('.grid-colorBox div')
        for(let i=0;i<allColor.length;i++){
            allColor[i].addEventListener('click',function(e){
                e.stopPropagation()
                ticketColor=allColor[i].classList[0]
                for(let j=0;j<allColor.length;j++){
                    allColor[j].innerHTML=""
                }
                allColor[i].innerHTML=`<span class="material-icons">
                verified
                </span>`
            })
        }

        let taskArea=document.querySelector('.taskArea')
        taskArea.addEventListener('click',function(e){
            e.stopPropagation()
        })
        // ticket on enter---------------------------------------------
        taskArea.addEventListener('keypress',function(e){
            if(e.key=='Enter'){
                let newTicket=document.createElement('div')
                newTicket.classList.add('ticket')
                newTicket.innerHTML=`<div class="ticket-color ticket${ticketColor}"></div>
                <div class="ticket-text">${taskArea.textContent}</div>`
                body.append(newTicket)
        // delet newDiv-----------------------
                newDIv.remove()
                clicked=false
        // click ticket-color to change color
        let counter=colorArray.indexOf(`ticket${ticketColor}`)
        newTicket.querySelector('.ticket-color').addEventListener('click',function(e){
            e.stopPropagation()
                    e.currentTarget.classList.remove(colorArray[counter%4])
                    e.currentTarget.classList.add(colorArray[(counter+1)%4])
                    counter++
                })
                newTicket.addEventListener('click',function(e){
                    e.stopPropagation()
                    if(alowToDelet)e.currentTarget.remove()
                })
            }
        })
    }
    else{
        newDIv.remove()
        clicked=false
    }
})

let modeDel=document.querySelector('.modeDel')
let Add=document.querySelector('.modeAdd')
let delIcon=document.querySelector('.modeDel>.material-icons')
let addIcon=document.querySelector('.modeAdd>.material-icons')



// on mouse over add
Add.addEventListener('mouseover',function(e){
    if(addClick){
        addIcon.style.cssText='font-size:50px !important'
        e.currentTarget.style.width='12vh'
        e.currentTarget.style.height='8vh'
        e.currentTarget.style.margin='2.5vh'
        e.currentTarget.style.border='4px solid black'
    }
})
Add.addEventListener('mouseout',function(e){
    if(addClick){
        addIcon.style.cssText='font-size:40px !important'
        e.currentTarget.style.width='10vh'
        e.currentTarget.style.height='6vh'
        e.currentTarget.style.margin='3.5vh'
        e.currentTarget.style.border='2px solid black'  
    }
})

// on click change style add------------------------------------------------------
let addClick=true
modeDel.addEventListener('click',function(e){
    if(addClick){
        // ------------------------------------
        
        // addIcon.style.cssText='font-size:50px !important'
        
        
        // ------------------------------------
    e.currentTarget.style.width='12vh'
    e.currentTarget.style.height='8vh'
    e.currentTarget.style.margin='2.5vh'
    e.currentTarget.style.border='4px solid black'
    addClick=false 
    }else{
        addIcon.style.cssText='font-size:40px !important'
        e.currentTarget.style.width='10vh'
        e.currentTarget.style.height='6vh'
        e.currentTarget.style.margin='3.5vh'
        e.currentTarget.style.border='2px solid black'  
        addClick=true
    }
})
// on mouse over del
modeDel.addEventListener('mouseover',function(e){
    if(delClick){
        delIcon.style.cssText='font-size:50px !important'
        e.currentTarget.style.width='12vh'
        e.currentTarget.style.height='8vh'
        e.currentTarget.style.margin='2.5vh'
        e.currentTarget.style.border='4px solid black'
    }
})
modeDel.addEventListener('mouseout',function(e){
    if(delClick){
        delIcon.style.cssText='font-size:40px !important'
        e.currentTarget.style.width='10vh'
        e.currentTarget.style.height='6vh'
        e.currentTarget.style.margin='3.5vh'
        e.currentTarget.style.border='2px solid black'  
    }
})
// on click change style del---------------------------------------------------------------
let delClick=true
modeDel.addEventListener('click',function(e){
    e.stopPropagation()
    if(delClick){
        console.log(e.currentTarget)

// -----------------------------------------------------------------------

        delIcon.style.cssText='font-size:50px !important'

// -----------------------------
    e.currentTarget.style.width='12vh'
    e.currentTarget.style.height='8vh'
    e.currentTarget.style.margin='2.5vh'
    e.currentTarget.style.border='4px solid black'
    delClick=false 
    }else{
        delIcon.style.cssText='font-size:40px !important'
        e.currentTarget.style.width='10vh'
        e.currentTarget.style.height='6vh'
        e.currentTarget.style.margin='3.5vh'
        e.currentTarget.style.border='2px solid black'  
        delClick=true
    }
 
    alowToDelet=true
    if(clicked==true){
        newDIv.remove()
        clicked=false
    }
})


 // click on body to remove grid
 document.querySelector('.main').addEventListener('click',function(){
    if(clicked==true){
        newDIv.remove()
        clicked=false
    }
})