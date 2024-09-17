import React, { useState } from "react";
import "./habits.css";

export default function List() {
  const [listElements, setListElements] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editText, setEditText] = useState("");
  const [alertText, setAlertText] = useState("");

  let newItems;
  function removeItem(index) {
    newItems = listElements.filter((_, i) => i !== index);
    setListElements(newItems);
  }

  function changeText(index) {
    setEditText(listElements[index]);
    setEditingIndex(index);
  }

  function cancelEdit(index) {
    setEditingIndex(-1);
  }

  function newEditedValue(e) {
    setEditText(e.target.value);
  }

  function saveChanges(index) {
    let newItems = [...listElements];
    newItems[index] = editText;
    setListElements(newItems);
    setEditingIndex(-1);
  }

  //   let arrayList = ["Call to hari", "Complete the assigned tasks"];
  const listItems = listElements.map((item, index) => {
    let value = item;

    return (
      <>
        {editingIndex === index ? (
          <>
            <div className="second-container">
              <input type="text" value={editText} onChange={newEditedValue} />
              <button onClick={() => cancelEdit(index)}>Cancel</button>
              <button onClick={() => saveChanges(index)}>Save</button>
            </div>
          </>
        ) : (
          <>
            <div className="first-container">
              <li className="list-items">{item}</li>

              <div>
                <button
                  className="edit-button"
                  onClick={() => changeText(index)}
                >
                  Update
                </button>
                <button
                  className="remove-button"
                  onClick={() => removeItem(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  });

  function changingValue(e) {
    setText(e.target.value);
  }
  function addText() {
    if (text) {
      setListElements((prevElements) => [...prevElements, text]);
      setText("");
      setAlertText("");
    } else {
      setAlertText("Please enter something");
    }
  }
  return (
    <div className="list-container" className="bg-container">
      <h1 className="heading">Habits</h1>
      <div className="container">
        <input
          className="input-element"
          type="text"
          value={text}
          onChange={changingValue}
        />
        <p className="alert">{alertText}</p>
        <button className="add-button" onClick={addText}>
          Add
        </button>
      </div>
      <ol>{listItems}</ol>
    </div>
  );
}
