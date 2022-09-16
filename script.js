
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

dom.valueContainer.addEventListener("click", (event)=>{
    if(!event.target.nodeName === "BUTTON") return;
    let buttonId = event.target.id
    
    if(buttonId.startsWith("valSubmitBtn")){
        buttonId = parseInt(buttonId.replace("valSubmitBtn", ""))
        // Create a new value field
        // Render the new values
        valueFields[buttonId].value = document.getElementById(`valueInput${buttonId}`).value
    }
    else if(buttonId.startsWith("valDeleteBtn")){
        // Remove a value field
        // Render the new values

    }
})


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

function renderFields(){
    // Using the function of value Fields, render them given a new field is added, changed, or removed
    // Will not render when the sumbit button is clicked
    valueFieldContainerHTML = ""
    for(let i = 0; i < valueFields.length; i++){
        if(!valueFields[i].hasAnswered){
            valueFieldContainerHTML += `
            <div class="value-field" id="valueField${i}">
                <input type="number" min="0" placeholder="number" id="valueInput${i}" class="value-input">
                <button id="valSubmitBtn${i}" class="val-submit-btn">+</button>
            </div>
            `
        }
    }
    dom.valueContainer.innerHTML = valueFieldContainerHTML

}

function createNewValue(){
    newValue = {
        hasAnswered: false,
        value: null
    }
    valueFields.push(newValue)
    renderFields()
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