import React from 'react';
import {
  fetchGlobalTree,
  setSelectedGlobalTreeNode,
  clearSelectedGlobalTreeNode,
  createNewWork,
  changeSelectedDate,
  fetchDateWorks,
  updateWorkRemote,
  updateWork,
  createNewWorkRemote,
  deleteWorkRemote,
  deleteTimeRangeRemote,
  createTimeRangeRemote,
  updateTimeRangeRemote,
} from './actions';
import {RootState} from '../../reducers';
import {connect, ConnectedProps} from 'react-redux';
import Tree from './components/tree/tree';
import {WeekTabs} from './components/week-tabs/week-tabs';
import Work from './components/work/work';

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
  globalTree: state.modules.main.tree.globalTree,
  selectedNodeId: state.modules.main.tree.selectedId,
  selectedDate: state.modules.main.selectedDate,
  works: state.modules.main.works,

});
const mapDispatch = {
  fetchGlobalTree,
  setSelectedGlobalTreeNode,
  clearSelectedGlobalTreeNode,
  createNewWork,
  setSelectedDate: changeSelectedDate,
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
