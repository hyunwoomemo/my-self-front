"use client"
import React, { useState } from 'react';
import AddressAutocomplete from './AddressAutocomplete';
import styles from './DaumPostcodeContainer.module.scss';

interface Address {
  address_name: string;
}

const fetchAddresses = async (query: string): Promise<Address[]> => {
  const response = await fetch(`/api/searchAddress?query=${query}`);
  if (!response.ok) {
    throw new Error('주소 검색에 실패했습니다.');
  }
  const data = await response.json();
  return data.documents || [];
};

const renderAddressItem = (address: Address) => (
  <div>{address.address_name}</div>
);

const DaumPostcodeContainer = () => {
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]); 

  // 주소 선택 핸들러
  const handleAddressSelect = (address: Address) => {
    setSelectedAddresses((prev) => {
      if (prev.length < 3) {
        return [...prev, address.address_name]; // 주소 추가
      } else {
        alert('최대 3개의 주소만 선택 가능합니다.'); 
        return prev;
      }
    });
  };

  return (
    <div className={styles.container}>
      <AddressAutocomplete
        fetchData={fetchAddresses} // 데이터 검색 함수
        onSelect={handleAddressSelect} // 주소 선택 핸들러
        renderItem={renderAddressItem} // 주소 항목 렌더링 함수
      />
      <div className={styles.selectedAddresses}>
        {selectedAddresses.map((address, index) => (
          <p key={index}>{address}</p> // 선택된 주소 목록
        ))}
      </div>
    </div>
  );
};

export default DaumPostcodeContainer;