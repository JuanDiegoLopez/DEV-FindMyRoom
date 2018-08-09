import findMyRoomService from './find-my-room'
const roomService = {}

roomService.search = async function () {
  const response = await findMyRoomService.get('/room')
  return response
}

roomService.searchByUniversity = async function (query) {
  const response = await findMyRoomService.get(`/room/university/${query}`)
  return response
}

roomService.searchById = async function (id) {
  const response = await findMyRoomService.get(`/room/${id}`)
  return response
}

roomService.addComment = async function (id, data) {
  const response = await findMyRoomService.post(`/room/addComment/${id}`, data)
  return response
}

roomService.deleteRoom = async function (id) {
  const response = await findMyRoomService.delete(`/room/${id}`)
  return response
}

roomService.saveRoom = async function (room) {
  const response = await findMyRoomService.post('/room', room)
  return response
}

roomService.updateRoom = async function (id, room) {
  const response = await findMyRoomService.put(`/room/${id}`, room)
  return response
}

export default roomService
