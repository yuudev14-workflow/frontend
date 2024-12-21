"use client"

import React from 'react'

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { PlaybookTaskNode } from '@/components/react-flow/schema'

import { Button } from '@/components/ui/button'
import ConnectorOperation from '../../_components/ConnectorOperation'
import SelectWorkflowTrigger from '../../_components/SelectWorkflowTrigger'


const Page = () => {
  return (
    <div className='relative h-full'>
      <div className='absolute flex flex-col max-w-[500px] w-full bg-background border-r border-r-border h-full top-0 left-0 z-50 px-3 py-5'>
        <SelectWorkflowTrigger />
      </div>
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
            defaultNodes: [
              {
                id: "start",
                data: { label: "start", },
                position: { x: 600, y: 300 },
                type: "input",
                // className: "nospan"
              }
            ],
            defaultEdges: [],
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