import { Link } from 'react-router-dom';
import { Clock, BarChart3, Users, Star, ArrowRight } from 'lucide-react';
import './CourseItem.css';

export function CourseItem({ course }) {
  const level = course.difficulty || 'Beginner';
  return (
    <Link to={`/courses/${course.slug}`} className="course-card card card-hover">
      <div className="course-card__media">
        <img src={course.image_url} alt={course.title} loading="lazy" />
        <span className={`course-card__level course-card__level--${level.toLowerCase()}`}>{level}</span>
      </div>
      <div className="course-card__body">
        <div className="course-card__meta">
          <span className="course-card__category">{course.category}</span>
          {course.rating > 0 && (
            <span className="course-card__rating">
              <Star size={14} fill="currentColor" /> {Number(course.rating).toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__desc">{course.description}</p>
        <div className="course-card__stats">
          {course.lessons_count > 0 && (
            <span><BarChart3 size={14} /> {course.lessons_count} lessons</span>
          )}
          {course.duration_hours > 0 && (
            <span><Clock size={14} /> {course.duration_hours}h</span>
          )}
          {course.enrolled_count > 0 && (
            <span><Users size={14} /> {course.enrolled_count.toLocaleString()}</span>
          )}
        </div>
        <div className="course-card__cta">
          <span>Start learning</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
