/** @format */

import React, { useState } from 'react';
import { Modal, Select, Space, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const Return = ({ returnProduct, setReturnProduct, dataSource }) => {
  const [rentPrice, setRentPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [days, setDays] = useState(0);

  const [mileage2, setMileage2] = useState('');
  const [minrent, setMinrent] = useState('');
  const [needrepair, setNeedRepair] = useState(false);

  const [visible, setVisible] = useState(false);

  function handleChange(value, index) {
    console.log(`selected ${value}`);
    setRentPrice(value);

    setMileage(index.mileage);
    setMinrent(index.minrent);
    setNeedRepair(index.needrepair);

    setVisible(true);
  }

  function onChange(date) {
    // extracting days by comparing two dates selected
    const days = Math.floor(
      Math.abs(new Date(date[1]) - new Date(date[0])) / (1000 * 60 * 60 * 24)
    );
    // check if days is counting correctly or not
    console.log(days);
    // set total days to state
    setDays(days);
    // mileage calculation
    setMileage(days * 10);
  }

  const handleOk = () => {
    setReturnProduct(false);

    // Showing calculation in a alert box
    alert(`Your total cost is: ${rentPrice * days} and Mileage is: ${mileage}`);
  };

  return (
    <Modal
      title='Return a service'
      visible={returnProduct}
      onCancel={() => setReturnProduct(false)}
      onOk={handleOk}>
      <Select
        defaultValue='Select return a service name'
        style={{ width: 250 }}
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
      <br />
      {visible && (
        <div style={{ backgroundColor: '#f1f1f1', padding: '10px' }}>
          <p>Mileage: {mileage ? mileage : 'No Mileage info'}</p>

          <p>Minimum Rent Priod: {minrent && minrent}</p>

          <p>Need to Repair: {needrepair ? 'Yes' : 'No'}</p>
        </div>
      )}

      <br />

      <br />
      <p>Please select start and submission date below: </p>
      <Space direction='vertical' size={12}>
        <RangePicker onChange={onChange} />
      </Space>
    </Modal>
  );
};

export default Return;
