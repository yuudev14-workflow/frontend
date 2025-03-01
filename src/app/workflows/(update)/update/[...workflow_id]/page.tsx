"use client"

import React, { useMemo } from 'react'

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { PlaybookTaskNode } from '@/components/react-flow/schema'
import { Node } from '@xyflow/react'

import { useQuery } from '@tanstack/react-query'
import WorkflowService from '@/services/worfklows/workflows'
import WorkflowOperations from '../../_components/WorkflowOperations'
import { Button } from '@/components/ui/button'




const Page: React.FC<{ params: Promise<{ workflow_id: string }> }> = ({ params }) => {
  const { workflow_id: workflowId } = React.use(params)

  const workflowQuery = useQuery({
    queryKey: ['workflow-' + workflowId, workflowId], queryFn: async () => {
      return WorkflowService.getWorkflowById(workflowId)
    }
  })

  const nodes: Node<PlaybookTaskNode>[] = useMemo(() => {
    if (workflowQuery.data === undefined || !Array.isArray(workflowQuery.data.tasks)) return []
    return workflowQuery.data.tasks.map((task) => {
      const data: Node<PlaybookTaskNode> = {
        id: task.id,
        data: task.name === "start" ? { label: "start", ...task } : task,
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



  return (
    <div className='relative h-full'>
      <WorkflowOperations workflowQuery={workflowQuery} />
      <div className="py-3 px-5 flex justify-between items-center h-16">
        <p className="font-medium text-xl">Name</p>
        <div className="flex gap-2">
          <Button>Trigger</Button>
          <Button>Delete</Button>
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)]">
        <ReactFlowPlayground<PlaybookTaskNode>
          flowProps={{
            defaultNodes: nodes,
            defaultEdges: edges,
            nodesDraggable: false,
            onNodeDoubleClick: (_, node) => {
              console.log(node)

            }
          }} />

      </div>


    </div>
  )
}

export default Page