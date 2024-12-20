"use client"

import React from 'react'

import ReactFlowPlayground from '@/components/react-flow/ReactFlowPlayground'
import { PlaybookTaskNode } from '@/components/react-flow/schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'


const Page = () => {
  return (
    <div className='relative h-full'>
      <div className='absolute flex flex-col max-w-[500px] w-full bg-muted h-full top-0 left-0 z-50 px-3 py-5'>
        <div className='flex flex-col gap-3'

        >
          <div className='flex flex-col gap-2'>
            <Label className="font-normal">
              Step Name
            </Label>
            <Input />
          </div>

          <Separator className='bg-secondary' />

          <div className='py-7'>
            <p>connector informatin</p>
          </div>
          <Separator className='bg-secondary' />
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
              <Label className="font-normal">
                Configuration
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className='bg-background'>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className='bg-secondary' />
            <div className='flex flex-col gap-2'>
              <Label className="font-normal">
                Operation
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className='bg-background'>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className='bg-secondary' />

            <div className='flex flex-col gap-4'>
              <Label className='text-lg'>
                Parameters
              </Label>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label className="font-normal">
                    Step Name
                  </Label>
                  <Input />
                </div><div className='flex flex-col gap-2'>
                  <Label className="font-normal">
                    Step Name
                  </Label>
                  <Input />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label className="font-normal">
                    Step Name
                  </Label>
                  <Input />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label className="font-normal">
                    Step Name
                  </Label>
                  <Input />
                </div>

              </div>

            </div>

          </div>
        </div>
        <footer className='mt-auto border-t border-border border'>
          <div className="flex gap-2">
            <Button>Trigger</Button>
            <Button>Delete</Button>

          </div>
        </footer>





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