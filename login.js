/* =========================
LOGIN CMS
========================= */

const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document
            .getElementById("username")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value
            .trim();

        // Validasi kolom kosong
        if (username === "" || password === "") {

            alert("Username dan Password tidak boleh kosong!");

            return;

        }

        // Login
        if (username === "suci" && password === "090225") {

            localStorage.setItem("isLogin", "true");

            alert("Login berhasil!");

            window.location.href = "cms.html";

        } else {

            alert("Username atau Password salah!");

        }

    });

}