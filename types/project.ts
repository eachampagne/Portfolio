type TechStack = {
  languages: string[],
  frontend: string[],
  backend: string[],
  other?: string[],
  development: string[]
}

export type Project = {
  name: string,
  hidden: boolean,
  link?: string,
  repository: string,
  dates: {
    start: string,
    end: string
  },
  techstack: TechStack,
  description: string,
  bullets: string[]
}