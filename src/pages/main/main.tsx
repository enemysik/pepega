import React from 'react';
import {
  fetchGlobalTree,
  setSelectedGlobalTreeNode,
  clearSelectedGlobalTreeNode,
  createNewWork,
  setSelectedDate,
  fetchDateWorks
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
    const works = this.props.works.map(w => <Work key={w.id} work={w} />)
    return (<main className="row">
      <div className="col-md-6">
        <header>
          <button onClick={e => this.props.createNewWork()} disabled={this.props.selectedNodeId === 0} className="btn btn-outline-success">+</button>
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
  fetchDateWorks
};
const connector = connect(mapState, mapDispatch);
type IMainPageProps = ConnectedProps<typeof connector>;
export default connector(MainPage);