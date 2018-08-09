import trae from 'trae'
import configService from './config'

const findMyRoomService = trae.create({
  baseUrl: configService.apiUrl
})

export default findMyRoomService
