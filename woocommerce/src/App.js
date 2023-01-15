import React from "react";
import CheckboxesTags from "./ComboBox";
import ControlledSwitches from "./IosSwitchStyle";
import  { Toaster } from "react-hot-toast";
import { scrapData, createNewProduct, getCategories, getTags } from "./api";
import "./App.css";
import ImageList from "./ImageLIst";

function App() {
  const [tgSwitch, setTgSwitch] = React.useState(true);
  const [fbSwitch, setFbCSwitch] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [inputData, setInputData] = React.useState({});
  //check box input state
  const [checkData, setCheckData] = React.useState([]);
  const [checkTags, setCheckTags] = React.useState([]);
  const [image, setImage] = React.useState([]);
  //scarp
  const [scrapInfoState, setScarpInfo] = React.useState({
    data: { price: "", url: "" },
    images: [{ src: "" }],
  });
  let valueScrap;

  //edit the data before sending to woocommerce
  const handleClick = async (evt) => {
    evt.preventDefault();

    const category = checkData.map((item) => {
      return { id: item };
    });
    const tags = checkTags.map((item) => {
      return { id: item.id };
    });
    const arr = [inputData, category, image, tags ,tgSwitch, fbSwitch];
    
    createNewProduct(arr);
  };

  // get info from user
  function handleChange(evt) {
    const value = evt.target.value;
    setInputData({
      ...inputData,
      [evt.target.name]: value,
    });
  }

  //get the link from user
  function handleScrap(evt) {
    valueScrap = evt.target.value;
  }

  
  const onScrap = async (e) => {
    e.preventDefault();
 await scrapData(valueScrap)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.data.price.substring(1);
        setScarpInfo({
          data: {
            price: response.data.price,
            url: response.data.url,
          },
          images: response.image,
        });
      })
      .catch(console.log);
  };

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
    getCategories()
      .then((res) => {
        let info = res.map((category) => {
          return { id: category.id, name: category.name };
        });
        setCategories(...categories, info);
      })
      .catch(console.log);
  };
  //get tags from woocomere
  const getAllTags = () => {
    getTags()
      .then((res) => {
        let info = res.map((tag) => {
          return { id: tag.id, name: tag.name };
        });
        setTags(...tags, info);
      })
      .catch(console.log);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);

  return (
    <div className="App">
      <header>
        <h2>Improve your business</h2>
      </header>
      <ControlledSwitches socialNet={[tgSwitch, setTgSwitch, fbSwitch,setFbCSwitch]}/>
      <div>
        <Toaster />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="info">
            <h3> INFO</h3>
            <div>
              <label>Prodact name</label>
              <input
                type="text"
                placeholder="Enter prodact name"
                name="name"
                required={true}
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
                defaultValue={
                  scrapInfoState.data.price
                    ? `${Math.ceil(
                        scrapInfoState.data.price.substring(1) / 3.72
                      )}`
                    : ""
                }
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
                defaultValue={scrapInfoState.data.url}
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
              <div>
                {" "}
                <textarea
                  rows="4"
                  type="text"
                  placeholder="Enter prodact description"
                  name="description"
                  required
                  onChange={handleChange}
                  autoComplete="on"
                  className="form__input"
                ></textarea>
              </div>
              <h3> TAGS</h3>

              <CheckboxesTags tagsName={tags} setState={setCheckTags} />
            </div>
          </div>
          <div className="check-box">
            <h3> CATEGORIES</h3>
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

          <ImageList
            setImage={setImage}
            setScarpInfo={setScarpInfo}
            scrapImageList={scrapInfoState.images}
          ></ImageList>


       
        </div>

        <button
          className="form__submit-btn"
          type="submit"
          onClick={handleClick}
        >
          SUBMIT
        </button>
      </form>
      <form method="POST" onSubmit={(e) => onScrap(e)}>
        <label> Link to prodact</label>
        <input
          type="url"
          placeholder="Enter prodact link "
          name="link"
          required
          onChange={handleScrap}
          autoComplete="on"
          className="form__input"
        ></input>
        <button type="submit">GET INFO</button>
      </form>
    </div>
  );
}

export default App;
