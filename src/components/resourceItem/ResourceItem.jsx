import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import './ResourceItem.css';

export function ResourceItem({ ourData }) {
  return (
    <div className="resource-group">
      <h2 className="resource-group__title h3">{ourData.name}</h2>
      <div className="resource-group__grid">
        {ourData.items.map((item) => (
          <div key={item.name} className="resource-cat card">
            <h3 className="resource-cat__name">{item.name}</h3>
            <ul className="resource-cat__list">
              {item.res.map((res) => (
                <li key={res.id}>
                  <Link to={res.url} target="_blank" rel="noopener noreferrer" className="resource-cat__link">
                    <span>{res.name}</span>
                    <ExternalLink size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
