import getMenu from "./api.js";
import {
  renderDetailPage,
  renderLoader,
  renderMenuCard,
  renderNotFound,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Api isteği at
  const menuData = await getMenu();

  // Hangi sayfada olduğumuza karar ver.Eğer ana sayfadaysak buna göre işlemler detay sayfasında ise buna göre işlemler yapacağız
  if (window.location.pathname.includes("/index.html")) {
    // Loader'ı render et

    renderLoader();

    setTimeout(() => {
      // Menu elemanlarını dinamik şekilde render et
      renderMenuCard(menuData);
    }, 2000);

    // uiElements.categoryButtons bir nodeList olduğundan buna addEventListener ekleyemeyiz.Bunun için nodeList içerisindeki her bir elemana teker teker erişip addEventListener ekleyeceğiz.
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // butona tıklanınca butonun id'sine eriş ve bunu selectedCategory'e aktar

        const selectedCategory = button.id;

        // menuData içerisindeki selectedCategory'e sahip elemanlara eriş

        const filtredMenu = menuData.filter(
          (item) => item.category == selectedCategory
        );

        // Filtrelenen ürünlere göre menuListesini renderla.Eğer selectedCategory all'a eşitse tüm ürünleri renderla ama selectedCategory all değeri haricinde bir değere eşitse o kategorideki ürünleri renderla

        if (selectedCategory == "all") {
          // selectedCategory all ise
          renderMenuCard(menuData);
        } else {
          // selectedCategory all haricinde bir değere sahipse
          renderMenuCard(filtredMenu);
        }
      });
    });
  } else {
    // Url'deki parametreye eriş
    // ! URLSearchParams javascript içerisinde yer alan bir classtır.Url'e geçilen parametreleri kolay bir şekilde yönetmemizi sağlar.
    const params = new URLSearchParams(window.location.search);

    // Ürünün id'sini number veri  tipine dönüştür ve bir değişkene aktar
    const itemId = +params.get("id");

    // menuData içerisinde itemId'e sahip elemanı bul
    const product = menuData.find((item) => item.id == itemId);

    // Eğer product yoksa not-found sayfası renderla
    if (!product) {
      renderNotFound();
    } else {
      // Bulunan product'a göre arayüzü renderla

      renderDetailPage(product);
    }
  }
});