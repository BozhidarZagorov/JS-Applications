function sum(a,b) {
    return a+b
}
function multiply(a,b) {
    return a*b
}
function subtract(a,b) {
    return a-b
}
export function subtractV2(a,b) {   //moje i v na4aloto da se exportira // named export
    return a-b
}
export const divide=(a,b)=>{
    return a/b
}

export{
    sum,
    multiply
}


/////////////////////////////////////////////////////
// const calculator = {
//     sum,
//     multiply,
//     subtract,                    //drug variant za exportvane s constanta 
//     subtractV2,
//     divide
// }
// export default calculator 
////////////////////////////////////////////////////////