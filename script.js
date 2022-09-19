
let dates = {
    "now": new Date(),
    "startDate": null,
    "endDate": null
}
let dom = {
    "startDateInput": document.getElementById("startDateInput"),
    "endDateInput": document.getElementById("endDateInput"),
    "submitBtn": document.getElementById("submitBtn"),
    "todayBtn": document.getElementById("todayBtn"),
    "newValue": document.getElementById("newValueBtn"),
    "valueContainer": document.getElementById("valueContainer"),
    "total": document.getElementById("total"),
    "amtPerDay": document.getElementById("amtPerDay")
}

function getHtml(id, div=false, replace=false, final=false){
    let placeholder = ""

    if(final){
        placeholder = `
            <div class="final-field">
                <p class="final-p">${valueFields[id].value}</p>
                <p class="amount-of-days" id="amountOfDays${id}></p>
            </div>`
    }
    else if(!valueFields[id].hasAnswered || replace){
        placeholder = `
            <form action="submit" onsubmit="return false">
                <input type="number" min="0" 
                    ${replace ? `placeholder="${valueFields[id].value}" value="${valueFields[id].value}"` : `placeholder="num"`} 
                    id="valueInput${id}" class="value-input">
                <button id="valSubmitBtn${id}" class="val-btn val-submit-btn" type="submit">+</button>
            </form>`
    }else{
        placeholder = `
            <form onsubmit="return false">
                <p id="valP${id}" class="val-p">${valueFields[id].value}</p>
                <button id="valDeleteBtn${id}" class="val-btn val-delete-btn">-</button>
            </form>`
    }

    if(div){
        placeholder = `
            <div class="value-field" id="valueField${id}">
                ${placeholder}
            </div>`
    }
    return placeholder
}

let valueFields = []

dom.todayBtn.addEventListener("click", setStartAsToday)
dom.newValue.addEventListener("click", createNewValue)

function saveValueInput(buttonId){
    try {
        buttonId = parseInt(buttonId.replace("valSubmitBtn", ""))
    } catch (error) {
        
    }
    try {
        inputValue = parseInt(document.getElementById(`valueInput${buttonId}`).value)
        if(inputValue <= 0) throw "Input is not a valid number"
        if(!inputValue) throw "No input"
    } catch (error) {
        document.getElementById(`valueInput${buttonId}`).style.border = "1px solid red"
        return
    }
    valueFields[buttonId].value = document.getElementById(`valueInput${buttonId}`).value
    valueFields[buttonId].hasAnswered = true

    document.getElementById(`valueField${buttonId}`)
        .innerHTML = getHtml(buttonId)
}
function renderAll(){
    fullString = ""
    for(let i = 0; i < valueFields.length; i++){
        fullString += getHtml(i, div=true)
    }
    dom.valueContainer.innerHTML = fullString
}

// This event listener checks for the submit button, the delete button, and a click on the paragraph
dom.valueContainer.addEventListener("click", (event)=>{
    if((!event.target.nodeName === "BUTTON") || (!event.target.nodeName === "P"));
    let buttonId = event.target.id
    
    if(buttonId.startsWith("valSubmitBtn")){
        saveValueInput(buttonId)
    }
    else if(buttonId.startsWith("valDeleteBtn")){
        // Remove a value field
        // Render the new values with updated ids
        buttonId = parseInt(buttonId.replace("valDeleteBtn", ""))
        valueFields.splice(buttonId, 1)
        renderAll()

    }
    else if(buttonId.startsWith("valP")){
        // Change the text field to an input field.
        buttonId = parseInt(buttonId.replace("valP", ""))
        document.getElementById(`valueField${buttonId}`)
            .innerHTML = getHtml(buttonId, div=false, replace=true)

        const valInp = document.getElementById(`valueInput${buttonId}`)
        valInp.focus()

        const tempval = valInp.value
        valInp.value = ""
        valInp.value = tempval
    }
})
dom.valueContainer.addEventListener("focusout", (event)=>{
    if(!event.target.nodeName === "INPUT") return;
    buttonId = parseInt(event.target.id.replace("valueInput", ""))
    saveValueInput(buttonId)
})


// Small buttons and functions
function captureDates(){
    if(!dom.startDateInput.value || !dom.endDateInput.value) return false;
    dates.startDate = dom.startDateInput.valueAsDate
    dates.endDate = dom.endDateInput.valueAsDate
    return true
}

function setStartAsToday(){
    dates.startDate = dates.now
    dom.startDateInput.value = dateFormat(dates.startDate)
}

function createNewValue(){
    newValue = {
        hasAnswered: false,
        value: null
    }
    valueFields.push(newValue)

    tempEl = document.createElement("div")
    tempEl.id = `valueField${valueFields.length-1}`
    tempEl.classList.add(`value-field`)
    tempEl.innerHTML = getHtml(valueFields.length-1)

    dom.valueContainer.appendChild(tempEl)
}

function calculateDiff(){
    if((!dates.endDate) || (!dates.startDate) || (dates.startDate > dates.endDate)) return false;
    const dateDiff = dates.endDate - dates.startDate
    return dateDiff
}


dom.submitBtn.addEventListener("click", ()=>{
    total = 0
    captureDates()
    for(let i = 0; i<valueFields.length; i++){
        if(!valueFields[i].hasAnswered) return;
        total += parseInt(valueFields[i].value)
    }
    totalDays = stuff(calculateDiff(), total)
    renderFinal(total, totalDays)
})

function renderFinal(total, totalDays){
    finalHtml = ""
    for(let i = 0; i<valueFields.length; i++){
        weight = parseInt(valueFields[i].value) / total
        console.log(weight, totalDays)
        amountOfDays = (weight*totalDays).toFixed(2)
        finalHtml += getHtml(i, div=false, replace=false, final=true)
    }
    dom.valueContainer.innerHTML = finalHtml
}

function dateFormat(inputDate) {
    const date = new Date(inputDate)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    let dateString = year.toString() + "-"
    dateString += month.toString().padStart(2, "0") + "-"
    dateString += day.toString()

    return dateString;
}

function stuff(ms, total){
    if(!ms) return;
    dayDiff = ms/1000/60/60/24
    dom.amtPerDay.textContent = `Amount per day: ${total/dayDiff}`
    dom.total.textContent = `Total: ${total}`
    return dayDiff
}
