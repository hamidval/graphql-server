import express from 'express'
import { request, gql } from 'graphql-request'
const app = express()
const port = 7000



app.get('/api/parents', async (req, res) => {
  const document = gql`
  query
{
  parents(_id:"650475569f8aeeb1a047e0b6")
  {
    _id
    firstName
    lastName
    children
    {
      _id
    }
  }
}
`
var data = await request('http://localhost:5000/graphql', document)

res.send(data)

  })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })