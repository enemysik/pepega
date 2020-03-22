import React, {useEffect, useState} from 'react';
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
// type State = { expanded: number[]}
export function Tree(props: Props) {
  const [expanded, setExpanded] = useState<number[]>([]);
  useEffect(() => {
    console.log('mount');
    const tmp = localStorage.getItem('expandedNodes') || '[]';
    setExpanded(JSON.parse(tmp));
    return function() {
      console.log('unmount');
      localStorage.setItem('expandedNodes', JSON.stringify(expanded));
    };
  }, []);
  const addNodeToCollapsed = async (id: number, isNodeExpanded: boolean) => {
    console.log('addNodeToCollapsed', expanded, isNodeExpanded);
    let newExpanded = [];
    if (isNodeExpanded) {
      newExpanded = expanded.slice();
      newExpanded.push(id);
    } else {
      newExpanded = expanded.filter((e) => e !== id);
    }
    setExpanded(newExpanded);
    localStorage.setItem('expandedNodes', JSON.stringify(newExpanded));
  };
  const generateTree = (nodes: ITreeNode[]) => {
    return nodes.map((node) => {
      return <Node
        id={node.id}
        key={node.id}
        collapsed={expanded.indexOf(node.id) === -1}
        label={props.tasks[node.id].name}
        clicked={props.setSelectedNode}
        checked={props.selectedNodeId === node.id}
        onCollapseChange={(value) => addNodeToCollapsed(node.id, value)}
      >{generateTree(node.children)}</Node>;
    });
  };
  return (<ul className={'tree'}>{generateTree(props.tree)}</ul>);
}


export default connector(Tree);
