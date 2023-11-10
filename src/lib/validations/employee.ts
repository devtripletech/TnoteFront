import { z } from "zod"

export const employeeHoursSchema = z.object({
  ID_horario: z.number(),
  Nome: z.string(),
})
export const employeeCitySchema = z.object({
  Codigo_Cidade: z.number(),
  Cidade: z.string(),
})

export const employeePositionSchema = z.object({
  ID_Cargo: z.string(),
})
export const technicalManagerSchema = z.object({
  gerenteTecnico: z.string(),
  Nome: z.string(),
})

export const employeeSchema = z.object({
  ID_funcionario: z.string(),
  Nome: z.string(),
  flexivel: z.boolean(),
  inativo: z.boolean(),
  ID_horario: z.number(),
  ID_empresa: z.number().optional(),
  gerente: z.string(),
  ID_cliente: z.number().optional(),
  ID_Cargo: z.string(),
  socio: z.boolean(),
  contrato: z.string(),
  Cidade_Atua: z.number().optional(),
  Codigo_cidade: z.number(),
  nivel: z.string(),
  ID_projeto: z.number().optional(),
  horario_12_36: z.boolean(),
  subnivel: z.string(),
  Salario: z.number().optional(),
  adm: z.boolean(),
  corte_lancamentos: z.number().optional(),
  permite_corte: z.number(),
})

export type Employee = z.infer<typeof employeeSchema>

export type TechnicalManager = z.infer<typeof technicalManagerSchema>

export type EmployeeHours = z.infer<typeof employeeHoursSchema>

export type EmployeeCity = z.infer<typeof employeeCitySchema>

export type EmployeePosition = z.infer<typeof employeePositionSchema>
