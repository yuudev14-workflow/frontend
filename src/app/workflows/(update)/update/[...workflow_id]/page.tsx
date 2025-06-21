"use client"

import React, { useContext } from 'react'

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { PlaybookTaskNode } from '@/components/react-flow/schema'
import { Node, ReactFlowProvider } from '@xyflow/react'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import WorkflowService from '@/services/worfklows/workflows'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { Workflow } from '@/services/worfklows/workflows.schema'
import WorkflowOperationProvider, { WorkflowOperationContext } from '../../_providers/WorkflowOperationProvider'
import WorkflowOperations from '../../_components/options/WorkflowOperations/WorkflowOperations'




const Page: React.FC<{ params: Promise<{ workflow_id: string }> }> = ({ params }) => {
  const { workflow_id: workflowId } = React.use(params)


  const workflowQuery = useQuery({
    queryKey: ['workflow-' + workflowId, workflowId], queryFn: async () => {
      return WorkflowService.getWorkflowById(workflowId)
    }
  })

  if (workflowQuery.isLoading) {
    return null
  }

  return (
    <ReactFlowProvider >
      <WorkflowOperationProvider workflowQuery={workflowQuery}>
        <WorkflowPlayground workflowQuery={workflowQuery} />
      </WorkflowOperationProvider>

    </ReactFlowProvider>


  )
}

const WorkflowPlayground: React.FC<{ workflowQuery: UseQueryResult<Workflow, Error> }> = ({ workflowQuery }) => {
  const { 
    nodes,
    hasTriggerStep,
    onNodesChange,
    onConnect,
    onConnectEnd,
    edges,
    onEdgesChange,
    setCurrentNode,
    setOpenOperationSidebar,
    setConnector,
    connectorQuery,
    setTaskOperation,
    openOperationSidebar } = useContext(WorkflowOperationContext);
  
  // set the connector to the node's connector
  // can improve later
  const setConnectorToNodesConnector = (node: Node<PlaybookTaskNode>) => {
    if (connectorQuery && node.data.connector_name) {
        for (let _connector of connectorQuery?.data || []) {
          console.log(_connector.name, "yuuu")
          if (_connector.name == node.data.connector_name) {
            setConnector(_connector || null)
            setTaskOperation("connector")
            break
          }
        }
      }
  }


  const onNodeDoubleClickHandler = (e: React.MouseEvent<Element, MouseEvent>, node: Node<PlaybookTaskNode>) => {
    setOpenOperationSidebar(true)
    if (node.id !== "select_start") {
      
      setCurrentNode(node)
      setConnectorToNodesConnector(node)
      
    }
    console.log(node)
  }

  return (
    <div className='relative h-[calc(100vh-4rem)]'>
      {/* <div className='absolute flex flex-col bg-background border-r border-r-border top-40 left-0 z-50'>
        <Button className="rounded-e-2xl" onClick={() => setOpenOperationSidebar(true)}>
          <ArrowRightIcon />
        </Button>
      </div> */}
      {
        openOperationSidebar && <WorkflowOperations />
      }


      <div className="py-3 px-5 flex justify-between items-center h-16">
        <p className="font-medium text-xl">Name</p>
        <div className="flex gap-2">
          <Button>Trigger</Button>
          <Button>Delete</Button>
          <Button>Save</Button>
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)]">
        <ReactFlowPlayground<PlaybookTaskNode>
          flowProps={{
            nodes,
            edges,
            onNodeDoubleClick: onNodeDoubleClickHandler,
            onNodesChange: (changes) => {
              console.log(changes)
              onNodesChange(changes)
            },
            onEdgesChange,
            onConnect,
            onConnectEnd
          }} />

      </div>
    </div>

  )
}

export default Page