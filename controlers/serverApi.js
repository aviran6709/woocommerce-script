
  const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
  const TelegramBot = require('node-telegram-bot-api');
//facbook requirement
  const FB = require('fb');
  const ACCESS_TOKEN = 'EAASZAZCpB2n04BAFhTO5lHlI7d6BXETlOcotdXRHYrb6jHXetHnA9p1EMYkmRV3Gt4WiNYfleMpAgVmQBZCb6LtcTjWPVXTTZBiDbUg3Y5HabJeL1VZAvXvSMFkdgpCBoHn5knTfjBMCWx4UZC4NFct11nadZCKY2VYb6xYgJYZBg0i0ZBfePSUuvhIC8eR7ecJRF95bWr1zjjQZDZD';
  FB.setAccessToken(ACCESS_TOKEN);
 

  // //Telegram Token
  // const token = '5884733933:AAHkAJ2fEjdLajlb3HekQ9yCKAwymDMLjKQ';
  // const bot = new TelegramBot(token, {polling: true});
  

//woocomers token 
  const WooCommerce = new WooCommerceRestApi({
    url: "https://coope-fashion.store/",
    consumerKey: "ck_758c95a055ecbcb64758ead650d9b895e5831da9",
    consumerSecret: "cs_d8c8bd9befaed28e4956cea49681f346d14dcee2",
    version: "wc/v3",
  });
  


const uploudProduct =(req,res)=>{
const [inputData,category,imageLink,tags] =req.body
  const data = {
    name: inputData.name,
    type: "external",
    regular_price:inputData.price,
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    categories: [
      {
        id: 9
      },
      {
        id: 14
      }
    ],
    images: [
      {
        src: "https://www.dianazohar.com/wp-content/uploads/2022/12/9948cad8.jpg"
      },
      {
        src: "https://coope-fashion.store/wp-content/uploads/2022/12/9948cad8-2.jpg"
      },
    ]
  };
  
  WooCommerce.post("products", data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}



  


//  const uploudProduct =  ( req , res) => {
// const [inputData,category,imageLink,tags] =req.body

//    const itemData ={
//     name: inputData.name,
//     type: "external",
//     regular_price:inputData.price,
//     button_text: "Aller sur Aliexpress",
//     external_url: inputData.link,
//     tags:tags,
//     categories: category,
//     short_description: `Tailles : M-2XL
//     Sélection de l'article selon le code couleur/modèle qui apparaît sur les photos du poste,
//     Faites correspondre le code/la couleur dans le lien en fonction des images de publication.`,
//     //its about how to buy its static
//     description: `Une explication sur la façon d’acheter un produit caché :
//   « Produit caché » comme on l’appelle : un produit que nous commanderons avec Express et un autre produit apparaîtra sur les photos du produit.
//   Alors quelques points pour peaufiner et comprendre :
//   1] Il n’y a rien pour faire pression sur le vendeur pour qu’il mette une image différente dans l’image du produit car il est interdit de vendre des marques avec express
//   2] Et lorsque vous parlez au vendeur ne mentionnez pas le mot “marque” sinon il ne répondra pas.
//   3] Les mesures en Chine sont parfois différentes. Par conséquent, nous vous recommandons de vous en tenir au tableau des tailles ci-joint.
//   Pour toute question nous sommes disponibles sur Whatsapp et Telegram à partir du bouton ci-dessous.`,
//     images:imageLink,   
    
// }

//      WooCommerce.post("products", itemData)
  
//       .then((response) => {
//         console.log(itemData);
//         if (response.status === 201) {
//          res.send("prodact uploud");
//          console.log(response.data);

//           //  bot.sendMessage( "@Nouvellarrivee",`Now on SALE just ${response.data.price}€
//           //  ${response.data.permalink}`);

//            //facebook post
//         //     FB.api(
//         //       '/103206304926273/feed/',
//         //       'POST',
//         //       {"message":`Now on SALE just ${response.data.price}€`,"link":` ${response.data.permalink}`},
    
//         //  function (response) {
//         //   if (response.error) {
//         //    console.log('error occurred: ' + response.error.message)
//         //    return;
//         //   }
//         //   console.log('successfully posted to page!');
//         //  }
//         // );
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
 
//   };

   const getAllCategoris = ( req , res) => {
 
    WooCommerce.get("products/categories/")
      .then((response) => {
   
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
   const getAlltags = async( req , res) => {
 
  await  WooCommerce.get("products/tags?per_page=100",)
      .then((response) => {
    //  console.log(response.data.length);
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  module.exports={uploudProduct,getAllCategoris ,getAlltags}