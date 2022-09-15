const adder = document.getElementById("addButton")
const inputContainer = document.getElementById("input-container")
let counter = 1
console.log(adder)

adder.addEventListener("click", ()=>{
    const newEl = document.createElement("div")
    newEl.className = `inputField`
    newEl.id = `inputField${counter}`
    newEl.innerHTML = `
        <form action="submit">
            <input type="number" id="inputEl${counter}" placeholder="number">
            <p>${counter}</p>
            <button id="submitBtn${counter}">+</button>
        </form>
    `
    inputContainer.appendChild(newEl)
    counter++
})

inputContainer.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "BUTTON";
    if(!isButton){
        return
    }

    let buttonId = event.target.id 

    if(buttonId.startsWith("submitBtn")){
        buttonId = buttonId.replace("submitBtn", "")
        console.log(document.getElementById(`inputField${buttonId}`))
        console.log(document.getElementById(`inputEl${buttonId}`))
        document.getElementById(`inputField${buttonId}`)
            .innerHTML = `
                <p>${document.getElementById(`inputEl${buttonId}`).value}</p>
                <button id="delBtn${buttonId}">-</button>
            `
    }
    
    else if(buttonId.startsWith("delBtn")){
        buttonId = buttonId.replace("delBtn", "")
        inputContainer.removeChild(document.getElementById(`inputField${buttonId}`))
        // Shift all numbers past current down one?
        // for(let i = buttonId+1; i < counter; i++){
        //     const tempEl = document.getElementById(`inputField${i}`)
        //     tempEl.id = `inputField${i-1}`
        // // More code is needed here
        // }
    }

})