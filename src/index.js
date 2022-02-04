function openPage(pageName, element, color) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].style.backgroundColor = "";
        tabLinks[i].style.color = "white";
    }
    document.getElementById(pageName).style.display = "block";
    element.style.backgroundColor = color;
    element.style.color = "black";
}

$(document).ready(function () {
    document.getElementById("defaultOpen").click();
});

