import React from 'react';
import {
  fetchGlobalTree,
  setSelectedGlobalTreeNode,
  clearSelectedGlobalTreeNode,
  createNewWork,
  setSelectedDate,
  fetchDateWorks,
  updateWorkRemote,
  updateWork,
  createNewWorkRemote,
  deleteWorkRemote,
  deleteTimeRangeRemote,
  createTimeRangeRemote,
  updateTimeRangeRemote,
} from '../../features/main/actions';
import {RootState} from '../../reducers';
import {connect, ConnectedProps} from 'react-redux';
import Tree from '../../components/tree/tree';
import {WeekTabs} from '../../components/week-tabs/week-tabs';
import {Work} from '../../components/work/work';

export class MainPage extends React.Component<IMainPageProps> {
  componentDidMount() {
    this.props.fetchGlobalTree();
    this.props.fetchDateWorks(this.props.selectedDate);
  }
  render(): JSX.Element {
    const works = Object.values(this.props.works)
        .sort((a, b) => a.id === 0 ? -1 : b.id === 0 ? 1 : -(a.id - b.id))
        .map((w) =>
          <Work
            key={w.id}
            work={w}
            onWorkChange={(w) => this.props.updateWork(w)}
            onDelete={() => this.props.deleteWorkRemote(w.id)}
            onWorkChangeRemote={(w) => this.props.updateWorkRemote(w)}
            onDeleteTime={(tId) => this.props.deleteTimeRangeRemote(w.id, tId)}
            onTimeCreate={() => this.props.createTimeRangeRemote({
              workId: w.id,
              time: this.props.selectedDate.toJSON(),
            })}
            onTimeChange={(time) => this.props.updateTimeRangeRemote({workId: w.id, time})}
          />);
    return (<main className="row">
      <div className="col-md-6">
        <header>
          <button
            onClick={() => this.props.createNewWorkRemote(
                this.props.selectedNodeId,
                this.props.selectedDate.toJSON())}
            disabled={this.props.selectedNodeId === 0}
            className="btn btn-outline-success">+</button>
        </header>
        <Tree selectedNodeId={this.props.selectedNodeId}
          setSelectedNode={(id) => {
            this.props.setSelectedGlobalTreeNode(id);
          }} tree={this.props.globalTree} />
      </div>
      <div className="col-md-6">
        <WeekTabs
          selectedDate={this.props.selectedDate}
          onSelectedDateChange={this.props.setSelectedDate} />
        {works}
      </div>
    </main>);
  }
}
const mapState = (state: RootState) => ({
  globalTree: state.main.globalTree,
  selectedNodeId: state.main.globalTreeSelectedNodeId,
  selectedDate: state.main.selectedDate,
  works: state.main.works,

});
const mapDispatch = {
  fetchGlobalTree,
  setSelectedGlobalTreeNode,
  clearSelectedGlobalTreeNode,
  createNewWork,
  setSelectedDate,
  fetchDateWorks,
  updateWorkRemote,
  updateWork,
  createNewWorkRemote,
  deleteWorkRemote,
  deleteTimeRangeRemote,
  createTimeRangeRemote,
  updateTimeRangeRemote,
};
const connector = connect(mapState, mapDispatch);
type IMainPageProps = ConnectedProps<typeof connector>;
export default connector(MainPage);
