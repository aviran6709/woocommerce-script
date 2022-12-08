



const data = [{
    name: " ",
    type: "external",
    regular_price: "",
    button_text: "Aller sur Aliexpress",
    external_url:'',

    short_description: ``
,
  //its about how to buy its static 
    description: `Une explication sur la façon d’acheter un produit caché :
    « Produit caché » comme on l’appelle : un produit que nous commanderons avec Express et un autre produit apparaîtra sur les photos du produit.
    Alors quelques points pour peaufiner et comprendre :
    1] Il n’y a rien pour faire pression sur le vendeur pour qu’il mette une image différente dans l’image du produit car il est interdit de vendre des marques avec express
    2] Et lorsque vous parlez au vendeur ne mentionnez pas le mot “marque” sinon il ne répondra pas.
    3] Les mesures en Chine sont parfois différentes. Par conséquent, nous vous recommandons de vous en tenir au tableau des tailles ci-joint.
    Pour toute question nous sommes disponibles sur Whatsapp et Telegram à partir du bouton ci-dessous.`,
    images: [
      {
        src: "https://www.dianazohar.com/wp-content/uploads/2022/11/ba800c65.png"
      },

    ]
  }
 // 2 obj in arry
  ,
];













//     // List products
// api.get("products", {
//     per_page: 20, // 20 products per page
//   })
//     .then((response) => {
//       // Successful request
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", response.headers);
//       console.log("Response Data:", response.data);
//       console.log("Total of pages:", response.headers['x-wp-totalpages']);
//       console.log("Total of items:", response.headers['x-wp-total']);
//     })
//     .catch((error) => {
//       // Invalid request, for 4xx and 5xx statuses
//       console.log("Response Status:", error.response.status);
//       console.log("Response Headers:", error.response.headers);
//       console.log("Response Data:", error.response.data);
//     })
//     .finally(() => {
//       // Always executed.
//     });