import { ReactFlow, Controls, Background, ReactFlowProps, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const ReactFlowPlayground: React.FC<{
  flowProps: ReactFlowProps<Node, Edge>
}> = ({ flowProps }) => {
  return (
    <div className='h-full w-full'>
      <ReactFlow {...flowProps}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default ReactFlowPlayground