import { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { ResourcesData } from '../../resources';
import { ResourceItem } from '../../components/resourceItem/ResourceItem';
import './Resources.css';

export const Resources = () => {
  const [query, setQuery] = useState('');
  const filtered = ResourcesData.map((group) => ({
    ...group,
    items: group.items
      .map((item) => ({
        ...item,
        res: item.res.filter(
          (r) => r.name.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((item) => item.res.length > 0),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="page resources-page">
      <div className="container">
        <div className="resources-page__head">
          <span className="eyebrow"><Globe size={14} /> Curated links</span>
          <h1 className="h2">Learning resources</h1>
          <p className="lead text-balance">A hand-picked collection of websites, channels, and tools to accelerate your learning beyond our courses.</p>
        </div>

        <div className="resources-page__search">
          <Search size={18} />
          <input type="search" placeholder="Filter resources by name or topic..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Filter resources" />
        </div>

        {filtered.length > 0 ? (
          filtered.map((data) => <ResourceItem key={data.id} ourData={data} />)
        ) : (
          <div className="empty-state">
            <Search size={40} />
            <h3>No resources match "{query}"</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
