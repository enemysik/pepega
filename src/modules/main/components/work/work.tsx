import React, {Component, ReactNode} from 'react';
import {IWork, IWorkTime} from '../../types';
import {WorkTime} from './work-time';
import {withChangeEvent} from '../../../../core/hoc/witch-change-event';
import {fromHtml} from '../../../../core/hoc/from-html';
import {RootState} from '../../../../reducers';
import {
  deleteWorkRemote,
  updateWorkRemote,
  updateTimeRangeRemote,
  createTimeRangeRemote,
  deleteTimeRangeRemote,
  updateWork,
} from '../../actions';
import {connect, ConnectedProps} from 'react-redux';

const Input = withChangeEvent(fromHtml('input'));
const Textarea = withChangeEvent(fromHtml('textarea'));

const mapState = (state: RootState) => ({
  tasks: state.modules.main.tree.tasks,
  selectedDate: state.modules.main.selectedDate,
});
const mapDispatch = {
  onDelete: deleteWorkRemote,
  onWorkChangeRemote: updateWorkRemote,
  onWorkChange: updateWork,
  onDeleteTime: deleteTimeRangeRemote,
  onTimeCreate: createTimeRangeRemote,
  onTimeChange: updateTimeRangeRemote,
};
const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector> & {
  work: IWork;
}
export function Work({work, ...props}: Props) {
  return (
    <div
      className="card"
      style={{backgroundColor: work.id === 0 ? 'grey' : 'white'}}
    >
      <div className="card-head">
        <Input
          className="form-control"
          placeholder="Название"
          onChange={(e) => props.onWorkChange({...work, name: e.currentTarget.value})}
          valueChanged={(v) => props.onWorkChangeRemote({...work, name: v as string})}
          value={work.name}
        />
        <button className="btn btn-outline-danger" onClick={() => props.onDelete(work.id)}>Delete</button>
        <button className="btn btn-outline-success" onClick={() => props.onTimeCreate({
          workId: work.id,
          time: props.selectedDate.toJSON(),
        })}>Add time</button>
      </div>
      <div className="card-body">
        <Textarea
          className="form-control"
          placeholder="Описание"
          onChange={(e) => props.onWorkChange({...work, description: e.currentTarget.value})}
          valueChanged={(v) => props.onWorkChangeRemote({...work, description: v as string})}
          value={work.description || ''}
        />
      </div>
      <div>
        {work.times.slice().sort((a, b) => a.id - b.id).map((wt) => <WorkTime
          key={wt.id}
          workTime={wt}
          onChange={(time) => props.onTimeChange({workId: work.id, time})}
          onDeleteTime={() => props.onDeleteTime(work.id, wt.id)}
        />)}
      </div>
    </div>
  );
}

export default connector(Work);
