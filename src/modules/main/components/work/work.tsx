import React from 'react';
import {IWork} from '../../types';
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
import {OverlayTrigger, Tooltip, Accordion, useAccordionToggle} from 'react-bootstrap';

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
function CustomToggle({eventKey}: {eventKey: string}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {});
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={decoratedOnClick}
    >&#8659;</button>
  );
}

export function Work({work, ...props}: Props) {
  const buildFullWorkName = (name: string, taskId: number): string => {
    const task = props.tasks[taskId];
    name += task.name;
    return task.parentId ? buildFullWorkName(name += '<-', task.parentId) : name;
  };
  return (
    <Accordion>
      <div
        className="card"
        style={{backgroundColor: work.id === 0 ? 'grey' : 'white'}}
      >
        <div className="card-head">
          <div className="input-group">
            <OverlayTrigger
              overlay={(p: any) => <Tooltip {...p}>{buildFullWorkName('', work.taskId)}</Tooltip>}
            >
              <Input
                className="form-control"
                placeholder="Название"
                onChange={(e) => props.onWorkChange({...work, name: e.currentTarget.value})}
                valueChanged={(v) => props.onWorkChangeRemote({...work, name: v as string})}
                value={work.name}
              />
            </OverlayTrigger>
            <div className="input-group-append">
              <button className="btn btn-outline-danger" onClick={() => props.onDelete(work.id)}>&#215;</button>
              <button className="btn btn-outline-success" onClick={() => props.onTimeCreate({
                workId: work.id,
                time: props.selectedDate.toJSON(),
              })}>&#43;</button>
              <CustomToggle eventKey={work.id.toString()}/>
            </div>
          </div>

        </div>
        <Accordion.Collapse eventKey={work.id.toString()}>
          <div className="card-body">
            <Textarea
              className="form-control mb-2"
              placeholder="Описание"
              onChange={(e) => props.onWorkChange({...work, description: e.currentTarget.value})}
              valueChanged={(v) => props.onWorkChangeRemote({...work, description: v as string})}
              value={work.description || ''}
            />
            <div>
              {work.times.slice().sort((a, b) => a.id - b.id).map((wt) => <WorkTime
                key={wt.id}
                workTime={wt}
                onChange={(time) => props.onTimeChange({workId: work.id, time})}
                onDeleteTime={() => props.onDeleteTime(work.id, wt.id)}
              />)}
            </div>
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
}

export default connector(Work);
