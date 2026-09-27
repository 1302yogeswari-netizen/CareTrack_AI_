

document.addEventListener("DOMContentLoaded",()=>{

    setupNavigation();

    showSection("dashboard");

});


function setupNavigation(){

    const links=
    document.querySelectorAll(".nav-link");


    links.forEach(link=>{


        link.addEventListener("click",(event)=>{


            event.preventDefault();


            const section=
            link.getAttribute("data-section");


            showSection(section);


            links.forEach(item=>{

                item.classList.remove("active");

            });


            link.classList.add("active");


        });


    });

}



function showSection(sectionId){


    const sections=
    document.querySelectorAll(".page-section");


    sections.forEach(section=>{


        section.classList.remove("active-section");


    });



    const activeSection=
    document.getElementById(sectionId);



    if(activeSection){

        activeSection.classList.add("active-section");

    }


}