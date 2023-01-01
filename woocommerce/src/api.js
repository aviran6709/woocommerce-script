import toast  from 'react-hot-toast';
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
.then((res=>{
if(res.name ==="Error")
{  toast.error(res.message);}
else{
  toast.success(res.message);
}
console.log(res);
}))

.catch((err)=>{console.log(err.message)
  toast.error(err.message);
})
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
