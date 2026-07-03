const api = fetch("https://profil-pwa-backend-production.up.railway.app/api/artikel")
.then(res => res.json())
.then(data => {

    console.log(data);

});
/*
======================
MODAL
======================
*/
function toggleModal(){

    const modal =
    document.getElementById("formModal");

    modal.classList.toggle("show");

}

/*
======================
TAMPILKAN ARTIKEL
======================
*/
async function tampilkanArtikel(){

    const response = await fetch(api);

    if (!response.ok) {
        throw new Error("Gagal mengambil data artikel");
    }

    const articles = await response.json();

    const articleList =
    document.getElementById("article-list");

    articleList.innerHTML = "";

    if (!Array.isArray(articles)) {
        console.error("Data bukan array:", articles);
        return;
    }

    articles.forEach((article, index) => {

        articleList.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${article.judul}</td>

            <td>${article.kategori}</td>

            <td>${article.penulis}</td>

            <td>

                <button
                class="btn-edit"
                onclick="
                    editArtikel(
                        ${article.id},
                        '${article.judul}',
                        '${article.kategori}',
                        '${article.penulis}',
                        '${article.isi}'
                    )
                ">

                    Edit

                </button>

                <button
                class="btn-delete"
                onclick="
                    hapusArtikel(${article.id})
                ">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

}

tampilkanArtikel();

/*
======================
SIMPAN DATA
======================
*/
const form =
document.getElementById("cmsForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const judul =
    document.getElementById("judul").value;

    const kategori =
    document.getElementById("kategori").value;

    const penulis =
    document.getElementById("penulis").value;

    const isi =
    document.getElementById("isi").value;

    const editIndex =
    document.getElementById("editIndex").value;

    const artikel = {

        judul,
        kategori,
        penulis,
        isi

    };

    /*
    ======================
    TAMBAH DATA
    ======================
    */
    if(editIndex == ""){

        await fetch(api, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(artikel)

        });

    }

    /*
    ======================
    UPDATE DATA
    ======================
    */
    else{

        await fetch(`${api}/${editIndex}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(artikel)

        });

    }

    tampilkanArtikel();

    form.reset();

    document.getElementById("editIndex").value = "";

    toggleModal();

});

/*
======================
EDIT DATA
======================
*/
function editArtikel(
    id,
    judul,
    kategori,
    penulis,
    isi
){

    document.getElementById("judul").value =
    judul;

    document.getElementById("kategori").value =
    kategori;

    document.getElementById("penulis").value =
    penulis;

    document.getElementById("isi").value =
    isi;

    document.getElementById("editIndex").value =
    id;

    toggleModal();

}

/*
======================
HAPUS DATA
======================
*/
async function hapusArtikel(id){

    const yakin =
    confirm("Yakin ingin menghapus artikel?");

    if(yakin){

        await fetch(`${api}/${id}`, {

            method: "DELETE"

        });

        tampilkanArtikel();

    }

}

/*
======================
LOGOUT
======================
*/
const logoutBtn = document.querySelector(".btn-logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("isLogin");

        alert("Anda telah logout.");

        window.location.href = "login.html";

    });

}

/*
======================
SIDEBAR MENU
======================
*/
function showContent(menu){

    document.getElementById("content-page")
    .style.display = "none";

    document.getElementById("users-page")
    .style.display = "none";

    document.getElementById("categories-page")
    .style.display = "none";

    if(menu === "content"){

        document.getElementById("content-page")
        .style.display = "block";

    }

    if(menu === "users"){

        document.getElementById("users-page")
        .style.display = "block";

    }

    if(menu === "categories"){

        document.getElementById("categories-page")
        .style.display = "block";

    }

}

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('service-worker.js')
    .then(async (registration) => {

        console.log("Service Worker berhasil didaftarkan");

        const permission = await Notification.requestPermission();

        if (permission === "granted") {

            navigator.serviceWorker.ready.then((reg) => {

                if (reg.active) {

                    reg.active.postMessage("show-notification");

                }

            });

        }

    });

}