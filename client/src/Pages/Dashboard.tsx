/* This example requires Tailwind CSS v2.0+ */
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/reducer/app'

export default function Example() {
  const dispatch = useDispatch()

  return (
    <div>
      yo
      <button onClick={() => dispatch(signOut())}>sign out</button>
    </div>
  )
}
