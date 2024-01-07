const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
    const menuList = document.querySelector('.side-nav-hamburger'); 
    if (menuList.classList.contains("visible")) {
        menuList.classList.remove("visible");
    } else {
        menuList.classList.add("visible");    
    }
}
