document.addEventListener("DOMContentLoaded",()=>{

    loadAIResidents();

    const button=document.getElementById("analyzeBtn");

    if(button){

        button.addEventListener("click",analyzeResidentHealth);

    }

});


function loadAIResidents(){

    const residents=StorageController.getResidents();

    const dropdown=document.getElementById("aiResident");

    if(!dropdown) return;

    dropdown.innerHTML=`
        <option value="">Select Resident</option>
    `;

    residents.forEach(resident=>{

        dropdown.innerHTML+=`
        <option value="${resident.id}">
            ${resident.name}
        </option>`;

    });

}


function analyzeResidentHealth(){

    const residentId=document.getElementById("aiResident").value;

    const resultBox=document.getElementById("aiResultBox");

    if(residentId===""){

        resultBox.innerHTML=`
        <p class="empty-message">
        Please select a resident.
        </p>`;

        return;

    }

    const records=StorageController.getHealthRecords();

    const record=records
        .filter(r=>String(r.residentId)===String(residentId))
        .at(-1);

    if(!record){

        resultBox.innerHTML=`
        <p class="empty-message">
        No health record found for this resident.
        </p>`;

        return;

    }

    const result=AIEngine.checkHealth(record);

    resultBox.innerHTML=`

    <div class="ai-result">

    <h3>Risk Level : ${result.status}</h3>

    <p>${result.message}</p>

    </div>

    `;

}