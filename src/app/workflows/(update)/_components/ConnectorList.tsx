import OptionButton from '@/components/buttons/OptionButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Inspect } from 'lucide-react'
import React from 'react'

const ConnectorList = () => {
  return (
    <div className='flex-1 flex flex-col gap-3 p-3'>
      <div className='flex flex-col gap-2'>
        <Label className="font-normal">
          Step Name
        </Label>
        <Input />
      </div>

      <div>
        <OptionButton key={`select-task-option-`} Icon={Inspect} buttonClass='h-[64px] w-full'>
          <div className='flex-1 flex gap-2 items-center h-full'>
            <Label className='capitalize text'>sdfsdf</Label>
          </div>

        </OptionButton>

      </div>
    </div>
  )
}

export default ConnectorList