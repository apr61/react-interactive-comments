import './style.css'
import ContextProvider from './context/ContextProvider'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Comments from './pages/Comments'

library.add(fas)

function App() {
  return (
    <main>
      <section className="comment__container">
        <ContextProvider>
          <Comments />
        </ContextProvider>
      </section>
    </main>
  );
}

export default App;
