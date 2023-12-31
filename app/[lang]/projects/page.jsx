import styles from './Projects.module.css'

import Main from '../(components)/Main'
import { Project } from './(components)/Project'

import dictionary from '@/content'

const VideoYoutube = () => {
  return (
    <iframe style={{ width: '100%' }} height='315' src='https://www.youtube.com/embed/JvGFWqf7DRc?si=mNz-MGuJcZWbKdds' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen />

  )
}

const projectsData = (lang) => {
  const projects = [
    {
      img: <VideoYoutube />,
      title: dictionary[lang]?.projectsCards.first.title,
      subtitle: dictionary[lang]?.projectsCards.first.subtitle,
      description: dictionary[lang]?.projectsCards.first.description
    }
  ]

  return projects
}

export default function Projects ({ params }) {
  const { lang } = params

  const projects = projectsData(lang)

  return (
    <Main className={styles.main}>

      <div className={styles.container}>
        <h1 className={styles.title}>
          {dictionary[lang]?.projectsTitle}
        </h1>
        <section className={styles.links}>
          {projects.map(({ img, title, subtitle, description }, index) => {
            return (
              <Project key={index} img={img} title={title} subtitle={subtitle} description={description} />
            )
          })}
        </section>
      </div>

    </Main>
  )
}
