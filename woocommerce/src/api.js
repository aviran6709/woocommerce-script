
export const getCategories = () => {
  return fetch(`http://localhost:3003`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(res.statusText);
    }
  });
};
export const getTags= () => {
  return fetch(`http://localhost:3003/tags`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(res.statusText);
    }
  });
};

export const createNewProduct = (data) => {

  fetch('http://localhost:3003', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response))).catch(console.log)
};
export const scrapData = (url) => {

 return fetch('http://localhost:3003/scrap', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({src:url})
})


};
