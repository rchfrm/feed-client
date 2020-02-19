import HomePage from '../../components/page/HomePage'
import RouteGuarding from '../../components/RouteGuarding'

export default () => {
  return (
    <RouteGuarding>
      <HomePage />
    </RouteGuarding>
  )
}
