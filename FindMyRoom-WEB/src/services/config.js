console.log(process.env)
const configService = {
  apiUrl: process.env.REST || 'https://findmyroom.herokuapp.com/api'
}

export default configService
