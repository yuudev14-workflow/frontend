"use client"

import React, { useContext, useEffect, useMemo, useState } from 'react'

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { PlaybookTaskNode } from '@/components/react-flow/schema'
import { Edge, Node } from '@xyflow/react'

import { useQuery } from '@tanstack/react-query'
import WorkflowService from '@/services/worfklows/workflows'
import WorkflowOperations from '../../_components/WorkflowOperations'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { Edges, Tasks } from '@/services/worfklows/workflows.schema'
import WorkflowOperationProvider, { WorkflowOperationContext } from '../../_components/providers/WorkflowOperationProvider'




const Page: React.FC<{ params: Promise<{ workflow_id: string }> }> = ({ params }) => {
  const { workflow_id: workflowId } = React.use(params)
  const [openOperationSidebar, setOperationSidebar] = useState(false)

  const workflowQuery = useQuery({
    queryKey: ['workflow-' + workflowId, workflowId], queryFn: async () => {
      return WorkflowService.getWorkflowById(workflowId)
    }
  })

  if (workflowQuery.isLoading) {
    return null
  }

  return (
    <WorkflowOperationProvider workflowQuery={workflowQuery}>
      <div className='relative h-full'>
        <div className='absolute flex flex-col bg-background border-r border-r-border top-40 left-0 z-50'>
          <Button className="rounded-e-2xl" onClick={() => setOperationSidebar(true)}>
            <ArrowRightIcon />
          </Button>
        </div>
        {
          openOperationSidebar && <WorkflowOperations workflowQuery={workflowQuery} setOperationSidebar={setOperationSidebar} />
        }


        <div className="py-3 px-5 flex justify-between items-center h-16">
          <p className="font-medium text-xl">Name</p>
          <div className="flex gap-2">
            <Button>Trigger</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <WorkflowPlayground />
      </div>

    </WorkflowOperationProvider>

  )
}

const WorkflowPlayground: React.FC<{}> = () => {
  const { nodes, edges } = useContext(WorkflowOperationContext);
  return (
    <div className="h-[calc(100vh-8rem)]">
      <ReactFlowPlayground<PlaybookTaskNode>
        flowProps={{
          nodes,
          edges,
          nodesDraggable: false,
          onNodeDoubleClick: (_, node) => {
            console.log(node)

          },
        }} />

    </div>
  )
}

export default Page