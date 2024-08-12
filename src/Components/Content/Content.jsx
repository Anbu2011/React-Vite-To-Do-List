import React, { useEffect, useRef, useState } from 'react'
import './Form_h2.css'
import './Tasks_edit.css'
import './Tasks_save.css'

const Content = () => {
  const [inputValue, setInputValue] = useState('');
  // const [items, setItems] = useState([]);

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('tasks');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');
  
  // store
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleAddTask = (event) =>{
    if (event) {
      event.preventDefault();
    }

    if (inputValue === null || inputValue.trim() === ''){
      alert('Add a Task');
      return;
    }

    if (inputValue.trim() !== ''){
        setItems([...items, inputValue]);
        setInputValue('');
    }
  };


  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingValue(items[index]);
  };


  const handleSaveClick = (index) => {
    const newItems = [...items];
    newItems[index] = editingValue;
    setItems(newItems);
    setEditingIndex(-1);
    setEditingValue('');
  };

  const handleEditingChange = (event) =>{
    setEditingValue(event.target.value);
  };

  const handleDeleteClick = (index) =>{
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
          <input type='text' value= {inputValue}  onChange={handleInputChange} 
          placeholder='Add Your Task Here' />

          <button type='submit'>Add</button>
      </form>

      <div className='head2'>
        <h2>Here Your Tasks</h2>
      </div>

    
      {items.map((item, index) => (
          <div key={index} style={{ marginTop: '10px' }} className='all_tasks'>

              {editingIndex === index ? (
                  <div className='task_display1'>
                      
                      <input type='text1' value={editingValue} onChange={handleEditingChange} />
                      
                      <div className='btns1'>
                        <button onClick={() => handleSaveClick(index)}  className='task_btn' id='save'>SAVE</button>

                        <button onClick={() => handleDeleteClick(index)} style={{marginLeft: " 10px"}}  className='task_btn' id='delete'>DELETE</button>
                      </div>
                  </div>
              ) : (
                  <>
                      <span  className='task_display2'>
                        <div className='display_items2'>{item}</div>

                        <div className='btns2'>
                          <button onClick={() => handleEditClick(index)} style={{ marginLeft: " 10px" }} className='task_btn' id="edit">EDIT</button>
                          <button onClick={() => handleDeleteClick(index)} style={{ marginLeft: " 10px" }} className='task_btn' id="delete">DELETE</button>
                        </div>
                      </span>
                  </>

              )}
                

          </div>
            
      ))}
        
    </div>

  );

};

export default Content;