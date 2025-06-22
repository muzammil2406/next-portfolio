type skill = {
    name: string,
    image: string,
    category: string,
    color: string,
}

type project = {
    id: any
    title: any
    description: any
    link: any
    featured: boolean
    projects: never[]
    technologies: any
    name: string,
    image: string,
    techstack: string,
    category: string,
    links: {
        visit: string,
        code: string,
        video: string
    }
}

type experience = {
    tech: never[]
    icon: string
    id: string
    duration: any
    role: any
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    desc: string[]
}

type education = {
    tech: never[]
    icon: string
    id: string
    duration: any
    institution: any
    desc: any
    institute: string,
    degree: string,
    startDate: string,
    endDate: string,
}

type main = {
    image: string
    category: string
    color: string
    name: string,
    titles: string[],
    heroImage: string,
    shortDesc: string,
    techStackImages: string[],
}

type about = {
    aboutImage: string,
    aboutImageCaption: string,
    title: string,
    about: string,
    resumeUrl: string,
    callUrl: string
}

type social = {
    name: string,
    icon: string,
    link: string
}

type data = {
    main: main;
    about: about;
    skills: skill[];
    projects: project[];
    experiences: experience[];
    educations: education[];
    socials: social[];
  }
  

export type { data, main, about, skill, project, experience, education, social };