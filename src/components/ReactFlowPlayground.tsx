import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
function ReactFlowPlayground() {
  return (
    <div className='h-full w-full'>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
 
export default ReactFlowPlayground