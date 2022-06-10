/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import Return from './components/Return';
import Book from './components/Book';

const FlexBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid palevioletred;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    margin: 20px;
  }
`;

const data = [
  {
    code: 'p1',
    name: 'Air Compressor 12 GAS',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 3000,
    max_durability: 3000,
    mileage: null,
    price: 4500,
    minimum_rent_period: 1,
  },
  {
    code: 'p2',
    name: 'Air Compressor 5 Electric',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 1500,
    max_durability: 2000,
    mileage: null,
    price: 6500,
    minimum_rent_period: 1,
  },
  {
    code: 'p3',
    name: 'Dia Blade 14 inch',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 40000,
    max_durability: 50000,
    mileage: null,
    price: 3000,
    minimum_rent_period: 2,
  },
  {
    code: 'p4',
    name: 'Copper Blade 5 inch',
    type: 'plain',
    availability: false,
    needing_repair: true,
    durability: 0,
    max_durability: 2000,
    mileage: null,
    price: 200,
    minimum_rent_period: 2,
  },
  {
    code: 'p5',
    name: 'Copper Blade 5 inch',
    type: 'plain',
    availability: false,
    needing_repair: true,
    durability: 0,
    max_durability: 2000,
    mileage: null,
    price: 200,
    minimum_rent_period: 2,
  },
  {
    code: 'p6',
    name: 'Copper Blade 8 inch',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 1500,
    max_durability: 2000,
    mileage: null,
    price: 300,
    minimum_rent_period: 2,
  },
  {
    code: 'p7',
    name: 'Beam Clamp',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 15000,
    max_durability: 20000,
    mileage: null,
    price: 800,
    minimum_rent_period: 30,
  },
  {
    code: 'p8',
    name: 'Beam Clamp',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 10000,
    max_durability: 20000,
    mileage: null,
    price: 800,
    minimum_rent_period: 30,
  },
  {
    code: 'p9',
    name: 'Beam Clamp',
    type: 'plain',
    availability: false,
    needing_repair: false,
    durability: 5000,
    max_durability: 20000,
    mileage: null,
    price: 800,
    minimum_rent_period: 30,
  },
  {
    code: 'm1',
    name: 'Boom lift 40',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 4000,
    max_durability: 8000,
    mileage: 10000,
    price: 1000,
    minimum_rent_period: 4,
  },
  {
    code: 'm2',
    name: 'Boom lift 60',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 8000,
    max_durability: 10000,
    mileage: 5000,
    price: 1500,
    minimum_rent_period: 4,
  },
  {
    code: 'm3',
    name: 'Boom lift 80',
    type: 'meter',
    availability: false,
    needing_repair: true,
    durability: 500,
    max_durability: 12000,
    mileage: 200,
    price: 2000,
    minimum_rent_period: 2,
  },
  {
    code: 'm4',
    name: 'Boom lift 100',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 4000,
    max_durability: 12000,
    mileage: 8500,
    price: 2500,
    minimum_rent_period: 2,
  },
  {
    code: 'm5',
    name: 'Boom lift 20',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 1200,
    max_durability: 8000,
    mileage: 600,
    price: 500,
    minimum_rent_period: 1,
  },
  {
    code: 'm6',
    name: 'Boom lift 20',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 8000,
    max_durability: 8000,
    mileage: 0,
    price: 500,
    minimum_rent_period: 1,
  },
  {
    code: 'm7',
    name: 'Boom lift 20',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 5000,
    max_durability: 8000,
    mileage: 1200,
    price: 500,
    minimum_rent_period: 1,
  },
  {
    code: 'm8',
    name: 'Boom lift 40',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 8000,
    max_durability: 10000,
    mileage: 2500,
    price: 1000,
    minimum_rent_period: 2,
  },
];

export default function Main() {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');

  const FilterByNameInput = (
    <Input
      placeholder='Search Name'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter((entry) =>
          entry.name.toLowerCase().includes(currValue.toLowerCase())
        );
        setDataSource(filteredData);
      }}
    />
  );

  //stats for button
  const [book, setBook] = useState(false);
  const [returnProduct, setReturnProduct] = useState(false);

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      render: (availability) => String(availability),
      key: 'availability',
    },
    {
      title: 'Need to repair',
      dataIndex: 'needing_repair',
      render: (needing_repair) => String(needing_repair),
      key: 'needing_repair',
    },
    {
      title: 'Durable',
      dataIndex: 'durability',
      key: 'durability',
    },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      render: (mileage) => (mileage ? mileage : 'No Mileage Available'),
      key: 'mileage',
    },
  ];

  return (
    <FlexBox>
      <Table columns={columns} dataSource={dataSource} />
      <div style={{ display: 'inline' }}>
        <Button onClick={() => setBook(true)} type='primary'>
          Book
        </Button>
        <Button onClick={() => setReturnProduct(true)}>Return</Button>
      </div>
      {/* Showing modals based on condition */}
      {book && <Book book={book} setBook={setBook} dataSource={dataSource} />}
      {returnProduct && (
        <Return
          returnProduct={returnProduct}
          setReturnProduct={setReturnProduct}
          dataSource={dataSource}
        />
      )}
    </FlexBox>
  );
}
