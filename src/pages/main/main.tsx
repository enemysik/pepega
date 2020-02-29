import React from 'react';
import { fetchGlobalTree, setSelectedGlobalTreeNode, clearSelectedGlobalTreeNode } from '../../features/main/actions';
import { RootState } from '../../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Tree from '../../components/tree/tree';

export class MainPage extends React.Component<IMainPageProps> {
  componentDidMount() {
    this.props.fetchGlobalTree();
  }
  render(): JSX.Element {
    return (<div>
      <Tree setSelectedNode={id => {this.props.clearSelectedGlobalTreeNode(); this.props.setSelectedGlobalTreeNode(id)}} tree={this.props.globalTree} />
    </div>);
  }
}
const mapState = (state: RootState) => ({
  globalTree: state.main.globalTree
});
const mapDispatch = { fetchGlobalTree, setSelectedGlobalTreeNode, clearSelectedGlobalTreeNode };
const connector = connect(mapState, mapDispatch);
type IMainPageProps = ConnectedProps<typeof connector>;
export default connector(MainPage);