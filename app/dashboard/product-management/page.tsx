import React from 'react';
import { Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const page = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button type="primary" icon={<PlusCircleFilled />} size={'large'}>
            Add Product
          </Button>
      </div>
    </div>
  );
};

export default page;