async function solve() {
    const url ='http://localhost:3030/jsonstore/collections/students'
    const table = document.querySelector('#results tbody')

    const response = await fetch(url)
    const data = await response.json()
    // console.log(data);

    Object.values(data).forEach(student => {
        const fName = student.firstName
        const lName = student.lastName
        const facultyNum = student.facultyNumber
        const grade = Number(student.grade)
        
        const tr = document.createElement('tr')
        tr.setAttribute('id',student._id) 

        const firstNameCell = tr.insertCell(0)
        firstNameCell.textContent=fName

        const lastNameCell = tr.insertCell(1)
        lastNameCell.textContent=lName

        const facultyNumCell = tr.insertCell(2)
        facultyNumCell.textContent=facultyNum

        const gradeCell = tr.insertCell(3)
        gradeCell.textContent=grade.toFixed(2)

        table.appendChild(tr)
    })

    const submitBtn=document.getElementById('submit')
    submitBtn.addEventListener('click',onClickSubmit)
    
    async function onClickSubmit(ev) {
        // ev.preventDefault()

        const firstNameEl = document.getElementsByName('firstName')[0]
        const lastNameEl = document.getElementsByName('lastName')[0]
        const facultyNumEl = document.getElementsByName('facultyNumber')[0]
        const gradeEl = document.getElementsByName('grade')[0]

        const areNotEptyInputs=firstNameEl.value!=='' && lastNameEl.value!=='' && facultyNumEl.value !=='' && gradeEl.value!==''

        if (areNotEptyInputs) {
            const response = await fetch(url,{
                method:'POST',
                headers:{'Content-type': 'application/json'},
                body:JSON.stringify({
                    firstName:firstNameEl.value,
                    lastName:lastNameEl.value,
                    facultyNumber:facultyNumEl.value,
                    grade:gradeEl.value
                })
            })
        }
    }

}
solve()