import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CourseItem } from '../../components/courseItem/CoursesItem';
import { fetchCourses } from '../../api';
import './Courses.css';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Programming', 'Data', 'Tools'];
const SORTS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'newest', label: 'Newest' },
];

export const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    setLoading(true);
    fetchCourses({ category, search })
      .then((data) => {
        const sorted = [...(data || [])];
        if (sort === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        else if (sort === 'newest') sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        else sorted.sort((a, b) => (b.enrolled_count || 0) - (a.enrolled_count || 0));
        setCourses(sorted);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [category, search, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    const v = e.target.elements.q.value.trim();
    setSearch(v);
    setSearchParams(v ? { search: v } : {});
  };

  const activeFilters = (category !== 'All' ? 1 : 0) + (search ? 1 : 0);

  const clearFilters = () => {
    setCategory('All');
    setSearch('');
    setSort('popular');
    setSearchParams({});
  };

  return (
    <div className="page courses-page">
      <div className="container">
        <div className="courses-page__head">
          <span className="eyebrow">Catalog</span>
          <h1 className="h2">Explore courses</h1>
          <p className="lead text-balance">Browse our growing library of courses across frontend, backend, data, and more. Find your next skill.</p>
        </div>

        <div className="courses-page__controls">
          <form className="courses-page__search" onSubmit={handleSearch}>
            <Search size={18} />
            <input name="q" placeholder="Search by title or topic..." defaultValue={search} aria-label="Search courses" />
            {search && (
              <button type="button" className="courses-page__clear" onClick={() => { setSearch(''); setSearchParams({}); }} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </form>
          <div className="courses-page__sort">
            <SlidersHorizontal size={16} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="courses-page__filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
          {activeFilters > 0 && (
            <button className="courses-page__reset" onClick={clearFilters}>
              <X size={14} /> Clear
            </button>
          )}
        </div>

        <p className="courses-page__count">
          {loading ? 'Loading...' : `${courses.length} course${courses.length === 1 ? '' : 's'}`}
        </p>

        {loading ? (
          <div className="auto-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 360 }} />)}
          </div>
        ) : courses.length ? (
          <div className="auto-grid stagger">
            {courses.map((c) => <CourseItem key={c.id} course={c} />)}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} />
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn btn-secondary" onClick={clearFilters}>Reset filters</button>
          </div>
        )}
      </div>
    </div>
  );
};
