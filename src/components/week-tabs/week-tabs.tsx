import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import 'moment/locale/ru';
moment.locale('ru');

export class WeekTabs extends React.Component<IWeekTabsProps> {
  render() {
    const selectedMoment = moment(this.props.selectedDate);
    const tmp = moment(this.props.selectedDate).startOf('week');
    const week: IDay[] = [];
    week.push({
      day: tmp.format('ddd'),
      date: tmp.toDate(),
      dateString: tmp.toDate().toLocaleDateString(),
      active: selectedMoment.isSame(tmp, 'day')
    });
    for (let i = 0; i < 6; i++) {
      tmp.add('day', 1);
      week.push({
        day: tmp.format('ddd'),
        date: tmp.toDate(),
        dateString: tmp.toDate().toLocaleDateString(),
        active: selectedMoment.isSame(tmp, 'day')
      });
    }
    const tabs = week.map(d => <li key={d.dateString} className="nav-item">
      <span
        className={cn("nav-link", { 'active': d.active })}
        onClick={() => this.props.onSelectedDateChange(d.date)}>
        {d.day}
      </span>
    </li>)
    return (
      <ul className="nav nav-tabs">
        {tabs}
      </ul>
    )
  }
}
interface IWeekTabsProps {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}
interface IDay {
  date: Date;
  day: string;
  dateString: string;
  active: boolean;
}