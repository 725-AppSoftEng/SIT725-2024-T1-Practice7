const cardList = [
    {
        title: "Snooby",
        image: "Pup2.jpeg",
        link: "About Snooby",
        descripton: "Hello! Hope you have a nice day!"
    },
    {
        title: "Rocky",
        image: "Pup3.jpeg",
        link: "About Rocky",
        descripton: "Hey there! This is Rocky"
    }
]

const clickMe = () => {
    alert("Thanks for clicking me. Have a great day!")
}

const submitForm = () => {
    let formData = {};
    formData.first_Name = $('#first_Name').val();
    formData.last_Name = $('#last_Name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
}
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' + '<div class="card"><div class="card-image waves-effect waves-block waves-light "><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator darkslategrey-text text-darken-4">' + item.title +
            '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title darkslategrey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p><a>' + item.descripton + '</a></p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
});
