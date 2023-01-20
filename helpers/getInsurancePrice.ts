import { Insurance } from '@openapi'

export default (insurance: Insurance) => {
  switch (insurance) {
    case Insurance.CHEAP:
      return 50
    case Insurance.MEDIUM:
      return 100
    case Insurance.EXPENSIVE:
      return 150
  }
}
