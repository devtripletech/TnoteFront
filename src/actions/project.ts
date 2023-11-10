"use server"

import getToken from "@/actions/getToken"
import { Client, clientSchema } from "@/lib/validations/client"
import { Project, projectSchema } from "@/lib/validations/project"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export const getProjectsAction = async (): Promise<Project[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`http://54.92.156.236:3000/projetos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      return data
    } catch (error) {
      console.log(error)
    }
  })
}

export const getProjectByIdAction = async (
  projectId: number
): Promise<Project | undefined | null> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(
        `http://54.92.156.236:3000/projetos/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")
      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      return data
    } catch (error) {
      console.log(error)
    }
  })
}

export async function editProjectAction(input: z.infer<typeof projectSchema>) {
  return getToken().then(async (token) => {
    console.log(input)
    try {
      const res = await fetch(
        `http://54.92.156.236:3000/projetos/${input.ID_projeto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      revalidatePath("/dashboard/project")

      return data
    } catch (error) {
      console.log(error)
    }
  })
}
export const addProjectAction = async (
  input: z.infer<typeof projectSchema>
) => {
  console.log(input)
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`http://54.92.156.236:3000/projetos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      revalidatePath("/dashboard/project")

      return data
    } catch (error) {
      console.log(error)
    }
  })
}
