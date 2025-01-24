
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

// Updated PDF generation code with reduced font size and improved spacing
function generateLostFormPDF() {
    const { jsPDF } = window.jspdf; // Ensure jsPDF is loaded
    if (!jsPDF) {
        console.error("jsPDF not loaded");
        return;
    }

    // Form field mappings
    const fields = {
        petName: "lostPetName",
        petSize: "lostPetSize",
        petAge: "lostPetAge",
        petBreed: "lostPetBreed",
        lastSeen: "lostLastSeen",
        lostDate: "lostDate",
        description: "lostDescription",
        email: "emailInput",
        phone: "telefone",
    };

    // Get field values with default fallback
    const formData = Object.entries(fields).reduce((acc, [key, id]) => {
        acc[key] = document.getElementById(id)?.value || "N/A";
        return acc;
    }, {});

    // Handle the image
    const photoInput = document.getElementById("lostPhoto");
    const photoFile = photoInput?.files?.[0];

    // Create a new PDF instance
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Add Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Animal Desaparecido", 105, 15, { align: "center" });

    // Add Pet Name
    pdf.setFontSize(20);
    pdf.text(formData.petName, 105, 30, { align: "center" });

    // Load and add the image if provided
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addImageToPDF(e.target.result, pdf, formData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        addTextContentToPDF(pdf, formData, 40); // Start text below title if no image
        pdf.save(`${formData.petName}_Animal_Desaparecido.pdf`);
    }
}

function addImageToPDF(imgData, pdf, formData) {
    const imgFormat = imgData.includes("image/png") ? "PNG" : "JPEG";
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions to fit within the page
    const maxImgWidth = pageWidth - 40; // 20mm margin on each side
    const maxImgHeight = pageHeight / 3; // Use up to 1/3 of the page height

    const img = new Image();
    img.src = imgData;
    img.onload = function () {
        const imgRatio = img.width / img.height;
        const fitWidth = maxImgWidth;
        const fitHeight = fitWidth / imgRatio;

        const imgWidth = fitHeight > maxImgHeight ? maxImgHeight * imgRatio : fitWidth;
        const imgHeight = fitHeight > maxImgHeight ? maxImgHeight : fitHeight;

        const x = (pageWidth - imgWidth) / 2;
        const y = 35;

        pdf.addImage(imgData, imgFormat, x, y, imgWidth, imgHeight);

        // Start text below image
        addTextContentToPDF(pdf, formData, y + imgHeight + 10);
        pdf.save(`${formData.petName}_Animal_Desaparecido.pdf`);
    };
}

function addTextContentToPDF(pdf, formData, startY) {
    const lineHeight = 6;
    const labelWidth = 45; // Adjust label spacing
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginLeft = 15;

    // Helper function to add text dynamically
    function addText(label, value, y) {
        if (y > pageHeight - 20) {
            pdf.addPage();
            y = 20;
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(`${label}:`, marginLeft, y);
        pdf.setFont("helvetica", "normal");

        const wrappedText = pdf.splitTextToSize(value, pdf.internal.pageSize.getWidth() - marginLeft - labelWidth);
        pdf.text(wrappedText, marginLeft + labelWidth, y);

        return y + (wrappedText.length * lineHeight);
    }

    // Add all form fields
    startY = addText("Tamanho", formData.petSize, startY);
    startY = addText("Idade", formData.petAge, startY);
    startY = addText("Raça", formData.petBreed, startY);
    startY = addText("Última Localização Vista", formData.lastSeen, startY);
    startY = addText("Data do Desaparecimento", formData.lostDate, startY);
    startY = addText("Descrição", formData.description, startY + lineHeight);

    // Add contact details
    startY = addText("Email", formData.email, startY + lineHeight);
    startY = addText("Telefone", formData.phone, startY);
}
/* -------------------

    Search Bar

--------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const searchOverlay = document.querySelector(".search-model");
    const searchCloseSwitch = document.querySelector(".search-close-switch");
    const searchInput = document.querySelector("#search-input");

    // Open the search modal
    const openSearchOverlay = () => {
        if (searchOverlay) {
            searchOverlay.classList.add("active");
            searchInput.focus();
        }
    };

    // Close the search modal
    const closeSearchOverlay = () => {
        if (searchOverlay) {
            searchOverlay.classList.remove("active");
        }
    };

    // Submit search query
    const searchForm = document.querySelector(".search-model-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `/Search?query=${encodeURIComponent(query)}`;
            }
        });
    }

    // Attach event listeners
    document.querySelector(".search-switch")?.addEventListener("click", openSearchOverlay);
    searchCloseSwitch?.addEventListener("click", closeSearchOverlay);

    // Close modal on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearchOverlay();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input-bar");

    // Adicionar evento de clique ao botão de pesquisa
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim(); // Captura o valor da barra de pesquisa
        if (query) {
            // Redirecionar para a página de resultados com a query
            window.location.href = `/Search?query=${encodeURIComponent(query)}`;
        } else {
            alert("Por favor, insira um termo para pesquisa!");
        }
    });

    // Também permite que a pesquisa seja enviada ao pressionar Enter
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `/Search?query=${encodeURIComponent(query)}`;
            } else {
                alert("Por favor, insira um termo para pesquisa!");
            }
        }
    });
});



/* -------------------

    Filters

--------------------- */

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const clearFiltersButton = document.getElementById("clear-filters");
    const products = document.querySelectorAll(".product-item");

    // Função para determinar se a idade está dentro de um intervalo
    const isAgeInRange = (age, range) => {
        if (range === "0-2") return age >= 0 && age <= 2;
        if (range === "2-7") return age > 2 && age <= 7;
        if (range === "7+") return age > 7;
        return false;
    };

    // Atualizar os filtros
    const updateFilters = () => {
        const activeFilters = {
            age: [],
            breed: [],
            size: []
        };

        // Armazenar os filtros ativos
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const type = checkbox.dataset.type.toLowerCase(); // Garantir que o tipo está em minúsculas
                activeFilters[type].push(checkbox.value.toLowerCase()); // Garantir que o valor está em minúsculas
            }
        });

        // Atualizar a visibilidade dos produtos
        products.forEach((product) => {
            let isVisible = true;

            const productAge = parseInt(product.dataset.age, 10);
            const productBreed = product.dataset.breed?.toLowerCase(); // Garantir que o valor está em minúsculas
            const productSize = product.dataset.size?.toLowerCase(); // Garantir que o valor está em minúsculas

            // Verificar filtro de idade
            if (activeFilters.age.length > 0) {
                const matchesAge = activeFilters.age.some((range) => isAgeInRange(productAge, range));
                if (!matchesAge) isVisible = false;
            }

            // Verificar filtro de raça
            if (activeFilters.breed.length > 0) {
                if (!activeFilters.breed.includes(productBreed)) isVisible = false;
            }

            // Verificar filtro de porte
            if (activeFilters.size.length > 0) {
                if (!activeFilters.size.includes(productSize)) isVisible = false;
            }

            // Aplicar a visibilidade ao produto
            product.style.display = isVisible ? "block" : "none";
        });
    };

    // Limpar filtros
    clearFiltersButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        updateFilters();
    });

    // Evento para atualizar filtros ao alterar checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateFilters);
    });
});

