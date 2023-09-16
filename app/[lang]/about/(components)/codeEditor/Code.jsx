import styles from './Code.module.css'

import { JSXTextFormater } from './typesFormaters/jsx/JSXTextFormater'
import { HTMLTextFormater } from './typesFormaters/HTML/HTMLTextFormater'
import { CSSTextFormater } from './typesFormaters/CSS/CSSTextFormater'

export const CopyCodeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    className='h-4 w-4'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
    <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
  </svg>
)

const CODE_NODEJS = {
  type: 'nodejs',

  lines: [
    "import { Router, Request, Response } from 'express';",
    "import controller from '../controller/controller';",
    '',
    'class Routes {',
    '    public router: Router = Router();',
    '    constructor() {',
    '        this.config();',
    '    }',
    '    config(): void {',
    "        this.router.get('/', (req: Request, res: Response) => {",
    "            res.send('Main!!!');",
    '        });',
    '',
    "        this.router.get('/listarInformacion', controller.listarInformacion);",
    '    }',
    '}',
    '',
    '// Exportamos el enrutador',
    'const routes = new Routes();',
    'export default routes.router;'
  ],

  globalStates: {

    // Array de palabras q si se repite alguna q este en algun array significa q ya tiene un tipo designado
    // Esto seria un estado mas global creo // Entiendo q lo tendria q hacer a nivel de todas las lineas los estados globales para q compartan variables y el commentAll tambien

    namesArrays: {
      functionsNamesArray: ['useEffect', 'useState', 'useRef', 'useCallback'],
      variablesNamesArray: ['res'],
      constantsNamesArray: ['console', 'document', 'Math', 'this'],
      componentNamesArray: [],
      specialFunctionsNamesArray: ['setInterval', 'clearInterval', 'alert'],
      variablesInScope: []
    },

    // Estado para cuando pones {} o [] o ()

    curlyBracket: { open: false, isProperty: false },

    // Esto seria un estado mas global creo
    globalBooleans: { isCommentAll: false, equalsOpen: false, doubleDotOpen: false, parentheseOpen: false },

    htmlTags: { tags: [], nextClosed: false, isText: false }
  }

}

const CODE_MYSQL = {
  type: 'MySQL',

  lines: [
    'async listarInformacion() {',
    "    const categorias = await this.db.query('SELECT id, nombre, etc FROM table');",
    '    return categorias[0];',
    '}'
  ],
  globalStates: {

    // Array de palabras q si se repite alguna q este en algun array significa q ya tiene un tipo designado
    // Esto seria un estado mas global creo // Entiendo q lo tendria q hacer a nivel de todas las lineas los estados globales para q compartan variables y el commentAll tambien

    namesArrays: {
      functionsNamesArray: ['useEffect', 'useState', 'useRef', 'useCallback'],
      variablesNamesArray: ['res'],
      constantsNamesArray: ['console', 'document', 'Math', 'this'],
      componentNamesArray: [],
      specialFunctionsNamesArray: ['setInterval', 'clearInterval', 'alert'],
      variablesInScope: []
    },

    // Estado para cuando pones {} o [] o ()

    curlyBracket: { open: false, isProperty: false },

    // Esto seria un estado mas global creo
    globalBooleans: { isCommentAll: false, equalsOpen: false, doubleDotOpen: false, parentheseOpen: false },

    htmlTags: { tags: [], nextClosed: false, isText: false }
  }

}

const CODE_CSS = {
  type: 'CSS',

  lines: [
    'body {',
    '  margin: 0;',
    '  padding: 0;',
    '  font-family: Arial, sans-serif;',
    '  background-color: #f0f0f0;',
    '}',
    '',
    'header {',
    '  background-color: #333;',
    '  color: #fff;',
    '  text-align: center;',
    '  padding: 1rem 0;',
    '}',
    '',
    'main {',
    '  padding: 2rem;',
    '}',
    '',
    'footer {',
    '  background-color: #333;',
    '  color: #fff;',
    '  text-align: center;',
    '  padding: 1rem 0;',
    '}',
    '',
    '.section-with-bg {',
    '  background-size: cover;',
    '  background-position: center;',
    '  padding: 4rem;',
    '  color: #fff;',
    '  text-align: center;',
    '}'
  ],

  globalStates: {}
}

const CODE_HTML = {
  type: 'HTML',

  lines: [
    '<html>',
    '  <head>',
    '    <title>Mi Página</title>',
    '  </head>',
    '  <body>',
    '    <header>',
    '      <h1>Mi Página</h1>',
    '    </header>',
    '    <main>',
    '      Content',
    '    </main>',
    '    <footer>',
    '      <p> 2023 | Todos los derechos reservados</p>',
    '    </footer>',
    '  </body>',
    '</html>'
  ],

  globalStates: {
    tags: [],
    nextClosed: false,
    isText: false,
    isTag: false,
    isTagProperty: false
  }
}

const CODE_JSX = {
  type: 'jsx',
  // En el caso de jsx tengo q hacer un estado global de variables e isCommentAll

  // lines: [
  //   'const NOMBRE = {type: true, content: 20}',
  //   'NOMBRE.type = false',
  //   'useEffect(()=>{}, [])',
  //   'function name ({captain, sudoku}) { return }'
  // ],

  lines: [
    'const Counter = () => {',
    '  const [count, setCount] = useState(0)',
    '  const countRef = useRef(0)',
    '',
    '  useEffect(() => {',
    '    // Actualizar el título de la página con el valor actual del contador',
    '    document.title = `Contador: ' + '${' + 'count}`',
    '',
    '    /*Utilizamos useRef para almacenar el  valor actual de count entre renders*/',
    '    countRef.current = count',
    '  }, [count])',
    '',
    '  const increment = () => {',
    '    setCount(prevCount => prevCount + 1)',
    '  }',
    '',
    '  return (',
    '    <div>',
    '      <h2>Contador: {count}</h2>',
    '      <button onClick={increment}>Incrementar</button>',
    '      <p>Último valor del contador: {countRef.current}</p>',
    '    </div>',
    '  )',
    '}'
  ],

  // lines: [
  //   'const CounterExample = () => {',
  //   '  const [count, setCount] = useState(0)',
  //   '  const [isPaused, setIsPaused] = useState(false)',
  //   '  const countRef = useRef(count)',
  //   '',
  //   '  useEffect(() => {',
  //   '    countRef.current = count',
  //   '   }, [count])',
  //   '',
  //   '  useEffect(() => {',
  //   '    if (!isPaused) {',
  //   '      const interval = setInterval(() => {',
  //   '        setCount(prevCount => prevCount + 1)',
  //   '      }, 1000)',
  //   '',
  //   '      return () => clearInterval(interval)',
  //   '    }',
  //   '  }, [isPaused])',
  //   '',
  //   '  useEffect(() => {',
  //   '     if (countRef.current === 10) {',
  //   '       alert(\'Counter reached 10!\')',
  //   '     }',
  //   '  }, [count])',
  //   '',
  //   '   return (',
  //   '     <div>',
  //   '       <h1>Counter Example</h1>',
  //   '       <p>Current count: {count}</p>',
  //   '       <button onClick={() => setIsPaused(!isPaused)}>',
  //   '          {isPaused ? \'Resume\' : \'Pause\'}',
  //   '       </button>',
  //   '     </div>',
  //   '   )',
  //   '}'
  // ],

  globalStates: {

    // Array de palabras q si se repite alguna q este en algun array significa q ya tiene un tipo designado
    // Esto seria un estado mas global creo // Entiendo q lo tendria q hacer a nivel de todas las lineas los estados globales para q compartan variables y el commentAll tambien

    namesArrays: {
      functionsNamesArray: ['useEffect', 'useState', 'useRef', 'useCallback'],
      variablesNamesArray: [],
      constantsNamesArray: ['console', 'document', 'Math', 'this'],
      componentNamesArray: [],
      specialFunctionsNamesArray: ['setInterval', 'clearInterval', 'alert'],
      variablesInScope: []
    },

    // Estado para cuando pones {} o [] o ()

    curlyBracket: { open: false, isProperty: false },

    // Esto seria un estado mas global creo
    globalBooleans: { isCommentAll: false, equalsOpen: false, doubleDotOpen: false, parentheseOpen: false },

    htmlTags: { tags: [], nextClosed: false, isText: false }
  }
}

const CODE_NEXTJS = {
  type: 'nextjs',
  lines: [
    "import { NavBar } from './(components)/NavBar'",
    "import { Footer } from './(components)/Footer'",
    '',
    "import styles from './app.module.css'",
    '',
    'export default function RootLayout ({ children }) {',
    '  return (',
    "    <html lang='en'>",
    '      <head>',
    '        <title>',
    '          This is the title',
    '        </title>',
    '      </head>',
    '      <body className={styles.body}>',
    '        <NavBar />',
    '        {children}',
    '        <Footer />',
    '      </body>',
    '    </html>',
    '  )',
    '}'
  ],

  globalStates: {

    // Array de palabras q si se repite alguna q este en algun array significa q ya tiene un tipo designado
    // Esto seria un estado mas global creo // Entiendo q lo tendria q hacer a nivel de todas las lineas los estados globales para q compartan variables y el commentAll tambien

    namesArrays: {
      functionsNamesArray: ['useEffect', 'useState', 'useRef', 'useCallback'],
      variablesNamesArray: [],
      constantsNamesArray: ['console', 'document', 'Math', 'this'],
      componentNamesArray: [],
      specialFunctionsNamesArray: ['setInterval', 'clearInterval', 'alert'],
      variablesInScope: []
    },

    // Estado para cuando pones {} o [] o ()

    curlyBracket: { open: false, isProperty: false },

    // Esto seria un estado mas global creo
    globalBooleans: { isCommentAll: false, equalsOpen: false, doubleDotOpen: false, parentheseOpen: false },

    htmlTags: { tags: [], nextClosed: false, isText: false }
  }
}

const CODE_JS = {
  type: 'js',
  lines: [
    "document.addEventListener('DOMContentLoaded', function() {",
    '  const stars = []',
    "  const sceneRef = document.querySelector('.scene')",
    '',
    '  const count = 10',
    '  const sceneWidth = sceneRef.clientWidth',
    '',
    '  let i = 0',
    '  while (i < count) { ',
    '    const posicion = sceneWidth * (i * 0.1)',
    '    const duration = Math.random() * 1',
    '    const h = Math.random() * 100',
    '',
    "    const star = document.createElement('i')",
    '    star.style.left = `' + '${' + 'posicion}px`',
    "    star.style.width = '1px'",
    '    star.style.height = `' + '${' + '10 + h}px`',
    '    star.style.animationDuration = `' + '${' + 'duration}s`',
    '',
    '    stars.push(star)',
    '    i++',
    '  }',
    '',
    '  stars.forEach(star => {',
    '    sceneRef.appendChild(star)',
    '  })',
    '})'
  ],

  globalStates: {

    // Array de palabras q si se repite alguna q este en algun array significa q ya tiene un tipo designado
    // Esto seria un estado mas global creo // Entiendo q lo tendria q hacer a nivel de todas las lineas los estados globales para q compartan variables y el commentAll tambien

    namesArrays: {
      functionsNamesArray: ['useEffect', 'useState', 'useRef', 'useCallback'],
      variablesNamesArray: [],
      constantsNamesArray: ['console', 'document', 'Math', 'this'],
      componentNamesArray: [],
      specialFunctionsNamesArray: ['setInterval', 'clearInterval', 'alert'],
      variablesInScope: []
    },

    // Estado para cuando pones {} o [] o ()

    curlyBracket: { open: false, isProperty: false },

    // Esto seria un estado mas global creo
    globalBooleans: { isCommentAll: false, equalsOpen: false, doubleDotOpen: false, parentheseOpen: false },

    htmlTags: { tags: [], nextClosed: false, isText: false, isVar: false }
  }
}
export const Code = ({ type }) => {
  // const [codeText, setCodeText] = useState('Esto es el texto')

  // const textRef = useRef(null)

  // const [markPostition, setMarkPostiion] = useState({ left: 0, top: 0 })
  // const { CursorText, setIsVisible } = useCursor()
  // const { SelectionText } = useSelectionText()

  // const { handleMouseDown } = useEventsListeners({ setIsVisible, setMarkPostiion, textRef })

  return (
    <div className={styles.editorCode}>
      <div className={styles.overlayBlured} />
      <div className={styles.editorCodeContent}>
        {type === CODE_JSX.type &&
          CODE_JSX.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <JSXTextFormater line={line} globalStates={CODE_JSX.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_NEXTJS.type &&
          CODE_NEXTJS.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <JSXTextFormater line={line} globalStates={CODE_NEXTJS.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_JS.type &&
          CODE_JS.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <JSXTextFormater line={line} globalStates={CODE_JS.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_HTML.type &&
          CODE_HTML.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <HTMLTextFormater line={line} globalStates={CODE_HTML.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_CSS.type &&
          CODE_CSS.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <CSSTextFormater line={line} globalStates={CODE_CSS.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_NODEJS.type &&
          CODE_NODEJS.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <JSXTextFormater line={line} globalStates={CODE_NODEJS.globalStates} />
                </span>
              </pre>
            )
          })}

        {type === CODE_MYSQL.type &&
          CODE_MYSQL.lines.map((line, index) => {
            return (
              <pre className={styles.line} key={index}>
                <span>
                  <JSXTextFormater line={line} globalStates={CODE_MYSQL.globalStates} />
                </span>
              </pre>
            )
          })}

      </div>

    </div>
  )
}
