import 'moment/locale/ru';
import moment from 'moment';
moment.locale('ru');

interface IDay {
  /** JS Date object */
  date: Date;
  /** Date short name */
  day: string;
  /** result of date.toLocalDateString() */
  dateString: string;
  /** is date selected */
  active: boolean;
}

export function buildDays(date: Date): IDay[] {
  const selectedMoment = moment(date);
  const tmp = moment(date).startOf('week');
  const week: IDay[] = [];
  week.push({
    day: tmp.format('ddd'),
    date: tmp.toDate(),
    dateString: tmp.toDate().toLocaleDateString(),
    active: selectedMoment.isSame(tmp, 'day'),
  });
  for (let i = 0; i < 6; i++) {
    tmp.add('day', 1);
    week.push({
      day: tmp.format('ddd'),
      date: tmp.toDate(),
      dateString: tmp.toDate().toLocaleDateString(),
      active: selectedMoment.isSame(tmp, 'day'),
    });
  }
  return week;
}
