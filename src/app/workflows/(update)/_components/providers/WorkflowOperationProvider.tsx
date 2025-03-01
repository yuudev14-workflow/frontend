import React, { createContext, useEffect, useState } from 'react';
import { Edge, Node } from '@xyflow/react'
import { PlaybookTaskNode } from '@/components/react-flow/schema';
import { UseQueryResult } from '@tanstack/react-query';
import { Edges, Tasks, Workflow } from '@/services/worfklows/workflows.schema';

export type WorkflowOperationType = {
  nodes: Node<PlaybookTaskNode>[]
  setNodes: React.Dispatch<React.SetStateAction<Node<PlaybookTaskNode>[]>>
  edges: Edge[]
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

export const WorkflowOperationContext = createContext<WorkflowOperationType>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
});


const WorkflowOperationProvider: React.FC<{ children: any, workflowQuery: UseQueryResult<Workflow, Error> }> = ({ children, workflowQuery }) => {
  const [nodes, setNodes] = useState<Node<PlaybookTaskNode>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const setMappedNodes = (task: Tasks) => {
    const data: Node<PlaybookTaskNode> = {
      id: task.id,
      data: task.name === "start" ? { label: "start", ...task } : task,
      position: { x: task.x, y: task.y },
      type: task.name === "start" ? "input" : "playbookNodes",
    }

    return data
  }

  const setMappedEdges = (edge: Edges) => ({
    id: edge.id,
    source: edge.source_id,
    target: edge.destination_id,
  })

  useEffect(() => {
    setNodes(workflowQuery.data?.tasks?.map(setMappedNodes) ?? [])
    setEdges(workflowQuery.data?.edges?.map(setMappedEdges) ?? [])

  }, [workflowQuery.isFetched])
  return (
    <WorkflowOperationContext.Provider value={{
      nodes,
      setNodes,
      edges,
      setEdges,
    }}>
      {children}
    </WorkflowOperationContext.Provider>
  )
}

export default WorkflowOperationProvider