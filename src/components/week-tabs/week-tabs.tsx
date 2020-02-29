import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

export class WeekTabs extends React.Component {
  render() {
    const tmp = moment().startOf('week');
    const week: IDay[] = [];
    week.push({
      day: tmp.format('ddd'),
      date: tmp.toDate(),
      dateString: tmp.toDate().toLocaleDateString()
    });
    for (let i = 0; i < 6; i++) {
      tmp.add('day', 1);
      week.push({
        day: tmp.format('ddd'),
        date: tmp.toDate(),
        dateString: tmp.toDate().toLocaleDateString()
      });
    }
    const tabs = week.map(d => <li key={d.dateString} className="nav-item"><span className="nav-link">{d.day}</span></li>)
    return (
      <ul className="nav nav-tabs">
        {tabs}
      </ul>
    )
  }
}
interface IDay {
  date: Date;
  day: string;
  dateString: string;
}