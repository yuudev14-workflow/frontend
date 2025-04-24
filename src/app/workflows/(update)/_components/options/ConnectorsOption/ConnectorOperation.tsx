import { useEffect, useState } from "react"
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const taskFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  parameters: z.record(z.string()).nullable().optional(),
  config: z.string().optional(),
  connector_name: z.string(),
  operation: z.string(),
})

const ConnectorOperation: React.FC<{ connector: ConnectorInfo }> = ({ connector }) => {
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null)

  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: "",
      description: "",
      connector_name: connector.name,
    },
  })

  const operationName = taskForm.watch("operation");


  useEffect(() => {
    if (operationName) {
      const matchedOperation = connector.operations.find(
        ops => ops.title === operationName
      );
      setCurrentOperation(matchedOperation ?? null);
      taskForm.setValue("parameters", null)
    }
  }, [operationName]);

  const onChangeOperationHandler = (value: string) => {
    const filterOperation = connector.operations.filter(operation => value === operation.annotation)
    setCurrentOperation(filterOperation[0] ?? null)
  }

  const onSubmit = (val: z.infer<typeof taskFormSchema>) => {
    console.log(val)

  }


  return (
    <Form {...taskForm}>
      <form onSubmit={taskForm.handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <div className='flex-1 flex flex-col gap-3 p-3 h-full'>
          <FormField
            control={taskForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Step Name</FormLabel>
                <FormControl>
                  <Input placeholder="task name" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />


          <Separator className='bg-secondary' />

          <div className='py-7'>
            <p>connector information</p>
          </div>
          <Separator className='bg-secondary' />
          <div className='flex flex-col gap-3'>
            <FormField
              control={taskForm.control}
              name="config"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Configuration</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select configuration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-background'>
                      {connector.configs.map(_config => (
                        <SelectItem value={_config} key={`connector-config-${_config}`}>{_config}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className='bg-secondary' />

            <FormField
              control={taskForm.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select operation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-background'>
                      {connector.operations.map((operation) => (
                        <SelectItem

                          value={operation.annotation}
                          key={`connector-operation-${operation.title}`}
                        >{operation.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className='bg-secondary' />

            {currentOperation && currentOperation.parameters && (
              <FormField
                control={taskForm.control}
                name="parameters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parameters</FormLabel>
                    {currentOperation.parameters.map(param => (
                      <div className='flex flex-col gap-2' key={`connector-operation-${param.title}`}>
                        <Label className="font-normal">
                          {param.title}
                        </Label>
                        {param.type === "text" && (
                          <Input
                            placeholder={param.placeholder}
                            value={field.value?.[param.title] ?? ""}
                            onChange={(e) => {
                              field.onChange({
                                ...(field.value ? field.value : {}),
                                [param.title]: e.target.value
                              })
                            }}
                          />
                        )}

                      </div>
                    ))}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <footer className='mt-auto border-t border-border border p-3'>
          <div className="flex justify-between gap-2">
            <Button type="button">Close</Button>
            <Button>Save</Button>
          </div>
        </footer>
      </form>

    </Form>
  )
}


export default ConnectorOperation