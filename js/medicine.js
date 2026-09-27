

let medicines = [];

document.addEventListener("DOMContentLoaded",()=>{

    medicines = StorageController.getMedicines();

    loadMedicineResidents();

    displayMedicines();

    document
    .getElementById("medicineForm")
    .addEventListener("submit",addMedicine);

});


function loadMedicineResidents(){

    const residents=StorageController.getResidents();

    const dropdown=document.getElementById("medicineResident");

    dropdown.innerHTML=`<option value="">Select Resident</option>`;

    residents.forEach(resident=>{

        dropdown.innerHTML+=`
        <option value="${resident.id}">
            ${resident.name}
        </option>`;

    });

}


function addMedicine(event){

    event.preventDefault();

    const medicine={

        id:Date.now(),

        residentId:
        document.getElementById("medicineResident").value,

        name:
        document.getElementById("medicineName").value,

        morning:
        document.getElementById("morningDose").value,

        afternoon:
        document.getElementById("afternoonDose").value,

        night:
        document.getElementById("nightDose").value,

        status:"Active"

    };


    medicines.push(medicine);

    StorageController.saveMedicines(medicines);

    displayMedicines();

    document
    .getElementById("medicineForm")
    .reset();

}



function displayMedicines(){

    const table=document.getElementById("medicineTableBody");

    table.innerHTML="";


    if(medicines.length===0){

        table.innerHTML=`
        <tr>
        <td colspan="6" class="empty-message">
        No medicine records available.
        </td>
        </tr>`;

        return;

    }


    medicines.forEach(medicine=>{


        const resident=
        StorageController
        .getResidents()
        .find(r=>r.id==medicine.residentId);



        table.innerHTML+=`

        <tr>

        <td>${resident ? resident.name : "Unknown"}</td>

        <td>${medicine.name}</td>

        <td>${medicine.morning}</td>

        <td>${medicine.afternoon}</td>

        <td>${medicine.night}</td>

        <td>${medicine.status}</td>

        </tr>

        `;


    });

}