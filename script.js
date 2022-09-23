// GLOBAL VARIABLES
let hasSubmitted = false

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
    "amtPerDay": document.getElementById("amtPerDay"),
    "weekendsChk": document.getElementById("weekendsChk"),
    "resetBtn": document.getElementById("resetBtn"),
    "spacer": document.getElementById("spacer")
}
let valueFields = [
    {
        hasAnswered: false,
        value: null,
        amountOfDays: null
    }
]
render()

// FUNCTIONS
function getHtml(id, div=false, replace=false, final=false){
    let placeholder = ""

    if(final){
        placeholder = `
            <div class="final-field">
                <p class="final-p">${valueFields[id].value}</p>
                <p class="amount-of-days" id="timeForCompletion${id}"></p>
            </div>`
    }
    else if(!valueFields[id].hasAnswered || replace){
        placeholder = `
            <form action="submit" onsubmit="return false">
                <input type="number" min="0" 
                    ${replace ? `placeholder="${valueFields[id].value}" value="${valueFields[id].value}"` : `placeholder="num"`} 
                    id="valueInput${id}" class="value-input">
                <button id="visSubmitBtn${id}" class="val-btn val-submit-btn">+</button>
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

function saveValueInput(id){
    try {
        inputValue = parseInt(document.getElementById(`valueInput${id}`).value)
        if(inputValue <= 0) throw "Input is not a valid number"
        if(!inputValue){
            inputValue = parseInt(document.getElementById(`valueInput${id}`).placeholder)
        }
        if(!inputValue) throw "No input and no placeholder"
    } catch (error) {
        document.getElementById(`valueInput${id}`).style.border = "1px solid red"
        return
    }
    dom.resetBtn.style.display = "inline-block"
    dom.spacer.style.width = "10%"
    valueFields[id].value = inputValue
    valueFields[id].hasAnswered = true

    document.getElementById(`valueField${id}`)
        .innerHTML = getHtml(id)
}
function render(totalCount=false, totalDays=false){
    fullHtml = ""
    for(let i = 0; i < valueFields.length; i++){
        if(!totalCount && !totalDays){
            fullHtml += getHtml(i, div=true)
        }else{
            const weight = parseInt(valueFields[i].value) / totalCount
            const amountOfDays = (weight*totalDays).toFixed(2)
            valueFields[i].amountOfDays = amountOfDays
            fullHtml += getHtml(i, div=false, replace=false, final=true)
        }
    }
    dom.valueContainer.innerHTML = fullHtml
}

function captureDates(){
    if(!dom.startDateInput.value || !dom.endDateInput.value) return false;
    dates.startDate = dom.startDateInput.valueAsDate
    dates.endDate = dom.endDateInput.valueAsDate
    return true
}

function calculateDiff(){
    if((!dates.endDate) || (!dates.startDate) || (dates.startDate > dates.endDate)) return false;
    const dateDiff = dates.endDate - dates.startDate
    return dateDiff
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

function calculateDays(ms, total){
    if(!ms) return;
    const dayDiff = ms/1000/60/60/24
    let amtPerDay = total/dayDiff
    let amtPerWeek = 0
    let amtPerMonth = 0
    if(amtPerDay < 1) amtPerWeek = amtPerDay*7;
    if(amtPerDay < 1 && amtPerWeek < 1) amtPerMonth = amtPerDay*30;

    if(amtPerMonth) text = `Amount per Month: ${amtPerMonth%1!=0 ? amtPerMonth.toFixed(2) : amtPerMonth}`
    else if(amtPerWeek) text = `Amount per Week: ${amtPerWeek%1!=0 ? amtPerWeek.toFixed(2) : amtPerWeek}`
    else text = `Amount per Day: ${amtPerDay%1!=0 ? amtPerDay.toFixed(2) : amtPerDay}`

    dom.amtPerDay.textContent = text
    dom.total.textContent = `Total: ${total}`
    return dayDiff
}

function displayDays(){
    for(let i = 0; i < valueFields.length; i++){
        let totalDays = valueFields[i].amountOfDays
        let months = 0
        let weeks = 0

        if(totalDays > 30) months = Math.floor(totalDays / 30);
        totalDays -= months*30

        if(totalDays > 7) weeks = Math.floor(totalDays / 7);
        totalDays -= weeks*7

        if(totalDays % 1 != 1) totalDays = totalDays.toFixed(2);

        document.getElementById(`timeForCompletion${i}`)
            .textContent = `
                ${months ? `${months} ${months > 1 ? "months" : "month"} / ` : ""}
                ${weeks ? `${weeks} ${weeks > 1 ? "weeks" : "week"} / ` : ""}
                ${totalDays} ${totalDays === 1 ? "day" : "days"}`
    }
}

function createNewValue(){
    newValue = {
        hasAnswered: false,
        value: null,
        amountOfDays: null
    }
    valueFields.push(newValue)

    tempEl = document.createElement("div")
    tempEl.id = `valueField${valueFields.length-1}`
    tempEl.classList.add(`value-field`)
    tempEl.innerHTML = getHtml(valueFields.length-1)

    
    dom.valueContainer.appendChild(tempEl)
    document.getElementById(`valueInput${valueFields.length-1}`).focus()
}

//EVENT LISTENERS
dom.todayBtn.addEventListener("click", ()=>{
    dates.startDate = dates.now
    dom.startDateInput.value = dateFormat(dates.startDate)
})

dom.newValue.addEventListener("click", createNewValue)

dom.valueContainer.addEventListener("click", (event)=>{
    if((!event.target.nodeName === "BUTTON") || (!event.target.nodeName === "P"));
    let buttonId = event.target.id

    if(buttonId.startsWith("valDeleteBtn")){
        if(valueFields.length > 1){
            buttonId = parseInt(buttonId.replace("valDeleteBtn", ""))
            valueFields.splice(buttonId, 1)
            render()
        }

    }
    else if(buttonId.startsWith("visSubmitBtn")){
        buttonId = parseInt(buttonId.replace("visSubmitBtn", ""))
        if(buttonId === valueFields.length-1){
            createNewValue()
        }else{
            saveValueInput(buttonId)
        }
    }
    else if(buttonId.startsWith("valP")){
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
    if(valueFields.length === 1) return;
    buttonId = parseInt(event.target.id.replace("valueInput", ""))
    saveValueInput(buttonId)
})

dom.submitBtn.addEventListener("click", ()=>{
    let total = 0
    captureDates()
    for(let i = 0; i<valueFields.length; i++){
        if(!valueFields[i].hasAnswered){
            valueFields.pop(i)
            i--
        }else{
            total += parseInt(valueFields[i].value)
        } 
    }
    totalDays = calculateDays(calculateDiff(), total)
    render(total, totalDays)
    displayDays()
    dom.newValue.style.display = "none"
    dom.resetBtn.style.display = "inline-block"
    dom.spacer.style.width = "10%"
    hasSubmitted = true
})

dom.resetBtn.addEventListener("click", ()=>{
    if(hasSubmitted){
        render()
        hasSubmitted = false
        dom.newValue.style.display = "inline-block"
        dom.total.textContent = ""
        dom.amtPerDay.textContent = ""
    }else{
        dom.resetBtn.style.display = "none"
        dom.spacer.style.width = "0%"
        valueFields = [ {
            hasAnswered: false,
            value: null,
            amountOfDays: null
        }]
        render()
    }
})