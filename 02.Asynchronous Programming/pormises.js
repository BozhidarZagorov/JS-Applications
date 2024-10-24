function proposal() {
    const promise=new Promise((resolve,reject)=>{
        console.log('proposal');
    
        setTimeout(()=>{
            if (Math.random()<0.5){
                resolve('just married!')
            }else{
                reject('its not you its me')
            }
        },3650)
        
    })
    return promise
}

// const promise = proposal()
// console.log(promise);

// promise
//     .then(result=>{
//         console.log(result);
//     })
//     .catch(err=>{
//         console.log(err);
    
//     })


    const first=proposal()
    const second=proposal()
    const third=proposal()
    const fourth=proposal()
    const groupProposal = Promise.all([
        first,
        second,
        third,
        fourth
    ])
    // groupProposal.then((result)=>console.log(result)).catch((errs)=>console.log(errs)).finally(()=>console.log('i da padnem i da biem.....'))       //pri 1 failed vsi4ki sa rejected i catchva error pri .all


    // const groupProposal = Promise.allSettled([
    //     first,
    //     second,
    //     third,
    //     fourth
    // ])
    // groupProposal.then((result)=>console.log(result)).catch((errs)=>console.log(errs)).finally(()=>console.log('i da padnem i da biem.....'))      //izkarva vypreki catch error izkarva rezultatite pri .allSettled
