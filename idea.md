# Organization
## Dates
For the dates, use a capture function when the submit button is clicked to capture all the inputs in all the fields and add them to an object or an array.

Then call another function that will manipulate the values in the object to get the deadlines.

Sample Object:
{
    todaysDate: 2022-09-14
    endingDate: 2022-09-16
    diffDate: 932755098 (in ms)

}

## Inputs
Use an array of objects to keep track of the different inputs. The position in the array will keep track of the value's ID

A function can go through and update IDs when an object is removed.

A render function can fix a functions child elements from having the wrong id

Sample:
[
    {
        id: 0,
        hasAnswered: false,
        value: Null,
        dom: document.getElementById(`valueField${this.id}`) //I'm not sure if you would use this, but I will do some testing
    },
    {
        id: 1,
        hasAnswered: true,
        value: 12,
        dom: document.getElementById(`valueField${this.id}`)
    }
]

## Dom
Use yet another object for dom manipulation