document.addEventListener("DOMContentLoaded", function () {
    fetch('/Shelter/GetShelters')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('shelter-list');
            container.innerHTML = ''; // Clear placeholder content

            if (data.length === 0) {
                container.innerHTML = "<p class='text-center'>Nenhum abrigo encontrado.</p>";
                return;
            }

            data.forEach(shelter => {
                // Correctly reference the property names from the API response
                const logoSrc = shelter.logoBase64
                    ? `data:image/png;base64,${shelter.logoBase64}`
                    : 'img/default-logo.png';  // Fallback image if no logo

                const name = shelter.shelterName && shelter.shelterName.trim() !== ''
                    ? shelter.shelterName
                    : 'Nome não disponível';

                const description = shelter.shelterDescription && shelter.shelterDescription.trim() !== ''
                    ? shelter.shelterDescription
                    : 'Descrição não disponível';

                // Link to shelter details using IDShelter
                const link = `<a href="/Shelter/Details/${shelter.idShelter}" target="_blank">Ver Página &gt;</a>`;

                const shelterCard = `
                    <div class="col-md-6 mix abrigos">
                        <div class="d-flex align-items-center shadow border-0 p-3">
                            <img src="${logoSrc}" 
                                 alt="${name}" 
                                 class="img-fluid me-3" 
                                 style="max-width: 80px;">
                            <div>
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${description}</p>
                                ${link}
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += shelterCard;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os abrigos:', error);
            document.getElementById('shelter-list').innerHTML = "<p class='text-center'>Erro ao carregar os dados dos parceiros.</p>";
        });
});