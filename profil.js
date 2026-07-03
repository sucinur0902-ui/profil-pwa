// ======================
// GREETING
// ======================

const greeting = document.createElement("p");

greeting.classList.add("greeting");

const hour = new Date().getHours();

if(hour < 12){

    greeting.textContent =
    "Selamat pagi 👋";

}else if(hour < 18){

    greeting.textContent =
    "Selamat siang ☀️";

}else{

    greeting.textContent =
    "Selamat malam 🌙";

}

document.querySelector(".container")
.prepend(greeting);



// ======================
// HITUNG UMUR
// ======================

const bio =
document.querySelector(".card.center p");

const birthYear = 2005;

const currentYear =
new Date().getFullYear();

const age = currentYear - birthYear;

bio.innerHTML +=
`<br><strong>Umur: ${age} tahun</strong>`;



// ======================
// DARK MODE
// ======================

const btn = document.createElement("button");

btn.textContent = "🌙 Dark Mode";

document.querySelector(".nav-right")
.appendChild(btn);

btn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        btn.textContent =
        "☀️ Light Mode";

    }else{

        btn.textContent =
        "🌙 Dark Mode";

    }

});



// ======================
// VALIDASI FORM
// ======================

const form =
document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const inputs =
    form.querySelectorAll("input, textarea");

    let valid = true;

    inputs.forEach(input => {

        if(input.value.trim() === ""){

            input.style.border =
            "2px solid red";

            valid = false;

        }else{

            input.style.border =
            "1px solid #ccc";

        }

    });

    if(valid){

        alert("✅ Form berhasil dikirim!");

        form.reset();

    }else{

        alert("❌ Harap isi semua field!");

    }

});



// ======================
// HOVER FOTO
// ======================

const img =
document.querySelector("img");

img.addEventListener("mouseover", () => {

    img.style.transform =
    "scale(1.1)";

});

img.addEventListener("mouseout", () => {

    img.style.transform =
    "scale(1)";

});



// ======================
// ARTIKEL DARI DATABASE
// ======================

async function tampilkanArtikel(){

    const artikelContainer =
    document.getElementById("artikel-container");

    try{

        const response =
        await fetch("http://localhost:3000/api/artikel");

        const articles =
        await response.json();

        artikelContainer.innerHTML = "";

        if(articles.length > 0){

            articles.forEach(article => {

                artikelContainer.innerHTML += `

                <div class="artikel-card">

                    <h2>${article.judul}</h2>

                    <p>
                    <strong>Kategori:</strong>
                    ${article.kategori}
                    </p>

                    <p>
                    <strong>Penulis:</strong>
                    ${article.penulis}
                    </p>

                    <p>
                    ${article.isi}
                    </p>

                    <hr>

                </div>

                `;

            });

        }else{

            artikelContainer.innerHTML =
            "<p>Belum ada artikel.</p>";

        }

    }catch(error){

        console.log(error);

        artikelContainer.innerHTML =
        "<p>Gagal mengambil artikel.</p>";

    }

}

tampilkanArtikel();



// ======================
// MAP LOCATION
// ======================

// Koordinat Cilacap
const map = L.map('map').setView(
[-7.7239, 109.0089],
13
);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:
    '&copy; OpenStreetMap'
}
).addTo(map);

L.marker(
[-7.7239, 109.0089]
).addTo(map)

.bindPopup(
"Suci Nur Khayani - Cilacap"
)

.openPopup();