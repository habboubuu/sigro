let mobileNav = document.getElementById("navMobile");
let closeIcone = document.getElementById("iconNav");

let line1 = document.getElementById('line1');

// -- MENU --
function handleMenu(){
    mobileNav.classList.toggle("nav-mobile-close")
    closeIcone.classList.toggle("fa-xmark")
}


// -- SLIDER ANIMATION --

function setupInterSectionObServer(element, isLTR, speed){
    const interSectionCallBack = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        console.log(element, isIntersecting);
        if (isIntersecting){
            document.addEventListener('scroll', scrollHandller);
        } else {
            document.removeEventListener('scroll', scrollHandller)
        }
    }
    const interSectionObServer = new IntersectionObserver(interSectionCallBack);

    interSectionObServer.observe(element);

    function scrollHandller(){
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;
        element.style.transform = `translateX(${translateX}px)`;
    }
}
setupInterSectionObServer(line1, true, 0.40);