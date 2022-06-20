/** Define Global Variables **/
const navbarList = document.getElementById('navbar__list');
let sections = document.querySelectorAll('[data-nav]');
    sectionsLength = sections.length;
const mainPage = document.getElementById('main');
const sectionHeadingInput = document.getElementById('section-heading'),
      paragraphOneInput = document.getElementById('paragraph-one'),
      paragraphTwoInput = document.getElementById('paragraph-two'),
      linkTitleInput = document.getElementById('link-title'),
      generateSectionBtn = document.getElementById('btn');
const scrollTopBtn = document.querySelector('.scroll-top');
/** End Global Variables **/

/** Begin Main Functions **/
// build the nav
function addNavbarLinks() {
    navbarList.innerHTML = '';
    for (let i = 0; i < sectionsLength; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#" class="section${[i + 1]} menu__link">${sections[i].getAttribute('data-nav')}</a>`
        navbarList.appendChild(listItem);
    }
}

addNavbarLinks()

// Select Navigation bar Links
let navLinks = document.querySelectorAll('#navbar__list a');

// Add class 'active' to section when near top of viewport
function isVisibleInViewport() {
    sections.forEach(section => {
        let sectionLink = document.querySelector(`.${section.id}`)
        if (section.getBoundingClientRect().top <= 100 && section.getBoundingClientRect().bottom >= 100) {
            section.classList.add('active');
            sectionLink.classList.add('active');
        } else {
            section.classList.remove('active');
            sectionLink.classList.remove('active');
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
    e.preventDefault();
    let section = document.getElementById(`${e.target.className.split(" ")[0]}`);
    section.scrollIntoView({
        behavior: "smooth",
        block: 'center'
    })
    // Remove class "active" from links
    navLinks.forEach(link => {
        link.classList.remove('active')
    })
    // Add class "active" to the clicked link
    e.target.classList.add('active')
}

// Generate a new section 
function generateٍSection() {
    let sectionEl = document.createElement('section');
    let sectionNo = sectionsLength + 1;
    let sectionLink = document.createElement('li');
    let headingValue = sectionHeadingInput.value || `Section ${sectionNo}`,
        paragraphOneValue = paragraphOneInput.value || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.',
        paragraphTwoValue = paragraphTwoInput.value || 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.',
        linkTitleValue = linkTitleInput.value || `Section ${sectionNo}`;

    let sectionContent = `
        <div class="landing__container">
            <h2>${headingValue} </h2>
            <p>${paragraphOneValue}</p>
            <p>${paragraphTwoValue}</p>
        </div>
    `;

    sectionLink.innerHTML = `<a href="#" class="section${sectionNo} menu__link">${linkTitleValue}</a>`;
    navbarList.appendChild(sectionLink);

    sectionEl.id = `section${sectionNo}`;
    sectionEl.dataset.nav = `Section ${sectionNo}`;
    sectionEl.innerHTML = sectionContent;
    mainPage.appendChild(sectionEl);
    sections = document.querySelectorAll('[data-nav]');
    sectionsLength = sections.length;
    navLinks = document.querySelectorAll('#navbar__list a');
    navLinks.forEach(link => link.addEventListener('click', scrollToSection));
}

// Show the scroll to top button when the user scrolls down 400px from the top of the page
function showScrollBtn() {
    if (document.body.scrollTop > 400) {
        scrollTopBtn.classList.add('show-btn')
    } else scrollTopBtn.classList.remove('show-btn')
}

/** End Main Functions **/

/** Begin Events **/
window.onscroll = function () {
    isVisibleInViewport();
    showScrollBtn();
}

// Scroll to section on link click
navLinks.forEach(link => link.addEventListener('click', scrollToSection))

// Generate a new section when button clicked
generateSectionBtn.addEventListener('click', generateٍSection);

// When the scroll to top button clicked scroll to the top of the page
scrollTopBtn.addEventListener('click', () => window.scrollTo(0, 0));

/** End Events **/