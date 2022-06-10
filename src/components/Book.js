/** @format */

import React, { useState } from 'react';
import { Modal, Select, DatePicker, Space } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const Book = ({ book, setBook, dataSource }) => {
  const [rentPrice, setRentPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [name, setName] = useState('');
  const [mileage, setMileage] = useState('');
  const [minrent, setMinrent] = useState('');
  const [needrepair, setNeedRepair] = useState(false);

  const [visible, setVisible] = useState(false);

  function handleChange(e, index) {
    console.log(`selected ${e}`);

    //set calculated price to state
    setRentPrice(e);
    setName(index.name);
    setMileage(index.mileage);
    setMinrent(index.minrent);
    setNeedRepair(index.needrepair);

    setVisible(true);
  }

  const handleOk = () => {
    setBook(false);

    if (days < minrent) {
      alert(
        `Minimum rental priod is: ${minrent} day/days, but you selected: ${days} day/days`
      );
      return;
    }

    // Showing calculation in a alert boxs
    alert(`Your estimated product price is: ${rentPrice * days}`);
  };
  function onChange(date) {
    // extracting days by comparing two dates selected
    const days = Math.floor(
      Math.abs(new Date(date[1]) - new Date(date[0])) / (1000 * 60 * 60 * 24)
    );
    // check if days is counting correctly or not
    console.log(days);
    // set total days to state
    setDays(days + 1);
  }
  return (
    <Modal
      title='Book a service'
      visible={book}
      onCancel={() => setBook(false)}
      onOk={handleOk}>
      <Select
        defaultValue='Book a product'
        style={{ width: 450 }}
        onChange={(e, index) => handleChange(e, index)}>
        {dataSource.map((single) => (
          <Option
            key={single.code}
            value={single.price}
            name={single.name}
            mileage={single.mileage}
            minrent={single.minimum_rent_period}
            needrepair={single.needing_repair}>
            {single.name}
          </Option>
        ))}
      </Select>
      <br />
      <br />
      {visible && (
        <div style={{ backgroundColor: '#f1f1f1', padding: '10px' }}>
          <p>Price: {rentPrice && rentPrice}</p>
          <p>Mileage: {mileage ? mileage : 'No Mileage info'}</p>

          <p>Minimum Rent Priod: {minrent && minrent}</p>

          <p>Need to Repair: {needrepair ? 'Yes' : 'No'}</p>
        </div>
      )}

      <br />

      <Space direction='vertical' size={12}>
        <RangePicker onChange={onChange} />
      </Space>
    </Modal>
  );
};

export default Book;
