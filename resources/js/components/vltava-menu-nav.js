let tabsParent = document.querySelector("#sidebar-tabs");
tabsParent.addEventListener('click', (event) => {
    let tabs = document.querySelectorAll(".sidebar__tab");
    tabs.forEach((tab) => {
        tab.classList.remove("sidebar__tab--active");
    });
    let tabContents = document.querySelectorAll(".sidebar__list");
    tabContents.forEach((tabContent) => {
        tabContent.classList.remove("sidebar__list--active");
    })
    let tag = event.target.dataset.tab;
    event.target.classList.toggle("sidebar__tab--active");
    document.querySelector("#" + tag).classList.toggle("sidebar__list--active");
})
