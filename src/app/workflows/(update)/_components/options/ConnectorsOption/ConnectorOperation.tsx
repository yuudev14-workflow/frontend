import { useState } from "react"
import { ConnectorInfo, Operation } from "@/services/connectors/connectors.schema"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const ConnectorOperation: React.FC<{ connector: ConnectorInfo }> = ({ connector }) => {
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null)

  const onChangeOperationHandler = (value: string) => {
    const filterOperation = connector.operations.filter(operation => value === operation.annotation)
    setCurrentOperation(filterOperation[0] ?? null)
  }
  return (
    <>
      <div className='flex-1 flex flex-col gap-3 p-3 h-full'>
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


export default ConnectorOperation