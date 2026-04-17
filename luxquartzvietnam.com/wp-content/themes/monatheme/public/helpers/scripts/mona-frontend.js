import MonaCreateModuleDefault from "./modules/default.js";
import Account from "./modules/account.js";

/****************************/

MonaCreateModuleDefault();
Account();

jQuery(document).ready(function($) {
    var count = parseInt(localStorage.getItem("count")) || 0;

    $(".js-btn-like").on("click", function() {
        var inputElement = document.getElementById("cat_title");
        var currentDate = document.getElementById("date");
        var inputSlug = document.getElementById("cat_slug");
        var inputValue = inputElement.value;
        var date = currentDate.value;
        var itemSlug = inputSlug.value;

        var $visuaBg0 = $(".background-main").clone().html().replace("webp.luxquartzvietnam.com", "luxquartzvietnam.com/wp-content/uploads");
        var $visuaBg1 = $(".visua--1 .is-active").clone().html().replace("webp.luxquartzvietnam.com", "luxquartzvietnam.com/wp-content/uploads");
        var $visuaBg2 = $(".visua--2 .is-active").clone().html().replace("webp.luxquartzvietnam.com", "luxquartzvietnam.com/wp-content/uploads");
        var $visuaBg3 = $(".visua--3 .is-active").clone().html().replace("webp.luxquartzvietnam.com", "luxquartzvietnam.com/wp-content/uploads");
        var $visuaBg4 = $(".visua--4 .is-active").clone().html().replace("webp.luxquartzvietnam.com", "luxquartzvietnam.com/wp-content/uploads");

        // ===========================
        var uniqueId = "like-item-" + new Date().getTime();
        var IdItem = new Date().getTime();

        $("#another-location").prepend(
            '<li id="' +
            IdItem +
            '" class="like-item ' +
            itemSlug +
            '"><div class="like-heading"><h3 class="like-title">' +
            inputValue +
            " - " +
            date +
            '</h3><div class="like-heading_action"><div class="icon-download button-mobile"><button class="btn btn--thi btn-mobile"><img src="https://luxquartzvietnam.com/template/assets/images/3D/ico_download.svg" alt="" title="" loading="lazy" data-src=""></button></div><span class="icon-delete js-delete"><img src="https://luxquartzvietnam.com/template/assets/images/3D/ico_delete.svg" alt="" title="" loading="lazy" data-src=""></span></div></div><a href="#ex' +
            IdItem +
            '" rel="modal:open" class="like-img" id="' +
            uniqueId +
            '">' +
            '<span class="list-item-image"> ' +
            $visuaBg0 +
            "</span> " +
            '<span class="list-item-image1"> ' +
            $visuaBg1 +
            "</span> " +
            '<span class="list-item-image2"> ' +
            $visuaBg2 +
            "</span> " +
            '<span class="list-item-image3"> ' +
            $visuaBg3 +
            "</span> " +
            '<span class="list-item-image4"> ' +
            $visuaBg4 +
            "</span> " +
            "</a> " +
            '<div class="modal modal-like ' +
            uniqueId +
            " " +
            itemSlug +
            '" id="ex' +
            IdItem +
            '">' +
            "<div class='modal-like_inner'>" +
            "<div class='image-popup1'>" +
            $visuaBg0 +
            "</div>" +
            "<div class='image-popup2'>" +
            $visuaBg1 +
            "</div>" +
            "<div class='image-popup3'>" +
            $visuaBg2 +
            "</div>" +
            "<div class='image-popup4'>" +
            $visuaBg3 +
            "</div>" +
            "<div class='image-popup5'>" +
            $visuaBg4 +
            "</div>" +
            '<div class="icon-download button-destop"><button class="btn btn--thi"><span class="text">' +
            TransText.download +
            "</span>" +
            "</button></div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>"
        );

        function waitForImageToLoad(imageElement) {
            return new Promise((resolve) => {
                imageElement.onload = resolve;
            });
        }

        function drawImage(key, data, appen) {
            if (key < data.length) {
                var img1 = new Image(2000, 1125);
                img1.crossOrigin = "anonymous";
                img1.src = data[key];
                waitForImageToLoad(img1).then(() => {
                    var canvasWidth = canvas.width;
                    var canvasHeight = canvas.height;

                    // Kích thước của hình ảnh gốc
                    var imgWidth = img1.width;
                    var imgHeight = img1.height;

                    // Tính toán tọa độ x và y để căn giữa hình ảnh
                    var x = (canvasWidth - imgWidth) / 2;
                    var y = (canvasHeight - imgHeight) / 2;

                    // Vẽ hình ảnh lên canvas tại vị trí x, y
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img1, x, y, imgWidth, imgHeight);

                    // Tiếp tục vẽ hình ảnh tiếp theo
                    drawImage(key + 1, data, appen);
                });
            } else {
                try {
                    var finalImage = appen.toDataURL("image/png");
                    var ima = new Image(2000, 1125);
                    ima.src = finalImage;
                    //Tạo một liên kết và thiết lập download và href
                    var link = document.createElement("a");
                    link.download = "screenshot.png";
                    link.href = finalImage;
                    link.click(); // Kích hoạt tải xuống hình ảnh
                } catch (e) {
                    console.error("Không thể export canvas:", e);
                }
            }
        }
        if ($(".button-destop").length) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            $(".button-destop").click(function() {
                let img1 = $(this)
                    .closest(".modal-like_inner")
                    .find(".image-popup1 img")
                    .attr("src");
                let img2 = $(this)
                    .closest(".modal-like_inner")
                    .find(".image-popup2 img")
                    .attr("src");
                let img3 = $(this)
                    .closest(".modal-like_inner")
                    .find(".image-popup3 img")
                    .attr("src");
                let img4 = $(this)
                    .closest(".modal-like_inner")
                    .find(".image-popup4 img")
                    .attr("src");
                let img5 = $(this)
                    .closest(".modal-like_inner")
                    .find(".image-popup5 img")
                    .attr("src");

                var $img2Arr;

                let flag = $(this)
                    .closest("body")
                    .find(".visua-main")
                    .hasClass("visua-bathroom");
                if (flag) {
                    $img2Arr = [img2, img1, img3, img4, img5];
                } else {
                    $img2Arr = [img1, img2, img3, img4, img5];
                }

                canvas.width = 2000;
                canvas.height = 1125;
                drawImage(0, $img2Arr, canvas);
            });
        }

        // Tăng giá trị của count và lưu vào Local Storage
        count++;
        localStorage.setItem("count", count);

        // Lưu dữ liệu vào Local Storage
        var data = {
            inputValue: inputValue,
            itemSlug: itemSlug,
            date: date,
            uniqueId: uniqueId,
            count: count,
            visuaBg: $visuaBg0,
            visuaBg1: $visuaBg1,
            visuaBg2: $visuaBg2,
            visuaBg3: $visuaBg3,
            visuaBg4: $visuaBg4,
        };

        localStorage.setItem("user_data_" + IdItem, JSON.stringify(data));
    });

    // Lấy URL hiện tại của trang
    var currentURL = window.location.href;

    // Lấy dữ liệu từ Local Storage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("user_data_")) {
            var data = JSON.parse(localStorage.getItem(key));

            if (currentURL.includes("/en/")) {
                if (data) {
                    if (data.inputValue === "PHÒNG BẾP") {
                        data.inputValue = "KITCHEN";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                    if (data.inputValue === "PHÒNG TẮM") {
                        data.inputValue = "BATHROOM";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                    if (data.inputValue === "PHÒNG KHÁCH") {
                        data.inputValue = "LIVING ROOM";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                }
            } else {
                if (data) {
                    if (data.inputValue === "KITCHEN") {
                        data.inputValue = "PHÒNG BẾP";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                    if (data.inputValue === "BATHROOM") {
                        data.inputValue = "PHÒNG TẮM";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                    if (data.inputValue === "LIVING ROOM") {
                        data.inputValue = "PHÒNG KHÁCH";
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                }
            }

            if (data) {
                // Hiển thị dữ liệu từ Local Storage
                $("#another-location").prepend(
                    '<li id="' +
                    key.substring(10) +
                    '" class="like-item ' +
                    data.itemSlug +
                    ' "><div class="like-heading"><h3 class="like-title">' +
                    data.inputValue +
                    " - " +
                    data.date +
                    '</h3><div class="like-heading_action"><div class="icon-download button-mobile"><button class="btn btn--thi btn-mobile"><img src="https://luxquartzvietnam.com/template/assets/images/3D/ico_download.svg" alt="" title="" loading="lazy" data-src=""></button></div><span class="icon-delete js-delete"><img src="https://luxquartzvietnam.com/template/assets/images/3D/ico_delete.svg" alt="" title="" loading="lazy" data-src=""></span></div></div><a href="#ex' +
                    data.uniqueId +
                    '" rel="modal:open" class="like-img" id="' +
                    data.uniqueId +
                    '">' +
                    '<span class="list-item-image"> ' +
                    data.visuaBg +
                    "</span> " +
                    '<span class="list-item-image1"> ' +
                    data.visuaBg1 +
                    "</span> " +
                    '<span class="list-item-image2"> ' +
                    data.visuaBg2 +
                    "</span> " +
                    '<span class="list-item-image3"> ' +
                    data.visuaBg3 +
                    "</span> " +
                    '<span class="list-item-image4"> ' +
                    data.visuaBg4 +
                    "</span> " +
                    "</a> " +
                    '<div class="modal modal-like ' +
                    data.uniqueId +
                    " " +
                    data.itemSlug +
                    '" id="ex' +
                    data.uniqueId +
                    '">' +
                    "<div class='modal-like_inner'>" +
                    "<div class='image-popup1'>" +
                    data.visuaBg +
                    "</div>" +
                    "<div class='image-popup2'>" +
                    data.visuaBg1 +
                    "</div>" +
                    "<div class='image-popup3'>" +
                    data.visuaBg2 +
                    "</div>" +
                    "<div class='image-popup4'>" +
                    data.visuaBg3 +
                    "</div>" +
                    "<div class='image-popup5'>" +
                    data.visuaBg4 +
                    "</div>" +
                    '<div class="icon-download button-destop"><button class="btn btn--thi"><span class="text">' +
                    TransText.download +
                    "</span>" +
                    "</button></div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</li>"
                );
                count = data.count;

                function waitForImageToLoad(imageElement) {
                    return new Promise((resolve) => {
                        imageElement.onload = resolve;
                    });
                }

                function drawImage(key, data, appen) {
                    if (key < data.length) {
                        var img1 = new Image(2000, 1125);
                        img1.src = data[key];
                        waitForImageToLoad(img1).then(() => {
                            var canvasWidth = canvas.width;
                            var canvasHeight = canvas.height;

                            // Kích thước của hình ảnh gốc
                            var imgWidth = img1.width;
                            var imgHeight = img1.height;

                            // Tính toán tọa độ x và y để căn giữa hình ảnh
                            var x = (canvasWidth - imgWidth) / 2;
                            var y = (canvasHeight - imgHeight) / 2;

                            // Vẽ hình ảnh lên canvas tại vị trí x, y
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img1, x, y, imgWidth, imgHeight);

                            // Tiếp tục vẽ hình ảnh tiếp theo
                            drawImage(key + 1, data, appen);
                        });
                    } else {
                        var finalImage = appen.toDataURL("image/png");
                        var ima = new Image(2000, 1125);
                        ima.src = finalImage;
                        //Tạo một liên kết và thiết lập download và href
                        var link = document.createElement("a");
                        link.download = "screenshot.png";
                        link.href = finalImage;
                        link.click(); // Kích hoạt tải xuống hình ảnh
                    }
                }
                if ($(".button-destop").length) {
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    $(".button-destop").click(function() {
                        let img1 = $(this)
                            .closest(".modal-like_inner")
                            .find(".image-popup1 img")
                            .attr("src");
                        let img2 = $(this)
                            .closest(".modal-like_inner")
                            .find(".image-popup2 img")
                            .attr("src");
                        let img3 = $(this)
                            .closest(".modal-like_inner")
                            .find(".image-popup3 img")
                            .attr("src");
                        let img4 = $(this)
                            .closest(".modal-like_inner")
                            .find(".image-popup4 img")
                            .attr("src");
                        let img5 = $(this)
                            .closest(".modal-like_inner")
                            .find(".image-popup5 img")
                            .attr("src");

                        var $img2Arr;

                        let flag = $(this).closest(".modal-like").hasClass("phong-tam");
                        let flag1 = $(this).closest(".modal-like").hasClass("bathroom");
                        if (flag || flag1) {
                            $img2Arr = [img2, img1, img3, img4, img5];
                        } else {
                            $img2Arr = [img1, img2, img3, img4, img5];
                        }

                        canvas.width = 2000;
                        canvas.height = 1125;
                        drawImage(0, $img2Arr, canvas);
                    });
                }
            }
        }
    }

    // Xóa dữ liệu từ Local Storage khi click vào nút xóa
    $(document).on("click", ".js-delete", function() {
        var liId = $(this).closest(".like-item").attr("id");
        $("#" + liId).remove();
        localStorage.removeItem("user_data_" + liId);
    });
});