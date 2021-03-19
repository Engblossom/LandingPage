  /**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.querySelector('#navbar__list');
const navPostsFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Begin Main Functions
*/

// building the nav
function getNavList (){
    for (let sec of sections){
        
        const listItem = document.createElement('li');
        const navA = document.createElement('a');
        const navData = sec.getAttribute('data-nav');
        const navLinkText = document.createTextNode(navData); 

        //linking anchor link to related section
        smoothScroll(navA, sec);
        
        //building anchor link
        navA.appendChild(navLinkText);
        navA.setAttribute('class', 'menu__link');
        
        //build navigation list items
        listItem.appendChild(navA);        
        navPostsFragment.appendChild(listItem);
    }
    navList.appendChild(navPostsFragment);
} 

// Adding class 'active' to section when near top of viewport

function activate (){

    const navs = document.querySelectorAll('a');

    //listen to location of the section
    window.addEventListener('scroll', function (){
        for(const sec of sections){
            const border= sec.getBoundingClientRect();

            //decide the section's top location
            if(border.top>=0 && border.top<=200){
                //removing any other active section
                for(const element of sections){
                    element.classList.remove('your-active-class');
                }
                //set up the active section class
                sec.setAttribute('class', 'your-active-class');

                //decide which navigation item is active
                for(const nav of navs){
                    if (sec.getAttribute('data-nav')==nav.textContent){

                        //removing any other active navigation item
                        for (const activeNav of navs){
                            if(activeNav.classList=='menu__link active__link'){
                                activeNav.classList.remove('active__link');}
                        }
                        
                        //set up the active navigation item
                        nav.classList.add('active__link');
                    }
                }
            }
        }
    });
}
// smoothScroll to Section on click
function smoothScroll(navLink, targetSec)
{
    navLink.addEventListener( 'click', function(){     
        targetSec.scrollIntoView({behavior:'smooth'});
    })
}
/**
 * End Main Functions
 * Begin Events
*/

// Build navigation menu
getNavList();

// Set sections as active
activate();
