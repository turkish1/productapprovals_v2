function checkSbs() {
    sbsdatamt.value.forEach((item, index) => {
        console.log(item.sbsData, index);
        selfadhered.samanufacturer = item.sbsData.applicant;
        selfadhered.samaterial = item.sbsData.material;
        selfadhered.sadescription = item.sbsData.description;
    });
}

// function checkPoly() {
//     polydatamt.value.forEach((item, index) => {
//         console.log(item.polyData, index);
//         underlayment.umanufacturer = item.polyData.applicant;
//         underlayment.umaterial = item.polyData.material;
//         underlayment.udescription = item.polyData.description;
//     });
// }
