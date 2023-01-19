import React, { useState } from 'react';
import uuid from 'react-uuid';

export default function Table() {
  let [initProds, setInitProds] = useState([
    { id: id(), name: 'prod', catg: 'catg1', cost: 100 },
    { id: id(), name: 'prod', catg: 'catg2', cost: 200 },
    { id: id(), name: 'prod', catg: 'catg3', cost: 300 },
  ]);
  let [obj, setObj] = useState(getObj());
  let [editId, setEditId] = useState(null);

  function id() {
    return uuid();
  }

  let result = initProds.map((note, index) => {
    return (
      <tr key={note.id}>
        <td>{note.name}</td>
        <td>{note.catg}</td>
        <td>{note.cost}</td>
        <button onClick={() => deleteProduct(note.id)}>Удалить продукт</button>
        <button onClick={() => setEditId(note.id)}>Изменить</button>
      </tr>
    );
  });

  function changeEditItem(prop, event) {
    if (editId != null) {
      setInitProds(
        initProds.map((note) =>
          note.id === editId ? { ...note, [prop]: event.target.value } : note,
        ),
      );
    }
  }

  function deleteProduct(id) {
    setInitProds(initProds.filter((note) => note.id !== id));
  }

  function changeCreateItem(prop, event) {
    setObj({ ...obj, [prop]: event.target.value });
  }

  function getValue(prop) {
    if (editId != null) {
      return initProds.reduce((res, note) => (note.id === editId ? note[prop] : res), '');
    } else return obj[prop];
  }

  function saveCreateItem() {
    setInitProds([...initProds, obj]);
    setObj(getObj());
  }

  function getEditValue(prop) {
    if (editId != null) {
      return initProds.reduce((res, note) => (note.id === editId ? note[prop] : res), '');
    }
  }

  function changeItem(prop, event) {
    if (editId != null) {
      setInitProds(
        initProds.map((note) =>
          note.id === editId ? { ...note, [prop]: event.target.value } : note,
        ),
      );
    } else setObj({ ...obj, [prop]: event.target.value });
  }

  function saveItem() {
    if (editId != null) {
      setEditId(null);
    } else {
      setInitProds([...initProds, obj]);
      setObj(getObj());
    }
  }

  let block = (
    <div>
      <table>{result}</table>
      <input type="text" value={obj.name} onChange={(event) => changeCreateItem('name', event)} />
      Добавление
      <br />
      <input type="text" value={obj.catg} onChange={(event) => changeCreateItem('catg', event)} />
      <br />
      <input type="number" value={obj.cost} onChange={(event) => changeCreateItem('cost', event)} />
      <button onClick={saveCreateItem}>Сохранить</button> <br /> <br />
      <input
        type="text"
        value={getEditValue('name')}
        onChange={(event) => changeEditItem('name', event)}
      />
      Изменение
      <br />
      <input
        type="text"
        value={getEditValue('catg')}
        onChange={(event) => changeEditItem('catg', event)}
      />
      <br />
      <input
        type="number"
        value={getEditValue('cost')}
        onChange={(event) => changeEditItem('cost', event)}
      />
      <button onClick={() => setEditId(null)}>Сохранить</button> <br /> <br />
      <input type="text" value={getValue('name')} onChange={(event) => changeItem('name', event)} />
      Универсальная форма
      <br />
      <input type="text" value={getValue('catg')} onChange={(event) => changeItem('catg', event)} />
      <br />
      <input
        type="number"
        value={getValue('cost')}
        onChange={(event) => changeItem('cost', event)}
      />
      <button onClick={saveItem}>Сохранить</button> <br /> <br />
    </div>
  );
  function getObj() {
    return {
      id: id(),
      name: '',
      catg: '',
      cost: 0,
    };
  }

  return block;
}
