import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AddressAutocomplete.module.scss'
interface Address {
  address_name: string;
}

interface AutocompleteProps {
  fetchData: (query: string) => Promise<Address[]>;
  onSelect: (address: Address) => void;
  renderItem: (address: Address) => React.ReactNode;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ fetchData, onSelect, renderItem }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Address[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clear = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter') {
      if (results[selectedIndex]) {
        onSelect(results[selectedIndex]);
        clear()
      }
    }
  };

  const handleAddressClick = (address: Address) => {
    onSelect(address);
    clear()
  };

  // 외부 클릭 시 리스트 숨기기
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setResults([]);
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const fetchedAddresses = await fetchData(query);
        setResults(fetchedAddresses);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query, fetchData]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // 외부 클릭 감지
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.autocomplete} ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="주소를 입력하세요"
        className={styles.input}
      />
      {results.length > 0 && (
        <ul className={styles.suggestions}>
          {results.map((address, index) => (
            <li
              key={index}
              onClick={() => handleAddressClick(address)}
              className={selectedIndex === index ? styles.selected : ''}
            >
              {renderItem(address)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;