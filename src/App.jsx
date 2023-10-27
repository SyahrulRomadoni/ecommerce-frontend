import React, { useState, useEffect } from 'react';

function App() {
  const [rows, setRows] = useState([{ name: '', price: 0, qty: 1, total: 0 }]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    updateGrandTotal();
  }, [rows]);

  const updateGrandTotal = () => {
    const total = rows.reduce((sum, row) => sum + row.total, 0);
    setGrandTotal(total);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', price: 0, qty: 1, total: 0 }]);
  };

  const handleDeleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const handleNameChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].name = value;
    setRows(updatedRows);
  };

  const handlePriceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].price = parseFloat(value);
    updatedRows[index].total = parseFloat(value) * updatedRows[index].qty;
    setRows(updatedRows);
  };

  const handleQtyChange = (index, value) => {
    if (value < 1) {
      alert('Quantity should not be less than 1');
    } else {
      const updatedRows = [...rows];
      updatedRows[index].qty = parseInt(value);
      updatedRows[index].total = updatedRows[index].price * parseInt(value);
      setRows(updatedRows);
    }
  };

  return (
    <div>
      <button style={{backgroundColor: 'grey', margin: '10px'}} onClick={handleAddRow}>New</button>
      {rows.map((row, index) => (
        <div key={index}>

          <label style={{float: 'left', margin: '10px'}}>
          Product Name <br></br>
          <input
            style={{padding: '10px'}}
            type="text"
            placeholder="Product Name"
            value={row.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />
          </label>

          <label style={{float: 'left', margin: '10px'}}>
          Product Price <br></br>
          <input
            style={{padding: '10px'}}
            type="number"
            placeholder="Product Price"
            value={row.price}
            onChange={(e) => handlePriceChange(index, e.target.value)}
          />
          </label>
          
          <label style={{float: 'left', margin: '10px'}}>
          Quantity <br></br>
          <input
            style={{padding: '10px'}}
            type="number"
            placeholder="Quantity"
            value={row.qty}
            onChange={(e) => handleQtyChange(index, e.target.value)}
          />
          </label>

          <label style={{float: 'left', margin: '10px'}}>
          Total <br></br>
          <input
            style={{padding: '10px'}}
            disabled
            type="number"
            placeholder="Total"
            value={row.total}
          />
          </label>
          
          {rows.length > 1 && (
            <button style={{backgroundColor: 'red', margin: '30px'}} onClick={() => handleDeleteRow(index)}>Delete</button>
          )}

        </div>
      ))}

      <label style={{float: 'right', margin: '10px'}}>
        Grand Total <br></br>
        <input
          style={{padding: '10px'}}
          disabled
          type="number"
          placeholder="Grand Total"
          value={grandTotal}
        />
      </label>
      
    </div>
  );
}

export default App;
