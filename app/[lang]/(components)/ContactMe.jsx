'use client'

import { useState, useEffect } from 'react'
import styles from '../(styles)/ContactMe.module.css'
import { useDarkMode } from '@/hooks/useDarkMode'

import { useRouter, usePathname, useParams } from 'next/navigation'

import dictionary from '@/content'

const SuccessCheckIcon = ({ SUBMIT, success }) => {
  return (
    <div className={styles.loading}>
      <span className={`${styles.loader} ${success === SUBMIT.success ? styles.success : {}} ${success === SUBMIT.fail ? styles.fail : {}}`} />
    </div>

  )
}

const ResizeMinimizeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 16 16'
    {...props}
  >
    <path
      d='M10 4.94V2.75a.75.75 0 0 0-1.5 0v4c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-2.19l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 4.94zM2.75 8.5a.75.75 0 0 0 0 1.5h2.19l-2.72 2.72a.75.75 0 1 0 1.06 1.06L6 11.06v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4z'
    />
  </svg>
)

const ResizeMaximizeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 16 16'
    {...props}
  >
    <path
      d='M10.25 1a.75.75 0 0 0 0 1.5h2.19L9.47 5.47a.75.75 0 0 0 1.06 1.06l2.97-2.97v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4zM2.5 10.25a.75.75 0 0 0-1.5 0v4c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5H3.56l2.97-2.97a.75.75 0 1 0-1.06-1.06L2.5 12.44v-2.19z'
    />
  </svg>
)

const MinimizeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 52 52'
    {...props}
  >
    <path d='M50 48.5c0 .8-.7 1.5-1.5 1.5h-45c-.8 0-1.5-.7-1.5-1.5v-3c0-.8.7-1.5 1.5-1.5h45c.8 0 1.5.7 1.5 1.5v3z' />
  </svg>
)

const CloseIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 1024 1024'
    {...props}
  >
    <path d='M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z' />
  </svg>
)

const ContactMeProbando = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [overlay, setOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const SUBMIT = { success: 'success', fail: 'fail' }

  const [submitSucceded, setSubmitSucceded] = useState()

  const [data, setData] = useState({ from: '', subject: '', message: '' })

  useEffect(() => {
    // Recuperar valores del localStorage y establecerlos en el estado
    const savedData = localStorage.getItem('contactMeData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  const overlayModal = () => {
    if (minimize) setMinimize(false)
    setOverlay(!overlay)
  }

  const onClose = () => {
    localStorage.removeItem('contactMeData')
    router.push(pathname, { scroll: false })
  }
  const modalDontClose = (e) => {
    e.stopPropagation()
  }

  const submitSuccess = () => {
    setIsLoading(false)
    setSubmitSucceded(SUBMIT.success)

    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const submitFail = () => {
    setIsLoading(false)
    setSubmitSucceded(SUBMIT.fail)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (submitSucceded === SUBMIT.success) { return }
    if (submitSucceded === SUBMIT.fail) { setSubmitSucceded(false) }

    setIsLoading(true)

    console.log('e.target', e.target)

    fetch('https://formsubmit.co/af65f212b60c83d937015778adf4fd56', {
      method: 'POST',
      body: new FormData(e.target)
    })
      .then((res) => {
        setIsLoading(false)

        console.log('res', res)
        console.log('exito')

        localStorage.removeItem('contactMeData')

        submitSuccess()
      })
      .catch((error) => {
        submitFail()

        console.log('error', error)
      })

    // action='https://formsubmit.co/af65f212b60c83d937015778adf4fd56' method='POST'
  }

  const onChange = (e, input) => {
    const value = e.target.value

    setData(prevState => {
      const newState = { ...prevState }
      newState[input] = value
      localStorage.setItem('contactMeData', JSON.stringify(newState))

      return newState
    })
  }

  const [minimize, setMinimize] = useState(false)
  const minimizeModal = () => {
    if (overlay) setOverlay(false)
    setMinimize(!minimize)
  }

  const ModelButtonsColorLight = '#041e49'
  const ModelButtonsColorDark = '#f2f6fc'

  const { isDarkMode } = useDarkMode()

  const params = useParams()

  const bodyStyle = overlay ? 'overflow: hidden' : ''

  return (
    <div className={overlay ? styles.overlay : styles.wrapper} onClick={overlayModal}>
      <link href='https://fonts.googleapis.com/css2?family=Google+Sans&display=swap' rel='stylesheet' />
      <div className={styles.modal} onClick={modalDontClose}>

        <section className={`${styles.encabezado} ${submitSucceded === SUBMIT.success ? styles.encabezadoSuccess : submitSucceded === SUBMIT.fail ? styles.encabezadoError : ''}`}>
          <h2 className={styles.encabezadoTitle}>
            <span>
              {submitSucceded === SUBMIT.success &&
                <>
                  {dictionary[params.lang]?.contactMeSuccess}
                </>}
              {submitSucceded === SUBMIT.fail &&
                <>
                  {dictionary[params.lang]?.contactMeError}

                </>}
              {!submitSucceded &&
                <>
                  {dictionary[params.lang]?.contactMeTitle}
                </>}
            </span>
          </h2>
          <div className={styles.modalButtons}>
            <button className={styles.minimize} onClick={minimizeModal}>
              <MinimizeIcon width={14} height={14} fill={isDarkMode ? ModelButtonsColorDark : ModelButtonsColorLight} />
            </button>
            <button className={styles.resize} onClick={overlayModal}>
              {overlay
                ? <ResizeMinimizeIcon width={16} height={16} fill={isDarkMode ? ModelButtonsColorDark : ModelButtonsColorLight} />
                : <ResizeMaximizeIcon width={16} height={16} fill={isDarkMode ? ModelButtonsColorDark : ModelButtonsColorLight} />}
            </button>
            <button className={styles.close} onClick={onClose}>
              <CloseIcon width={16} height={16} fill={isDarkMode ? ModelButtonsColorDark : ModelButtonsColorLight} />
            </button>
          </div>
        </section>
        <form className={styles.form} onSubmit={handleSubmit} style={minimize ? { display: 'none' } : null}>
          {/* Honeypot */}
          <input type='text' name='_honey' style={{ display: 'none' }} />

          {/* Disable captcha */}
          <input type='hidden' name='_captcha' value={false} />

          {/* On succes does whats inside value */}
          <input type='hidden' name='_next' value={pathname} />

          <section className={styles.body}>
            <div className={styles.contactInfo}>
              <div className={styles.remitter}>
                <input name='From:&nbsp;(&nbsp;Email&nbsp;/&nbsp;Phone&nbsp;Number&nbsp;)' placeholder={dictionary[params.lang]?.contactMePlaceholderFrom} value={data.from} onChange={(e) => onChange(e, 'from')} />
              </div>
              <div className={styles.subject}>
                <input name='Subject' placeholder={dictionary[params.lang]?.contactMePlaceholderSubject} value={data.subject} onChange={(e) => onChange(e, 'subject')} />
              </div>
            </div>
            <div className={styles.message}>
              <textarea name='Message' value={data.message} onChange={(e) => onChange(e, 'message')} />
            </div>
          </section>
          <section className={styles.footer}>
            <button type='submit' className={`${styles.send} ${submitSucceded === SUBMIT.success ? styles.sendSuccess : submitSucceded === SUBMIT.fail ? styles.sendError : ''}`}>
              {(isLoading || submitSucceded) && <SuccessCheckIcon SUBMIT={SUBMIT} success={submitSucceded} />}

              <span className={styles.sendText} style={(isLoading || submitSucceded) ? { paddingLeft: '15px' } : {}}>
                {dictionary[params.lang]?.contactMePlaceholderSend}
              </span>
            </button>

          </section>
        </form>
      </div>

      <style>
        {`
        
          @media (max-width: 650px) {            
            body, html {
              ${bodyStyle}
            }
          }
        `}
      </style>

    </div>
  )
}

export default ContactMeProbando

// Otros diseños css del contact me
// https://codepen.io/krisantuswanandi/pen/KxrgeZ
// https://codepen.io/valerite-dev/pen/RRQKze
