import Search from '@/components/Search'
import About from '@/components/About'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import RoomDetails from '@/components/room/RoomDetails'
import LessorRooms from '@/components/lessor/rooms'
import LessorRoom from '@/components/lessor/room'
import Ejemplo from '@/components/ejemplo/padre'

const routes = [
  { path: '/search', component: Search, name: 'search' },
  { path: '/about', component: About, name: 'about' },
  { path: '/signin', component: SignIn, name: 'signin' },
  { path: '/signup', component: SignUp, name: 'signup' },
  { path: '/room/:id', component: RoomDetails, name: 'room' },
  { path: '/lessor/rooms', component: LessorRooms, name: 'lessorRooms' },
  { path: '/lessor/room/:id', component: LessorRoom, name: 'lessorRoom' },
  { path: '/ejemplo', component: Ejemplo, name: 'ejemplo' }
]

export default routes
