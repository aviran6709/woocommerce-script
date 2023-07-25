
  const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
  const TelegramBot = require('node-telegram-bot-api');
//facebook requirement
  const FB = require('fb');
  const ACCESS_TOKEN = '';
  FB.setAccessToken(ACCESS_TOKEN);
 

  //Telegram Token
  const TOKEN = '';
  const bot = new TelegramBot(TOKEN, {polling: true});
  

//woocommerce token 
  const WooCommerce = new WooCommerceRestApi({
    url: "https://coope-fashion.store/",
    consumerKey: "",
    consumerSecret: "",
    version: "wc/v3",
  });
  


 const uploudProduct =  ( req , res) => {
const [inputData,category,imageLink,tags, tgSwitch, fbSwitch] =req.body

   const itemData ={
    name: inputData.name,
    type: "external",
    regular_price:inputData.price,
    button_text: "",
    external_url: inputData.link,
    tags:tags,
    categories: category,
    short_description: inputData.description?  inputData.description :`
    Sélection de l'article selon le code couleur/modèle qui apparaît sur les photos du poste,
    Faites correspondr e le code/la couleur dans le lien en fonction des images de publication.`,
    //its about how to buy its static
    description: `Une explication sur la façon d’acheter un produit caché :
  « Produit caché » comme on l’appelle : un produit que nous commanderons avec Express et un autre produit apparaîtra sur les photos du produit.
  Alors quelques points pour peaufiner et comprendre :
  1] Il n’y a rien pour faire pression sur le vendeur pour qu’il mette une image différente dans l’image du produit car il est interdit de vendre des marques avec express
  2] Et lorsque vous parlez au vendeur ne mentionnez pas le mot “marque” sinon il ne répondra pas.
  3] Les mesures en Chine sont parfois différentes. Par conséquent, nous vous recommandons de vous en tenir au tableau des tailles ci-joint.
  Pour toute question nous sommes disponibles sur Whatsapp et Telegram à partir du bouton ci-dessous.`,
    images:imageLink,   
    
}

     WooCommerce.post("products", itemData)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
         res.send({message:"prodact uploud TO WordPress"});
         console.log(response);
         //telegram bot
         if(tgSwitch){
          bot.sendMessage( "@Nouvellarrivee",`${response.data.permalink}
           Nouvelles Arrivées 🥳🥳
           ${response.data.name} ${response.data.price}€ Ne manquez pas le nouvel article a atterri sur notre site
COOPE Fashion - Votre mode notre passion 🔥 
         `);
         }
 
          //  facebook post
          if(fbSwitch){
            FB.api(
              '/103206304926273/feed/',
              'POST',
              {"message":`Nouvelles Arrivées 🥳🥳
              Ne manquez pas le nouvel article a atterri sur notre site
              Restez à l'écoute et rejoignez notre chaîne 📣Telegram📣
              COOPE Fashion - Votre mode notre passion 🔥 ${response.data.price}€`,"link":` ${response.data.permalink}`},
    
         function (response) {
          if (response.error) {
           console.log('error occurred: ' + response.error.message)
           return;
          }
         console.log('successfully posted to page! FB');
         
         }
        );
        
      }
        }
      })
      .catch((error) => {
        console.log(error);
      })
 
  };

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
