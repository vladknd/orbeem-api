import type { NextPage } from 'next'

import ProfileComponent from '../components/Profile/Profile.component'
import { useAuthorize } from '../services/auth.service'


const Profile: NextPage = () => {
  const [authorized, loading] = useAuthorize()  
  return <ProfileComponent/>
}

export default Profile
