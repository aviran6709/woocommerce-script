import React from "react";
import CheckboxesTags from "./ComboBox";
import { createNewProdact, getCategories, getTags } from "./api";
import "./App.css";

function App() {
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const [inputData, setInputData] = React.useState({});
  const [checkData, setCheckData] = React.useState([]);
  const [checkTags, setCheckTags] = React.useState([]);
  const [imageCount, setImageCount] = React.useState([1]);
  const [image, setImage] = React.useState([]);
  //need
  const handleClick = (evt) => {
    evt.preventDefault();
    let imageList = Object.values(image).map((item, index) => {
  
      return { "src": item };
    });
    const category = checkData.map((item) => {
  
      return { id: item };
    });
    const tags = checkTags.map((item) => {
      return { id: item.id};
    });
    const arr = [inputData, category, imageList, tags];
    
    createNewProdact(arr);
  };

  const addImg = (evt) => {
    evt.preventDefault();
    setImageCount((current) => [...current, 5]);
  };

  function handleChange(evt, typeData) {
    const value = evt.target.value;
    typeData === "image"
      ? setImage({
          ...image,
          [evt.target.name]: value,
        })
      : setInputData({
          ...inputData,
          [evt.target.name]: value,
        });
  }

  const handleCheck = (evt) => {
    let data = checkData;

    let updatedList = [...data];

    if (evt.target.checked) {
      updatedList = [...data, evt.target.id];
    } else {
      updatedList.splice(data.indexOf(evt.target.id), 1);
    }

    setCheckData(updatedList);
  
  };

  const getAllCategories = () => {
    getCategories().then((res) => {
      let info = res.map((category) => {
        return { id: category.id, name: category.name };
      });
      setCategories(...categories, info);
    });
  };
  const getAlltags = () => {
    getTags().then((res) => {
      let info = res.map((tag) => {
        return { id: tag.id, name: tag.name };
      });
      setTags(...tags, info);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    getAllCategories();
    getAlltags();
  }, []);

  return (
    <div className="App">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-content">
        <h3> Info</h3>
          <div>
          <label>Prodact name</label>
          <input
            type="text"
            placeholder="Enter prodact name"
            name="name"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            autoComplete="on"
            className="form__input"
          ></input>
       </div>
       <div>
          <label>Prodact price</label>
          <input
            type="text"
            placeholder="Enter prodact price"
            name="price"
            required
            onChange={handleChange}
            autoComplete="on"
            className="form__input"
          ></input>
      </div>
      <div>
        <label> Link to Aliexpress</label>
        <input
          type="url"
          placeholder="Enter prodact link to Aliexpress"
          name="link"
          required
          onChange={handleChange}
          autoComplete="on"
          className="form__input"
        ></input>
          </div>
      <div>
          <label>Prodact description</label>
          <textarea
          rows="1"
            type="text"
            placeholder="Enter prodact description"
            name="description"
            required
            onChange={handleChange}
            autoComplete="on"
            className="form__input"
          ></textarea>
       </div>
     
        {imageCount.map((item, index) => {
          return (
            <div key={index}>
              <label> Image link</label>
              <input
                type="url"
                placeholder="Enter link to Image"
                name={`image${index}`}
                required
                onChange={(e) => handleChange(e, "image")}
                autoComplete="on"
                className="form__input"
              ></input>
            </div>

          );

        })}

        <button onClick={addImg}>Add image</button>
        </div>
       

       <div className="check-box"> 
       <h3> Categories</h3>
       {categories.map((category) => {
          return (
            <div key={category.id}>
              <input
              key={category.id}
                type="checkbox"
                id={category.id}
                name={category.name}
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <label>{category.name}</label>
            </div>
          );
        })}
        </div>
        <div>
        <h3> Tags</h3>

        <CheckboxesTags tagsName={tags} setState={setCheckTags} />

        <button type="submit" onClick={handleClick}>
          Submit
        </button>
        </div>
      </form>
    
    </div>
    
  );
}

export default App;
