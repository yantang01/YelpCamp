const body = document.querySelector("#infinite");

body.onscroll = function () {
    if (window.scrollY > (document.body.offsetHeight - window.outerHeight)) {
        body.style.height = document.body.offsetHeight + 100 + "px";
    }
}