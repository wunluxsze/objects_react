import React, { useState } from 'react';

function First() {
  const [obj, setObj] = useState({
    prop1: 'Ivan',
    prop2: 'Ruzhkov',
    prop3: 'Kostya',
  });
  const [value1, setValue1] = useState(obj.prop1);
  const [value2, setValue2] = useState(obj.prop2);
  const [value3, setValue3] = useState(obj.prop3);

  function handleChange(prop, value) {
    let copy = Object.assign({}, obj);
    copy[prop] = value;
    setObj(copy);
  }

  return (
    <div>
      <p>{obj.prop1}</p>
      <p>{obj.prop2}</p>
      <p>{obj.prop3}</p>
      <input type="text" value={value1} onChange={(event) => setValue1(event.target.value)} />
      <button onClick={() => handleChange('prop1', value1)}>edit</button> <br />
      <input type="text" value={value2} onChange={(event) => setValue2(event.target.value)} />
      <button onClick={() => handleChange('prop2', value2)}>edit</button> <br />
      <input type="text" value={value3} onChange={(event) => setValue3(event.target.value)} />
      <button onClick={() => handleChange('prop3', value3)}>edit</button>
    </div>
  );
}

export default First;
