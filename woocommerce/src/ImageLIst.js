import React, { useState } from "react";
 
function ImageList({setImage ,scrapImageList} ) {
  const [inputList, setInputList] = useState([ { "src": ""}]);
  

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][`${name}`] = value;
    setInputList(list);
    setImage(list)
  

  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setImage(list)
  };
 
  // handle click event of the Add button
  const handleAddClick = (evt) => {
    evt.preventDefault();
    setInputList([...inputList, { "src": ""}]);
  };
  React.useEffect(() => {
    setInputList(scrapImageList)
  }, [scrapImageList]);


 
  return (
    <div className="image-bin">
      <h3>Image</h3>
      {inputList.map((item, i) => {
        return (
          <div className="box"  key={i} >
             <label>Image url</label>
            <input
            
              name="src"
   placeholder="Enter image URL"
   className="form__input"
              value={item.src}
              onChange={e => handleInputChange(e, i)}
            />
          {inputList.length !== 1 && <button
                onClick={() => handleRemoveClick(i)
               
                }>X</button>}
         <img  className="image-prevue" src={item.src?item.src:"https://i1.sndcdn.com/artworks-WymyXUrsLezHzBDk-TsEDsg-t500x500.jpg"}></img> 
   
        
  
      
           
          </div>
          
        );
        
      })}
      { <button onClick={handleAddClick}>Add URL</button>}
   
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

 
export default ImageList;