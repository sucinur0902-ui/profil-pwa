const articleList = document.getElementById("article-list");

const articles = [
    {
        judul: "Belajar Progressive Web App",
        kategori: "Web Programming",
        penulis: "Suci Nur Khayani"
    },

    {
        judul: "Deploy Website Dengan Vercel",
        kategori: "Tutorial PHP",
        penulis: "Suci Nur Khayani"
    },

    {
        judul: "Integrasi CMS Modern",
        kategori: "Tutorial Java",
        penulis: "Suci Nur Khayani"
    }
];

function loadArticles() {

    articleList.innerHTML = "";

    articles.forEach((artikel, index) => {

        articleList.innerHTML += `
        
        <tr>
            <td>${index + 1}</td>
            <td>${artikel.judul}</td>
            <td>${artikel.kategori}</td>
            <td>${artikel.penulis}</td>

            <td>
                <button>Edit</button>
                <button>Hapus</button>
            </td>
        </tr>

        `;
    });

}

loadArticles();

/* =========================
SIDEBAR MENU
========================= */

function showContent(menu){

    document.getElementById("content-page").style.display = "none";
    document.getElementById("users-page").style.display = "none";
    document.getElementById("categories-page").style.display = "none";

    document.getElementById(menu + "-page").style.display = "block";

}

/* =========================
MODAL
========================= */

function toggleModal(){

    const modal =
    document.getElementById("formModal");

    if(modal.style.display === "flex"){

        modal.style.display = "none";

    } else {

        modal.style.display = "flex";

    }

}