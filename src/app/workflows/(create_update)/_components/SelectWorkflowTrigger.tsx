import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { MousePointerClick, Webhook } from 'lucide-react'
import React from 'react'

const SelectWorkflowTrigger = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Label className="uppercase text-lg">
        Choose a trigger
      </Label>
      <Separator />

      <div className="flex flex-col gap-3">
        <button className='flex gap-4 p-2 bg-muted text-left'>
          <div className='aspect-square bg-primary p-4'>
            <MousePointerClick className="text-primary-foreground" />
          </div>
          <div>
            <Label className='uppercase text-base'>Manual</Label>
            <p>Small description about manual</p>
          </div>

        </button>

        <button className='flex gap-4 p-2 bg-muted text-left'>
          <div className='aspect-square bg-primary p-4'>
            <Webhook className="text-primary-foreground" />
          </div>
          <div>
            <Label className='uppercase text-base'>Webhook</Label>
            <p>Small description about manual</p>
          </div>

        </button>

      </div>



    </div>
  )
}

export default SelectWorkflowTrigger