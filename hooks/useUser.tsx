import { DefaultService, UserInfo } from '@openapi'
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IUserContext {
  user: UserInfo
  setUser: Dispatch<SetStateAction<IUserContext['user']>>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const UserContext = createContext<Partial<IUserContext>>({})

export const UseUser = () => {
  return useContext(UserContext)
}

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>()

  const login = async (email: string, password: string) => {
    const { access_token } = await DefaultService.login({ email, password })
    localStorage.setItem('cargo_token', access_token)
    await getUser(access_token)
  }

  const getUser = async (accessToken?: string) => {
    const token = accessToken || localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token
    const userInfo = await DefaultService.getUser(authorization)
    setUser(userInfo)
  }

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem('cargo_token')
  }

  useEffect(() => {
    if (localStorage.getItem('cargo_token') && !user) {
      getUser()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
