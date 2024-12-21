import React from 'react'

import OptionButton from '@/components/buttons/OptionButton'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { MousePointerClick, Webhook } from 'lucide-react'

const SelectWorkflowTrigger = () => {
  return (
    <div className='flex flex-col gap-3 px-3 py-5'>
      <Label className="uppercase text-lg">
        Choose a trigger
      </Label>
      <Separator />

      <div className="flex flex-col gap-3">
        <OptionButton Icon={MousePointerClick}>
          <div>
            <Label className='uppercase text-base'>Manual</Label>
            <p>Small description about manual</p>
          </div>

        </OptionButton>
        <OptionButton Icon={Webhook}>
          <div>
            <Label className='uppercase text-base'>Webhook</Label>
            <p>Small description about manual</p>
          </div>

        </OptionButton>

      </div>



    </div>
  )
}

export default SelectWorkflowTrigger