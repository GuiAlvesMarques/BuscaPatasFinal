
'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Product filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.property__gallery').length > 0) {
            var containerEl = document.querySelector('.property__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });


    /*--------------------------
        Product Details Slider
    ----------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).on('changed.owl.carousel', function (event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs(num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if (e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }


    /*------------------
        Magnific
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });


    $(".nice-scroll").niceScroll({
        cursorborder: "",
        cursorcolor: "#dddddd",
        boxzoom: false,
        cursorwidth: 5,
        background: 'rgba(0, 0, 0, 0.2)',
        cursorborderradius: 50,
        horizrailenabled: false
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

    $("#countdown-time").countdown(timerdate, function (event) {
        $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Day</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hour</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
    });

    /*-------------------
        Range Slider
    --------------------- */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*------------------
        Single Product
    --------------------*/
    $('.product__thumb .pt').on('click', function () {
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__big__img').attr('src');
        if (imgurl != bigImg) {
            $('.product__big__img').attr({ src: imgurl });
        }
    });

    /*-------------------
        Quantity change
    --------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*-------------------
        Radio Btn
    --------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

})(jQuery);

/*--------------------------
        Login Register Slider
    ----------------------------*/
    document.getElementById('switchToRegister').addEventListener('click', function (e) {
        e.preventDefault();
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm && registerForm) {
            loginForm.classList.add('d-none');
            registerForm.classList.remove('d-none');
        }
    });

    document.getElementById('switchToLogin').addEventListener('click', function (e) {
        e.preventDefault();
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm && registerForm) {
            registerForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
        }
    });


/*-------------------
        Donation Btn
    --------------------- */
// Select all donation buttons and the custom amount input
const buttons = document.querySelectorAll('.donation-buttons .donation-btn');
const customAmountInput = document.getElementById('customAmount');

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add the 'active' class to the clicked button
        button.classList.add('active');
        // Update the custom amount input with the button's value
        const value = button.textContent.replace('€', '').replace('.', '').trim(); // Remove '€' and dots, trim whitespace
        customAmountInput.value = parseInt(value, 10); // Convert to number and set as input value
    });
});

/*-------------------
        Filtering Logic
    --------------------- */

function applyFilters() {
    const type = document.getElementById('animalTypeFilter').value.toLowerCase();
    const sex = document.getElementById('sexFilter').value.toLowerCase();
    const age = document.getElementById('ageFilter').value.toLowerCase();
    const size = document.getElementById('sizeFilter').value.toLowerCase();
    const breed = document.getElementById('breedFilter').value.toLowerCase();
    const location = document.getElementById('locationFilter').value.toLowerCase();

    const animalItems = document.querySelectorAll('.animal-item');

    animalItems.forEach((item) => {
        const itemType = item.getAttribute('data-type').toLowerCase();
        const itemSex = item.getAttribute('data-sex').toLowerCase();
        const itemAge = item.getAttribute('data-age').toLowerCase();
        const itemSize = item.getAttribute('data-size').toLowerCase();
        const itemBreed = item.getAttribute('data-breed').toLowerCase();
        const itemLocation = item.getAttribute('data-location').toLowerCase();

        const matchesType = !type || itemType === type;
        const matchesSex = !sex || itemSex === sex;
        const matchesAge = !age || itemAge === age;
        const matchesSize = !size || itemSize === size;
        const matchesBreed = !breed || itemBreed.includes(breed);
        const matchesLocation = !location || itemLocation.includes(location);

        if (matchesType && matchesSex && matchesAge && matchesSize && matchesBreed && matchesLocation) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/*-------------------
    Merch Filtering Logic
---------------------*/

document.addEventListener('DOMContentLoaded', () => {
    // Select all filter triggers, product items, and filter checkboxes
    const filterTriggers = document.querySelectorAll('.collapse-trigger');
    const productItems = document.querySelectorAll('.product-item');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

    // Function to clear checkboxes of other groups
    const clearOtherGroups = (currentGroup) => {
        filterCheckboxes.forEach((checkbox) => {
            const checkboxGroup = checkbox.getAttribute('data-type');
            if (checkboxGroup !== currentGroup) {
                checkbox.checked = false; // Deselect checkboxes not in the current group
            }
        });
    };

    // Function to filter items based on the selected group
    const filterByGroup = (groupType) => {
        // Clear other groups' selections
        clearOtherGroups(groupType);

        // Loop through all items and toggle visibility
        productItems.forEach((item) => {
            const hasGroupData = item.getAttribute(`data-${groupType}`);
            if (hasGroupData) {
                item.style.display = 'block'; // Show items matching the group
            } else {
                item.style.display = 'none'; // Hide items not matching the group
            }
        });
    };

    // Event listener for filter group triggers
    filterTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default behavior
            const targetGroup = trigger.getAttribute('aria-controls').replace('collapse', '').toLowerCase();

            // Filter by the selected group
            filterByGroup(targetGroup);
        });
    });
});



/* -------------------

    PDF Generation

--------------------- */

function generateLostFormPDF() {
    const { jsPDF } = window.jspdf; // Certifique-se de que jsPDF está carregado
    if (!jsPDF) {
        console.error("jsPDF não está carregado");
        return;
    }

    // Captura os valores do formulário
    const petType = document.getElementById("lostPetType")?.value || "N/A";
    const petSize = document.getElementById("lostPetSize")?.value || "N/A";
    const petName = document.getElementById("lostPetName")?.value || "N/A";
    const petAge = document.getElementById("lostPetAge")?.value || "N/A";
    const petBreed = document.getElementById("lostPetBreed")?.value || "N/A";
    const lastSeen = document.getElementById("lostLastSeen")?.value || "N/A";
    const lostDate = document.getElementById("lostDate")?.value || "N/A";
    const description = document.getElementById("lostDescription")?.value || "N/A";
    const email = document.getElementById("email")?.value || "N/A";
    const phone = document.getElementById("telefone")?.value || "N/A";

    // Manipula a imagem carregada
    const photoInput = document.getElementById("lostPhoto");
    const photoFile = photoInput.files[0];

    // Cria um novo PDF
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Título
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Animal Desaparecido", 105, 20, { align: "center" });

    // Processa a imagem, se fornecida
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;
            const imgFormat = photoFile.type === "image/png" ? "PNG" : "JPEG"; // Detecta o formato da imagem

            // Adiciona a imagem dinamicamente, ajustando o tamanho
            const imgWidth = 150;
            const imgHeight = 90;
            pdf.addImage(imgData, imgFormat, 30, 30, imgWidth, imgHeight);

            // Adiciona os detalhes do animal
            addPetDetails(pdf, 130); // Ajusta a posição inicial com base na imagem
            pdf.save(`${petName}_Animal_Desaparecido.pdf`);
        };
        reader.readAsDataURL(photoFile); // Converte a imagem para Base64
    } else {
        // Caso não tenha imagem, continua com os detalhes
        addPetDetails(pdf, 40); // Inicia os detalhes mais abaixo sem imagem
        pdf.save("Animal_Desaparecido.pdf");
    }
}

// Função para adicionar os detalhes ao PDF
function addPetDetails(pdf, startY) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    pdf.text(`Nome: ${document.getElementById("lostPetName")?.value || "N/A"}`, 20, startY);
    pdf.text(`Tipo: ${document.getElementById("lostPetType")?.value || "N/A"}`, 20, startY + 10);
    pdf.text(`Tamanho: ${document.getElementById("lostPetSize")?.value || "N/A"}`, 20, startY + 20);
    pdf.text(`Idade: ${document.getElementById("lostPetAge")?.value || "N/A"}`, 20, startY + 30);
    pdf.text(`Raça: ${document.getElementById("lostPetBreed")?.value || "N/A"}`, 20, startY + 40);
    pdf.text(`Última Localização Vista: ${document.getElementById("lostLastSeen")?.value || "N/A"}`, 20, startY + 50);
    pdf.text(`Data do Desaparecimento: ${document.getElementById("lostDate")?.value || "N/A"}`, 20, startY + 60);
    pdf.text(`Descrição:`, 20, startY + 70);
    pdf.text(document.getElementById("lostDescription")?.value || "N/A", 20, startY + 80, { maxWidth: 170 });

    pdf.setFont("helvetica", "bold");
    pdf.text(`Informação de Contacto:`, 20, startY + 100);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Email: ${document.getElementById("email")?.value || "N/A"}`, 20, startY + 110);
    pdf.text(`Telefone: ${document.getElementById("telefone")?.value || "N/A"}`, 20, startY + 120);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchOverlay = document.querySelector(".search-model");
    const searchCloseSwitch = document.querySelector(".search-close-switch");
    const searchInput = document.querySelector("#search-input");
    const searchForm = document.querySelector(".search-model-form");

    // Open the search overlay
    const openSearchOverlay = () => {
        if (searchOverlay) {
            searchOverlay.classList.add("active");
            searchInput.focus(); // Automatically focus the input
        }
    };

    // Close the search overlay
    const closeSearchOverlay = () => {
        if (searchOverlay) {
            searchOverlay.classList.remove("active");
        }
    };

    // Listen for Enter key or form submission
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search-result.html?query=${encodeURIComponent(query)}`;
            }
        });
    }

    // Close the search overlay when the close button is clicked
    if (searchCloseSwitch) {
        searchCloseSwitch.addEventListener("click", closeSearchOverlay);
    }

    // Open the search overlay when the search icon is clicked
    document.querySelector(".search-switch")?.addEventListener("click", openSearchOverlay);

    // Close the overlay when the user presses the Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchOverlay();
        }
    });

    // Handle setting the placeholder on the search-result page #search-input-bar
    const searchInputBar = document.querySelector("#search-input-bar");
    if (searchInputBar) {
        const query = new URLSearchParams(window.location.search).get(query);
        if (query) {
            searchInputBar.value = query;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const clearFiltersButton = document.getElementById("clear-filters");
    const products = document.querySelectorAll(".product-item");

    // Atualizar os filtros
    const updateFilters = () => {
        const activeFilters = {};

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const type = checkbox.dataset.type;
                if (!activeFilters[type]) activeFilters[type] = [];
                activeFilters[type].push(checkbox.value);
            }
        });

        products.forEach((product) => {
            let isVisible = true;

            for (const [type, values] of Object.entries(activeFilters)) {
                const productValue = product.dataset[type];
                if (!values.includes(productValue)) {
                    isVisible = false;
                    break;
                }
            }

            product.style.display = isVisible ? "block" : "none";
        });
    };

    // Listener para os checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateFilters);
    });

    // Limpar filtros
    clearFiltersButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        updateFilters();
    });

    updateFilters();
});

document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.querySelector(".like-button");

    likeButton.addEventListener("click", function (e) {
        e.preventDefault();
        likeButton.classList.toggle("liked");
    });
});

