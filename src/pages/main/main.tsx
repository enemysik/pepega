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
  deleteWorkRemote
} from '../../features/main/actions';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Tree from '../../components/tree/tree';
import { WeekTabs } from '../../components/week-tabs/week-tabs';
import { Work } from '../../components/work/work';

export class MainPage extends React.Component<IMainPageProps> {
  componentDidMount() {
    this.props.fetchGlobalTree();
    this.props.fetchDateWorks(this.props.selectedDate);
  }
  render(): JSX.Element {
    const works = Object.values(this.props.works)
      .sort((a, b) => a.id === 0 ? -1 : b.id === 0 ? 1 : -(a.id - b.id))
      .map(w =>
        <Work
          key={w.id}
          work={w}
          onWorkChange={(w) => this.props.updateWork(w)}
          onDelete={() => this.props.deleteWorkRemote(w.id)}
          onWorkChangeRemote={(w) => w.id === 0 ? this.props.createNewWorkRemote(w) : this.props.updateWorkRemote(w)}
        />)
    return (<main className="row">
      <div className="col-md-6">
        <header>
          <button
            onClick={e => this.props.createNewWork({
              id: 0,
              name: '',
              description: '',
              startDate: this.props.selectedDate.toJSON(),
              taskId: this.props.selectedNodeId,
              times: [{
                id: 0,
                startTime: this.props.selectedDate.toJSON(),
                endTime: this.props.selectedDate.toJSON()
              }]
            })}
            disabled={this.props.selectedNodeId === 0}
            className="btn btn-outline-success">+</button>
          {/* <button disabled={this.props.selectedNodeId === 0} className="btn btn-outline-danger">-</button> */}
        </header>
        <Tree selectedNodeId={this.props.selectedNodeId} setSelectedNode={id => { this.props.setSelectedGlobalTreeNode(id) }} tree={this.props.globalTree} />
      </div>
      <div className="col-md-6">
        <WeekTabs selectedDate={this.props.selectedDate} onSelectedDateChange={this.props.setSelectedDate} />
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
};
const connector = connect(mapState, mapDispatch);
type IMainPageProps = ConnectedProps<typeof connector>;
export default connector(MainPage);