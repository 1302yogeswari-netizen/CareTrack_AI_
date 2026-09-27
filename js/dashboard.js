

document.addEventListener("DOMContentLoaded",()=>{

    updateDashboard();

});


function updateDashboard(){

    const residents=
    StorageController.getResidents();

    const healthRecords=
    StorageController.getHealthRecords();

    const medicines=
    StorageController.getMedicines();


    const totalResidents=
    document.getElementById("totalResidents");

    const healthCount=
    document.getElementById("healthRecords");

    const medicineCount=
    document.getElementById("medicineCount");

    const alertCount=
    document.getElementById("alertCount");



    if(totalResidents){

        totalResidents.textContent=
        residents.length;

    }


    if(healthCount){

        healthCount.textContent=
        healthRecords.length;

    }


    if(medicineCount){

        medicineCount.textContent=
        medicines.length;

    }


    if(alertCount){

        const alerts=
        healthRecords.filter(
            record=>record.risk==="High"
        );


        alertCount.textContent=
        alerts.length;

    }

}