import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Edge, Node } from '@xyflow/react'
import { PlaybookTaskNode } from '@/components/react-flow/schema';
import { UseQueryResult } from '@tanstack/react-query';
import { Edges, Tasks, Workflow, WorkflowDataToUpdate } from '@/services/worfklows/workflows.schema';

export type WorkflowOperationType = {
  openOperationSidebar: boolean
  setOpenOperationSidebar: React.Dispatch<React.SetStateAction<boolean>>
  workflowData: WorkflowDataToUpdate
  setWorkflowData: React.Dispatch<React.SetStateAction<WorkflowDataToUpdate>>
  currentNode: Node<PlaybookTaskNode> | null
  setCurrentNode: React.Dispatch<React.SetStateAction<Node<PlaybookTaskNode> | null>>
  nodes: Node<PlaybookTaskNode>[]
  setNodes: React.Dispatch<React.SetStateAction<Node<PlaybookTaskNode>[]>>
  edges: Edge[]
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
  hasTriggerStep: boolean
}

export const WorkflowOperationContext = createContext<WorkflowOperationType>({
  openOperationSidebar: false,
  setOpenOperationSidebar: () => { },
  workflowData: {},
  setWorkflowData: () => { },
  currentNode: null,
  setCurrentNode: () => { },
  nodes: [],
  setNodes: () => { },
  edges: [],
  setEdges: () => { },
  hasTriggerStep: false
});

const INITIAL_START_NODE_VALUE = {
  id: "start",
  data: {
    label: "start", task: {
      name: "start"
    }
  },
  position: { x: 100, y: 100 },
  type: "start",
}


const WorkflowOperationProvider: React.FC<{ children: any, workflowQuery: UseQueryResult<Workflow, Error> }> = ({ children, workflowQuery }) => {
  const [openOperationSidebar, setOpenOperationSidebar] = useState(false)
  const [workflowData, setWorkflowData] = useState<WorkflowDataToUpdate>({})
  const [nodes, setNodes] = useState<Node<PlaybookTaskNode>[]>([])
  const [currentNode, setCurrentNode] = useState<Node<PlaybookTaskNode> | null>(null)
  const [edges, setEdges] = useState<Edge[]>([])

  const setMappedNodes = (task: Tasks) => {
    const data: Node<PlaybookTaskNode> = {
      id: task.id,
      data: task.name === "start" ? { label: "start", task: task } : { task },
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
    const _nodes = workflowQuery.data?.tasks?.map(setMappedNodes) ?? [INITIAL_START_NODE_VALUE]
    if (_nodes.some(task => task.data.task?.name === "start") == false) {
      _nodes.unshift(INITIAL_START_NODE_VALUE)
    }
    setNodes(_nodes)
    setEdges(workflowQuery.data?.edges?.map(setMappedEdges) ?? [])
    if (workflowQuery.data)
      setWorkflowData({
        name: workflowQuery.data.name,
        description: workflowQuery.data.description,
        trigger_type: workflowQuery.data.trigger_type
      })

  }, [workflowQuery.isFetched])

  /**
   * return false if no tasks has a name start
   * else true. We need this to know if we have to show
   * options for the workflow trigger or
   * to select task options
   */
  const hasTriggerStep = useMemo(() => {
    return workflowData.trigger_type != undefined || workflowData.trigger_type != null

  }, [workflowData])
  return (
    <WorkflowOperationContext.Provider value={{
      openOperationSidebar,
      setOpenOperationSidebar,
      workflowData,
      setWorkflowData,
      nodes,
      currentNode,
      setCurrentNode,
      setNodes,
      edges,
      setEdges,
      hasTriggerStep
    }}>
      {children}
    </WorkflowOperationContext.Provider>
  )
}

export default WorkflowOperationProvider