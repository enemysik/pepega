import React from 'react';
import {buildDays} from './build-days';
import cn from 'classnames';

interface Props {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

export function WeekTabs({selectedDate, onSelectedDateChange}: Props) {
  const week = buildDays(selectedDate);
  const prevWeek = () => {
    const t = new Date(week[0].date);
    t.setDate(week[0].date.getDate() - 7);
    return t;
  };
  const nextWeek = () => {
    const t = new Date(week[6].date);
    t.setDate(week[6].date.getDate() + 1);
    return t;
  };
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <span
          className="nav-link"
          onClick={() => onSelectedDateChange(prevWeek())}
        >P</span>
      </li>
      {
        week.map((d) => <li
          key={d.dateString}
          className="nav-item">
          <span
            className={cn('nav-link', {'active': d.active})}
            onClick={() => onSelectedDateChange(d.date)}>
            {d.day}
          </span>
        </li>)
      }
      <li className="nav-item">
        <span
          className="nav-link"
          onClick={() => onSelectedDateChange(nextWeek())}
        >N</span>
      </li>
    </ul>
  );
}
