import Image from 'next/image'

import styles from '../(styles)/Skills.module.css'
import dictionary from '@/content'

import CSSIcon from '@/icons/CSSIcon'
import GitHubIcon from '@/icons/GitHubIcon'
import HTMLIcon from '@/icons/HTMLIcon'
import JavascriptIcon from '@/icons/JavascriptIcon'
import MysqlIcon from '@/icons/MysqlIcon'
import NextjsAlternativeIcon from '@/icons/NextjsAlternativeIcon'
import NodejsIcon from '@/icons/NodejsIcon'
import ReactIcon from '@/icons/ReactIcon'

import { CodeBG } from './CodeBG'
import { Card } from './Card'

const SIZES = { width: 150, height: 150 }

const ImageBG = () => {
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{
        backgroundColor: 'rgba(128, 128, 128, 0.116)',
        backdropFilter: 'blur(3px)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      />
      <Image
        src='/githubBG.png'
        width={878}
        height={666}
        alt='github background'
        className={styles.githubImage}
      />
    </div>
  )
}

const getIcons = (lang) => {
  const icons = [
    {
      background: <CodeBG type='jsx' />,
      icon: <ReactIcon {...SIZES} />,
      description: {
        title: 'React',
        text: dictionary[lang]?.aboutSkillsCards.react
      }
    },
    {
      background: <CodeBG type='nextjs' />,
      icon: <NextjsAlternativeIcon {...SIZES} />,
      description: {
        title: 'Nextjs',
        text: dictionary[lang]?.aboutSkillsCards.nextjs
      }
    },
    {
      background: <CodeBG type='js' />,
      icon: <JavascriptIcon {...SIZES} />,
      description: {
        title: 'Javascript',
        text: dictionary[lang]?.aboutSkillsCards.js
      }
    },
    {
      background: <CodeBG type='HTML' />,
      icon: <HTMLIcon {...SIZES} />,
      description: {
        title: 'HTML',
        text: dictionary[lang]?.aboutSkillsCards.html
      }
    },
    {
      background: <CodeBG type='CSS' />,
      icon: <CSSIcon {...SIZES} />,
      description: {
        title: 'CSS',
        text: dictionary[lang]?.aboutSkillsCards.css
      }
    },
    {
      background: <CodeBG type='MySQL' />,
      icon: <MysqlIcon {...SIZES} />,
      description: {
        title: 'MySQL',
        text: dictionary[lang]?.aboutSkillsCards.mysql
      }
    },
    {
      background: <CodeBG type='nodejs' />,
      icon: <NodejsIcon {...SIZES} />,
      description: {
        title: 'Nodejs',
        text: dictionary[lang]?.aboutSkillsCards.nodejs
      }
    },
    {
      background: <ImageBG />,
      icon: <GitHubIcon {...SIZES} />,
      description: {
        title: 'GitGub',
        text: dictionary[lang]?.aboutSkillsCards.github
      }
    }
  ]

  return icons
}

export const Skills = ({ lang }) => {
  const icons = getIcons(lang)
  return (
    <>
      <h2 className={styles.title} style={{ '--stacks': 3 }}>
        <span style={{ '--index': 0 }}>{dictionary[lang]?.aboutSkillsTitle}</span>
        <span style={{ '--index': 1 }}>{dictionary[lang]?.aboutSkillsTitle}</span>
        <span style={{ '--index': 2 }}>{dictionary[lang]?.aboutSkillsTitle}</span>
      </h2>

      <div className={styles.skills}>

        {icons.map(({ background, icon, description }, index) => {
          return (

            <Card key={index} background={background} description={description}>
              {icon}
            </Card>

          )
        })}
      </div>
    </>
  )
}
