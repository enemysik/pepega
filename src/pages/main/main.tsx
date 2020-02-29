import React from 'react';
import { fetchGlobalTree, setSelectedGlobalTreeNode, clearSelectedGlobalTreeNode, createNewWork } from '../../features/main/actions';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Tree from '../../components/tree/tree';
import { WeekTabs } from '../../components/week-tabs/week-tabs';

export class MainPage extends React.Component<IMainPageProps> {
  componentDidMount() {
    this.props.fetchGlobalTree();
  }
  render(): JSX.Element {
    return (<main className="row">
      <div className="col-md-6">
        <header>
          <button onClick={e => this.props.createNewWork()} disabled={this.props.selectedNodeId === 0} className="btn btn-outline-success">+</button>
          {/* <button disabled={this.props.selectedNodeId === 0} className="btn btn-outline-danger">-</button> */}
        </header>
        <Tree selectedNodeId={this.props.selectedNodeId} setSelectedNode={id => { this.props.setSelectedGlobalTreeNode(id) }} tree={this.props.globalTree} />
      </div>
      <div className="col-md-6">
        <WeekTabs />
      </div>
    </main>);
  }
}
const mapState = (state: RootState) => ({
  globalTree: state.main.globalTree,
  selectedNodeId: state.main.globalTreeSelectedNodeId
});
const mapDispatch = { fetchGlobalTree, setSelectedGlobalTreeNode, clearSelectedGlobalTreeNode, createNewWork };
const connector = connect(mapState, mapDispatch);
type IMainPageProps = ConnectedProps<typeof connector>;
export default connector(MainPage);