async function getInfo() {
    const stopNameEl=document.getElementById('stopName')
    const bussesEl=document.getElementById('buses')
    const submitBtn=document.getElementById('submit')

    const stopId=document.getElementById('stopId').value
    const url=`http://localhost:3030/jsonstore/bus/businfo/${stopId}`

    try {
        stopNameEl.textContent='Loading...'
        bussesEl.replaceChildren()
        submitBtn.disabled=true

        const res = await fetch(url)

        if (res.status !== 200) {
            throw Error('Stop ID not found')
        }

        const data = await res.json()

        stopNameEl.textContent=data.name

        Object.entries(data.buses).forEach(bus=>{

            const li=document.createElement('li')
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
            bussesEl.appendChild(li)

        })
        submitBtn.disabled=false

    } catch (err){
        stopNameEl.textContent='Error'
    }

}