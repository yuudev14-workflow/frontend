"use client"

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { Button } from '@/components/ui/button'
import WorkflowService from '@/services/worfklows/workflows'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useQuery } from '@tanstack/react-query'
import { Node } from '@xyflow/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Tasks } from '@/services/worfklows/workflows.schema'

const Page: React.FC<{ params: Promise<{ workflow_id: string }> }> = ({ params }) => {
  const { workflow_id: workflowId } = React.use(params)
  const [isOpenPlaybookInfo, setIsOpenPlaybookInfo] = useState<boolean>(false)
  const [currentNode, setCurrentNode] = useState<Tasks | null>(null)

  const workflowQuery = useQuery({
    queryKey: ['workflow-' + workflowId], queryFn: async () => {
      return WorkflowService.getWorkflowById(workflowId)
    }
  })

  useEffect(() => {
    if (!isOpenPlaybookInfo) setCurrentNode(null)
  }, [isOpenPlaybookInfo])



  const nodes: Node<Tasks | { label: string }>[] = useMemo(() => {
    if (workflowQuery.data === undefined || !Array.isArray(workflowQuery.data.tasks)) return []
    return workflowQuery.data.tasks.map((task) => {
      const data: Node<Tasks | { label: string }> = {
        id: task.id,
        data: task.name === "start" ? { label: "start" } : task,
        position: { x: task.x, y: task.y },
        type: task.name === "start" ? "input" : "playbookNodes",
        // className: "nospan"
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
          <Sheet open={isOpenPlaybookInfo} onOpenChange={setIsOpenPlaybookInfo}>
            <SheetContent side="right" className='min-w-[600px]'>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)]">
        <ReactFlowPlayground<Tasks | { label: string }>
          flowProps={{
            defaultNodes: nodes,
            defaultEdges: edges,
            nodesDraggable: false,
            onNodeDoubleClick: (_, node) => {
              setCurrentNode(node.data as Tasks)
              setIsOpenPlaybookInfo(true)
            }
          }} />
      </div>

    </React.Fragment>
  )
}

export default Page