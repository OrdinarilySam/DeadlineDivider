const now = new Date()

const startDateInp = document.querySelector("#start-date-inp")
const endDateInp = document.querySelector("#end-date-inp")
const numberInp = document.querySelector("#number-inp")

const amtPerDay = document.querySelector("#amt-per-day")
const amtPerWeek = document.querySelector("#amt-per-week")
const amtPerMonth = document.querySelector("#amt-per-month")
const amtPerYear = document.querySelector("#amt-per-year")

const submitBtn = document.querySelector("#submit-btn")
submitBtn.addEventListener("click", function(){
    const startDate = startDateInp.value
    const endDate = endDateInp.value
    const amt = numberInp.value
    if(!startDate || !endDate || !amt) return

    const startDateArr = startDate.split("-")
    const endDateArr = endDate.split("-")

    const yearDiff = endDateArr[0] - startDateArr[0]
    const monthDiff = endDateArr[1] - startDateArr[1]
    const dayDiff = endDateArr[2] - startDateArr[2]

    const totalDiff = (yearDiff*365) + (monthDiff*30) + dayDiff
    const perDay = amt/totalDiff

    let perWeek = (perDay*7)
    if(perWeek>amt) perWeek = amt
    else perWeek = perWeek.toFixed(2)
    let perMonth = (perDay*30)
    if (perMonth > amt) perMonth = amt
    else perMonth = perMonth.toFixed(2)
    let perYear = (perDay*365)
    if (perYear > amt) perYear = amt
    else perYear = perYear.toFixed(2)

    amtPerDay.textContent = `Amount per Day: ${perDay.toFixed(2)}`
    amtPerWeek.textContent = `Amount per Week: ${perWeek}`
    amtPerMonth.textContent = `Amount per Month: ${perMonth}`
    amtPerYear.textContent = `Amount per Year: ${perYear}`
})


const todayBtn = document.querySelector("#today-btn")
todayBtn.addEventListener("click", function(){
    console.log(now)
    startDateInp.valueAsDate = now
})