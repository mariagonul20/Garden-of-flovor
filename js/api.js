//// Api'a istek atacak fonksiyon

const getMenu = async () => {
  try {
    // Api'a istek at
    const response = await fetch("../db.json");

    // Api'dan gelen veriyi JSON'dan Js nesnesine çevir
    const data = await response.json();

    // Gelen veri içerisindeki menu'yü return et

    return data.menu;
  } catch (error) {
    //  Hata durumunda kullanıcıya bildirimde bulun
    console.log(`Apı Hatası: ${error}`);

    // Eğer hata varsa geriye boş bir dizi dönder
    return [];
  }
};

export default getMenu;