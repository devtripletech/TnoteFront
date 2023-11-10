"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { z } from "zod"
import { catchError, cn, formatDateK } from "@/lib/utils"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

import { Client, clientSchema } from "@/lib/validations/client"

import { Switch } from "../ui/switch"
import { addClientAction, editClientAction } from "@/actions/client"
import { projectSchema } from "@/lib/validations/project"
import { addProjectAction } from "@/actions/project"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { EmployeeSelect } from "../selects/employees-select"
import {
  Employee,
  EmployeeHours,
  TechnicalManager,
  employeeSchema,
} from "@/lib/validations/employee"
import { ClientsSelect } from "../selects/clients-select"
import { EmployeeHoursSelect } from "../selects/employee-hours-select"

const extendedProjectSchema = projectSchema.extend({
  date_start_end: z.object({
    from: z.coerce.date({ required_error: "Selecione a data de inicio" }),
    to: z.coerce.date({ required_error: "Selecione a data de termino" }),
  }),
  projectStatus: z.boolean().default(false).optional(),
})

type Inputs = z.infer<typeof employeeSchema>

interface AddEmployeeFormProps {
  employees: TechnicalManager[]
  clients: Client[]
  employeeHours: EmployeeHours[]
}
export function AddEmployeeForm({
  employees,
  clients,
  employeeHours,
}: AddEmployeeFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      Nome: "",
    },
  })
  console.log(JSON.stringify(form.formState.errors))

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // const res = await addProjectAction(data)

        // toast.success(res.status)
        // console.log(data)

        // form.reset()

        router.push("/dashboard/employee")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="ID_funcionario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Funcionário</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ID_cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <ClientsSelect
                field={field}
                clients={clients}
                form={form}
                name="ID_cliente"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ID_horario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <EmployeeHoursSelect
                field={field}
                form={form}
                name="ID_horario"
                data={employeeHours}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gerente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gerente</FormLabel>
              <EmployeeSelect field={field} employees={employees} form={form} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flexivel"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">flexível</FormLabel>
                <FormDescription>
                  O status do projeto é um índice da situação atual do projeto,
                  em andamento ou concluído.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horario_12_36"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">horário 12 36</FormLabel>
                <FormDescription>
                  O status do projeto é um índice da situação atual do projeto,
                  em andamento ou concluído.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adm"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Admin</FormLabel>
                <FormDescription>
                  O status do projeto é um índice da situação atual do projeto,
                  em andamento ou concluído.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inativo"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status</FormLabel>
                <FormDescription>
                  O status do projeto é um índice da situação atual do projeto,
                  em andamento ou concluído.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Enviar
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
      <Toaster />
    </Form>
  )
}
