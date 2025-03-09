import React, { useContext, useState } from 'react'
import OptionButton from '@/components/buttons/OptionButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ConnectorService from '@/services/connectors/connectors'
import { useQuery } from '@tanstack/react-query'
import { Inspect } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ConnectorInfo, Operation } from '@/services/connectors/connectors.schema'
import OperationLayout from '../OperationLayout'
import { WorkflowOperationContext } from '../../_providers/WorkflowOperationProvider'



const ConnectorsOption = () => {
  const [connector, setConnector] = useState<ConnectorInfo | null>(null)
  const { setTaskOperation } = useContext(WorkflowOperationContext)
  if (connector === null) return (
    <OperationLayout backHandler={() => {
      setConnector(null)
      setTaskOperation(null)
    }}>
      <ConnectorList setConnector={setConnector} />
    </OperationLayout>
  )
  return (
    <OperationLayout backHandler={() => {
      setConnector(null)

    }}>
      <ConnectorOperation connector={connector} />
    </OperationLayout>
  )
}

const ConnectorOperation: React.FC<{ connector: ConnectorInfo }> = ({ connector }) => {
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null)

  const onChangeOperationHandler = (value: string) => {
    const filterOperation = connector.operations.filter(operation => value === operation.annotation)
    setCurrentOperation(filterOperation[0] ?? null)
  }
  return (
    <>
      <div className='flex-1 flex flex-col gap-3 p-3'>
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
            <Select onValueChange={onChangeOperationHandler}>
              <SelectTrigger>
                <SelectValue placeholder="Select Operation" />
              </SelectTrigger>
              <SelectContent className='bg-background'>
                {connector.operations.map((operation) => (
                  <SelectItem value={operation.annotation} key={`connector-operation-${operation.title}`}>{operation.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator className='bg-secondary' />

          {currentOperation && currentOperation.parameters && (
            <div className='flex flex-col gap-4'>
              <Label className='text-lg'>
                Parameters
              </Label>
              <div className='flex flex-col gap-4'>
                {currentOperation.parameters.map(param => (
                  <div className='flex flex-col gap-2' key={`connector-operation-${param.title}`}>
                    <Label className="font-normal">
                      {param.title}
                    </Label>
                    {param.type === "text" && (
                      <Input placeholder={param.placeholder} />
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='mt-auto border-t border-border border p-3'>
        <div className="flex justify-end gap-2">
          <Button>Close</Button>
          <Button>Save</Button>
        </div>
      </footer>

    </>
  )
}

const ConnectorList: React.FC<{ setConnector: React.Dispatch<React.SetStateAction<ConnectorInfo | null>> }> = ({ setConnector }) => {
  const connectorQuery = useQuery({
    queryKey: ['connectors-lists'], queryFn: async () => {
      return ConnectorService.getConnectors()
    }
  })
  return (
    <div className='flex-1 flex flex-col gap-3 p-3'>
      <div className='flex flex-col gap-2'>
        <Label className="font-normal">
          Step Name
        </Label>
        <Input />
      </div>

      <ul>
        {connectorQuery.data && connectorQuery.data.map(con => (
          <li key={con.id}>
            <OptionButton
              key={`select-task-option-`}
              Icon={Inspect}
              buttonClass='h-[64px] w-full'
              onClick={() => setConnector(con)}>
              <div className='flex-1 flex gap-2 items-center h-full'>
                <Label className='capitalize text'>{con.name}</Label>
              </div>
            </OptionButton>
          </li>

        ))}


      </ul>
    </div>
  )
}

export default ConnectorsOption