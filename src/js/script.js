let swithes = document.querySelectorAll(".switch");
let lists = document.querySelectorAll(".template-item");

swithes.forEach((item) => {
    item.addEventListener("click", () => {
        for (let value of swithes) {
            value.classList.remove("switch-active");
        }
        item.classList.add("switch-active");
        let keySwitch = item.getAttribute("data-set");
        if (keySwitch == "all") {
            for (let value of lists) {
                value.classList.add("template-item-active");
            }
        } else {
            for (let value of lists) {
                value.classList.remove("template-item-active");
                if (value.getAttribute("data-set") == keySwitch) {
                    value.classList.add("template-item-active");
                }
            }
        }
    });
});

let otherManWrap = document.querySelector(".other-man");

fetch('../../src/js/file.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let people = "";
        for (let value of data) {
            people += `<div class="card-man" data-set="${value.name}">
                        <img src="${value.img}" alt="1">
                        <p class="card-man-name">
                            ${value.name}
                        </p>
                    </div>`;
        }
        otherManWrap.innerHTML = people;

        let cardmen = document.querySelectorAll(".card-man");
        for (let value of cardmen) {
            value.addEventListener("mouseenter", function () {
                this.children[1].style.opacity = 1;
            });
        }
        for (let value of cardmen) {
            value.addEventListener("mouseleave", function () {
                this.children[1].style.opacity = 0;
            });
        }

        let chosenPalName = document.querySelector(".chosen-pal-name");
        let chosenPal = document.querySelector(".chosen-pal");
        let chosenPalAchivment = document.querySelector(".chosen-pal-achivment");

        for (let value of cardmen) {
            value.addEventListener("click", function () {
                let key = this.getAttribute("data-set");
                fetch('../../src/js/file.json')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        for (let value of data) {
                            if (value.name == key) {
                                chosenPalName.textContent = value.name;
                                chosenPal.innerHTML = `<img src="${value.img}" alt="${value.name}">`;
                                chosenPalAchivment.innerHTML = value.info;
                            }
                        }
                    });
            });
        }
    });

