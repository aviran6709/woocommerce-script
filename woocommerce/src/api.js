
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

export const createNewProdact = (data) => {
 console.log(data);
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
