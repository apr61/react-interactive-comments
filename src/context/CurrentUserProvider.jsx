import { createContext, useContext } from 'react'
import data from '../data/data.json'

const CurrentUserContext = createContext()

export function useCurrentUser(){
  return useContext(CurrentUserContext)
}

function CurrentUserProvider({children}) {
  const current_user = data['currentUser']
  return (
    <CurrentUserContext.Provider value={current_user}>
        {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider