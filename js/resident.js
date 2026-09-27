

let residents = [];
let selectedResident = null;

document.addEventListener("DOMContentLoaded", () => {

    residents = StorageController.getResidents();

    displayResidents();

    document
        .getElementById("residentForm")
        .addEventListener("submit", addResident);

    document
        .getElementById("residentSearch")
        .addEventListener("input", searchResident);

});

function addResident(event) {

    event.preventDefault();

    const resident = {

        id: Date.now(),

        name: document.getElementById("residentName").value,

        age: document.getElementById("residentAge").value,

        gender: document.getElementById("residentGender").value,

        bloodGroup: document.getElementById("bloodGroup").value,

        room: document.getElementById("roomNumber").value,

        emergencyContact:
        document.getElementById("emergencyContact").value,

        condition:
        document.getElementById("medicalCondition").value,

        allergies:
        document.getElementById("allergies").value,

        status: "Healthy"

    };


    residents.push(resident);


    StorageController.saveResidents(residents);


    displayResidents();


    document.getElementById("residentForm").reset();


}


function displayResidents(data = residents) {

    const tableBody =
    document.getElementById("residentTableBody");


    tableBody.innerHTML = "";


    if(data.length === 0){

        tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="empty-message">
                No residents added yet.
            </td>
        </tr>
        `;

        return;

    }


    data.forEach(resident => {


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${resident.name}</td>

            <td>${resident.age}</td>

            <td>${resident.gender}</td>

            <td>${resident.room}</td>

            <td>${resident.status}</td>

            <td>

                <button 
                class="primary-btn"
                onclick="viewResident(${resident.id})">
                    View
                </button>

                <button 
                class="delete-btn"
                onclick="deleteResident(${resident.id})">
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);


    });

}


function deleteResident(id){

    residents = residents.filter(
        resident => resident.id !== id
    );


    StorageController.saveResidents(residents);


    displayResidents();

}


function searchResident(event){

    const keyword =
    event.target.value.toLowerCase();


    const filteredResidents =
    residents.filter(resident =>

        resident.name
        .toLowerCase()
        .includes(keyword)

    );


    displayResidents(filteredResidents);

}



function viewResident(id){


    selectedResident =
    residents.find(
        resident => resident.id === id
    );


    if(!selectedResident) return;


    document.getElementById("profileName")
    .textContent = selectedResident.name;


    document.getElementById("profileBasicInfo")
    .textContent =
    `${selectedResident.gender}, Room ${selectedResident.room}`;


    document.getElementById("profileAge")
    .textContent = selectedResident.age;


    document.getElementById("profileGender")
    .textContent = selectedResident.gender;


    document.getElementById("profileBlood")
    .textContent = selectedResident.bloodGroup;


    document.getElementById("profileRoom")
    .textContent = selectedResident.room;


    document.getElementById("profileCondition")
    .textContent = selectedResident.condition;


    document.getElementById("profileAllergies")
    .textContent = selectedResident.allergies;


    showSection("profile");

}