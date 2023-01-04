import './style.css'
import data from './data/data.json'
import CommentList from './components/CommentList'
import CurrentUserProvider from './context/CurrentUserProvider'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import CommentForm from './components/CommentForm'

library.add(fas)

const comments = data['comments']

function App() {
  return (
    <main>
      <section className="comment__container">
        <CurrentUserProvider>
          <CommentList comments={comments} />
          <CommentForm action={'Send'}/>
        </CurrentUserProvider>
      </section>
    </main>
  );
}

export default App;
