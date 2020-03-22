import React from 'react';
import Node from './node';
import './tree.css';
import {RootState} from '../../../../reducers';
import {ConnectedProps, connect} from 'react-redux';
import {ITreeNode} from './types';

const mapState = (state: RootState) => ({
  tasks: state.modules.main.tree.tasks,
});
const connector = connect(mapState);
type Props = ConnectedProps<typeof connector> & {
  tree: ITreeNode[]
  setSelectedNode: (id: number) => void;
  selectedNodeId: number;
}

export function Tree(props: Props) {
  const generateTree = (nodes: ITreeNode[]) => {
    return nodes.map((node) => {
      return <Node
        id={node.id}
        key={node.id}
        label={props.tasks[node.id].name}
        clicked={props.setSelectedNode}
        checked={props.selectedNodeId === node.id}>{generateTree(node.children)}</Node>;
    });
  };
  return (<ul className={'tree'}>{generateTree(props.tree)}</ul>);
}


export default connector(Tree);
