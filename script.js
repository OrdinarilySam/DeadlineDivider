
let dates = {
    "now": new Date(),
    "startDate": null,
    "endDate": null
}
let dom = {
    "startDateInput": document.getElementById("startDateInput"),
    "endDateInput": document.getElementById("endDateInput"),
    "amtPerDay": document.getElementById("amtPerDay"),
    "amtPerWeek": document.getElementById("amtPerWeek"),
    "amtPerMonth": document.getElementById("amtPerMonth"),
    "amtPerYear": document.getElementById("amtPerYear"),
    "submitBtn": document.getElementById("submitBtn"),
    "todayBtn": document.getElementById("todayBtn"),
    "newValue": document.getElementById("newValueBtn"),
    "valueContainer": document.getElementById("valueContainer")
}
let valueFields = []

dom.todayBtn.addEventListener("click", setStartAsToday)
dom.newValue.addEventListener("click", createNewValue)

function saveValueInput(buttonId){
    try {
        buttonId = parseInt(buttonId.replace("valSubmitBtn", ""))
    } catch (error) {
        
    }
    // Create a new value field
    // Render the new values
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

    placeholder = `
        <form onsubmit="return false">
            <p id="valP${buttonId}" class="val-p">${valueFields[buttonId].value}</p>
            <button id="valDeleteBtn${buttonId}" class="val-btn val-delete-btn">-</button>
        </form>
    `
    document.getElementById(`valueField${buttonId}`)
        .innerHTML = placeholder
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
        console.log("button tried to delete with an id", buttonId)
        buttonId = parseInt(buttonId.replace("valDeleteBtn", ""))
        console.log(valueFields)
        valueFields.pop(buttonId)
        console.log(valueFields)

    }
    else if(buttonId.startsWith("valP")){
        // Change the text field to an input field.
        buttonId = parseInt(buttonId.replace("valP", ""))
        placeholder = `
        <form action="submit" onsubmit="return false">
            <input type="number" min="0" placeholder="${valueFields[buttonId].value}" value="${valueFields[buttonId].value}" id="valueInput${buttonId}" class="value-input">
            <button id="valSubmitBtn${buttonId}" class="val-btn val-submit-btn" type="submit">+</button>
        </form>
        `
        document.getElementById(`valueField${buttonId}`)
            .innerHTML = placeholder

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
    tempEl = document.createElement("div")
    tempEl.id = `valueField${valueFields.length}`
    tempEl.classList.add(`value-field`)
    tempEl.innerHTML = `
        <form action="submit" onsubmit="return false">
            <input type="number" min="0" placeholder="num" id="valueInput${valueFields.length}" class="value-input">
            <button id="valSubmitBtn${valueFields.length}" class="val-btn val-submit-btn" type="submit">+</button>
        </form>
        `
    valueFields.push(newValue)
    dom.valueContainer.appendChild(tempEl)
    // renderFields()
}

function calculateDiff(){
    const dateDiff = dates.endDate - dates.startDate
    return dateDiff
}


dom.submitBtn.addEventListener("click", (event)=>{
    
})

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

// submitBtn.addEventListener("click", function(){
//     // const startDate = startDateInp.value
//     // const endDate = endDateInp.value
//     // const amt = numberInp.value
//     // if(!startDate || !endDate || !amt) return
//     // if(amt<=0) return

//     // const startDateArr = startDate.split("-")
//     // const endDateArr = endDate.split("-")

//     // const yearDiff = endDateArr[0] - startDateArr[0]
//     // const monthDiff = endDateArr[1] - startDateArr[1]
//     // const dayDiff = endDateArr[2] - startDateArr[2]

//     // const totalDiff = (yearDiff*365) + (monthDiff*30) + dayDiff
//     // const perDay = amt/totalDiff

//     // let perWeek = (perDay*7)
//     // if(perWeek>amt) perWeek = amt
//     // else perWeek = perWeek.toFixed(2)
//     // let perMonth = (perDay*30)
//     // if (perMonth > amt) perMonth = amt
//     // else perMonth = perMonth.toFixed(2)
//     // let perYear = (perDay*365)
//     // if (perYear > amt) perYear = amt
//     // else perYear = perYear.toFixed(2)

//     // amtPerDay.textContent = `Per Day: ${perDay.toFixed(2)}`
//     // amtPerWeek.textContent = `Per Week: ${perWeek}`
//     // amtPerMonth.textContent = `Per Month: ${perMonth}`
//     // amtPerYear.textContent = `Per Year: ${perYear}`
// })