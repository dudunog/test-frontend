import { NextApiRequest, NextApiResponse } from "next"
import { clients } from '../../../../db.json'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id, name: `Client ${id}` })
      break
    case 'DELETE':
      // Delte data from your database
      if (!id)
        res.status(400).json({ error: 'Empty customer identifier' })

      const client = clients.find(client => client.id === Number(id));

      if (!client) {
        res.status(404).json({ id, error: 'Client not found' })
      }
      else {
        clients = clients.splice(clients.indexOf(client), 1)
        res.status(204).json({ id, result: 'Client removed' })
      }

      break
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
