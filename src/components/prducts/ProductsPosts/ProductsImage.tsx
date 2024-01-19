import React from 'react';

const ProductsImage = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '200px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>상품이미지*</h2>
        <p>(0/12)</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'skyblue'
          }}
        >
          <image />
        </div>
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'skyblue'
          }}
        >
          <image />
        </div>
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'skyblue'
          }}
        >
          <image />
        </div>
      </div>
    </div>
  );
};

export default ProductsImage;
