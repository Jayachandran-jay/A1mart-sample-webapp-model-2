import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchPages, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredPages = query.trim()
    ? searchPages.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    : searchPages.slice(0, 8);

  const handleSelect = (pageId) => {
    navigate(pageId);
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredPages.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredPages.length) % filteredPages.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredPages[selectedIndex]) {
        handleSelect(filteredPages[selectedIndex].id);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="modal-dialog cmd-palette" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={20} color="var(--primary)" />
          <input
            ref={inputRef}
            className="cmd-input"
            type="text"
            placeholder="Search pages, modules, reports... (e.g. Products, Payroll, Accounts)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="icon-action-btn"
            style={{ width: '28px', height: '28px' }}
            onClick={() => setIsSearchOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <div className="cmd-results-list">
          {filteredPages.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matching pages found for "{query}".
            </div>
          ) : (
            filteredPages.map((page, index) => (
              <div
                key={page.id + index}
                className={`cmd-result-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => handleSelect(page.id)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: selectedIndex === index ? 'var(--primary)' : 'var(--border-subtle)'
                    }}
                  />
                  <span>{page.label}</span>
                </div>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

