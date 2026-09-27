

let healthRecords=[];

document.addEventListener("DOMContentLoaded",()=>{

    healthRecords=StorageController.getHealthRecords();

    loadResidentDropdown();

    displayHealthRecords();

    document
    .getElementById("healthForm")
    .addEventListener("submit",addHealthRecord);

});


function loadResidentDropdown(){

    const residents=StorageController.getResidents();

    const dropdown=document.getElementById("healthResident");

    dropdown.innerHTML=`<option value="">Select Resident</option>`;

    residents.forEach(resident=>{

        dropdown.innerHTML+=`
        <option value="${resident.id}">
            ${resident.name}
        </option>`;

    });

}


function addHealthRecord(event){

    event.preventDefault();

    const record={

        id:Date.now(),

        residentId:
        document.getElementById("healthResident").value,

        date:
        document.getElementById("healthDate").value,

        bloodPressure:
        document.getElementById("bloodPressure").value,

        bloodSugar:
        document.getElementById("bloodSugar").value,

        heartRate:
        document.getElementById("heartRate").value,

        temperature:
        document.getElementById("temperature").value,

        oxygenLevel:
        document.getElementById("oxygenLevel").value,

        weight:
        document.getElementById("weight").value,

        medicineStatus:
        document.getElementById("medicineStatus").value,

        risk:"Not Analyzed"

    };


    healthRecords.push(record);

    StorageController.saveHealthRecords(healthRecords);

    analyzeHealth(record);

    displayHealthRecords();

    document.getElementById("healthForm").reset();

}



function displayHealthRecords(){

    const table=document.getElementById("healthTableBody");

    table.innerHTML="";


    if(healthRecords.length===0){

        table.innerHTML=`
        <tr>
        <td colspan="6" class="empty-message">
        No health records available.
        </td>
        </tr>`;

        return;

    }


    healthRecords.forEach(record=>{

        table.innerHTML+=`

        <tr>

        <td>${record.date}</td>

        <td>${record.bloodPressure}</td>

        <td>${record.bloodSugar}</td>

        <td>${record.heartRate}</td>

        <td>${record.oxygenLevel}</td>

        <td>${record.risk}</td>

        </tr>

        `;

    });

}



function analyzeHealth(record){

    if(typeof AIEngine!=="undefined"){

        const result=AIEngine.checkHealth(record);

        record.risk=result.status;

        updateHealthRecord(record);

    }

}



function updateHealthRecord(updatedRecord){

    healthRecords=healthRecords.map(record=>{

        if(record.id===updatedRecord.id){

            return updatedRecord;

        }

        return record;

    });


    StorageController.saveHealthRecords(healthRecords);

}