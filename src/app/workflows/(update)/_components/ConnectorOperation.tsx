import React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const ConnectorOperation = () => {
  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <Label className="font-normal">
            Step Name
          </Label>
          <Input />
        </div>

        <Separator className='bg-secondary' />

        <div className='py-7'>
          <p>connector information</p>
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

    </>
  )
}

export default ConnectorOperation