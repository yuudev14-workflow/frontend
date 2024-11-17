"use client"

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { Button } from '@/components/ui/button'
import WorkflowService from '@/services/worfklows/workflows'
import { useQuery } from '@tanstack/react-query'
import { Node } from '@xyflow/react'
import React, { useMemo } from 'react'

const Page: React.FC<{ params: Promise<{ workflow_id: string }> }> = ({ params }) => {
  const { workflow_id: workflowId } = React.use(params)

  const workflowQuery = useQuery({
    queryKey: ['workflow-' + workflowId], queryFn: async () => {
      return WorkflowService.getWorkflowById(workflowId)
    }
  })

  const nodes: Node[] = useMemo(() => {
    if (workflowQuery.data === undefined || !Array.isArray(workflowQuery.data.tasks)) return []
    return workflowQuery.data.tasks.map((task) => {
      const data: Node = {
        id: task.id,
        data: { 
          label: task.name },
        position: { x: task.x, y: task.y },
        type: task.name === "start" ? "input" : "playbookNodes",
      }
      return data
    })

  }, [workflowQuery.data])


  const edges = useMemo(() => {
    if (workflowQuery.data === undefined || !Array.isArray(workflowQuery.data.edges)) return []
    return workflowQuery.data.edges.map((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.destination_id,
    }))

  }, [workflowQuery.data])


  if (workflowQuery.data === undefined) {
    return
  }

  return (
    <React.Fragment>
      <div className="py-3 px-5 flex justify-between items-center h-16">
        <p className="font-medium text-xl">{workflowQuery.data.name}</p>
        <div className="flex gap-2">
          <Button>Trigger</Button>
          <Button>Delete</Button>
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)]">
        <ReactFlowPlayground flowProps={{
          defaultNodes: nodes,
          defaultEdges: edges,
        }} />
      </div>
    </React.Fragment>
  )
}

export default Page