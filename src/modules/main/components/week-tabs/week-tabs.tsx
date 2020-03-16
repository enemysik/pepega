import React from 'react';
import {buildDays} from './build-days';
import cn from 'classnames';

interface Props {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

export function WeekTabs({selectedDate, onSelectedDateChange}: Props) {
  const week = buildDays(selectedDate);
  return (
    <ul className="nav nav-tabs">
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
    </ul>
  );
}
