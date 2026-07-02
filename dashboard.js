/* =========================
UCAPAN SESUAI JAM
========================= */

const greeting =
document.getElementById(
"greeting"
);

const hour =
new Date().getHours();

if(hour >= 4 && hour < 11){

greeting.innerHTML =
"🌅 Selamat Pagi";

}

else if(hour >= 11 && hour < 15){

greeting.innerHTML =
"☀️ Selamat Siang";

}

else if(hour >= 15 && hour < 18){

greeting.innerHTML =
"🌇 Selamat Sore";

}

else{

greeting.innerHTML =
"🌙 Selamat Malam";

}

/* =========================
SCROLL MENU
========================= */

function scrollToSection(id){

    const section =
    document.getElementById(id);

    section.scrollIntoView({

        behavior: "smooth"

    });

}

/* =========================
MAP
========================= */

const map =
L.map('map').setView(
[-7.7233, 109.0090],
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
[-7.7233, 109.0090]
).addTo(map)

.bindPopup(
'Cilacap'
)

.openPopup();


/* =========================
DARK MODE
========================= */

const darkBtn =
document.getElementById(
"darkModeBtn"
);

darkBtn.addEventListener(
"click",
() => {

document.body.classList.toggle(
"dark"
);

/* SIMPAN MODE */
if(
document.body.classList.contains(
"dark"
)
){

localStorage.setItem(
"theme",
"dark"
);

darkBtn.innerHTML =
"☀️ Light Mode";

}else{

localStorage.setItem(
"theme",
"light"
);

darkBtn.innerHTML =
"🌙 Dark Mode";

}

}
);

/* CEK THEME SAAT REFRESH */
if(
localStorage.getItem(
"theme"
) === "dark"
){

document.body.classList.add(
"dark"
);

darkBtn.innerHTML =
"☀️ Light Mode";

}

/* =========================
GO TO CMS
========================= */

function goToCMS(){

window.location.href =
"cms.html";

}


/* =========================
AMBIL ARTIKEL CMS
========================= */

const api =
"http://localhost:3000/artikel";

async function tampilkanArtikelCMS(){

try{

const response =
await fetch(api);

const articles =
await response.json();

const container =
document.getElementById(
"cmsArtikelContainer"
);

container.innerHTML = "";

articles.forEach((article) => {

container.innerHTML += `

<div class="cms-card">

<h3>
${article.judul}
</h3>

<p>
${article.isi}
</p>

<span>
${article.kategori}
- ${article.penulis}
</span>

</div>

`;

});

}catch(error){

console.log(error);

}

}

tampilkanArtikelCMS();


const profileImg =
document.querySelector(".profile img");

profileImg.addEventListener("click",()=>{

profileImg.classList.toggle("active-img");

});