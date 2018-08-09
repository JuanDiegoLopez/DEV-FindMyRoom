import findMyRoomService from './find-my-room'
const universityService = {}

universityService.search = async function () {
  const response = await findMyRoomService.get(`/university`)
  return response
}

export default universityService
