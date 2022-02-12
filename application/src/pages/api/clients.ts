import { NextApiRequest, NextApiResponse } from 'next'
import { clients } from '../../../db.json'

interface Client {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  genero: string;
  cidade: string;
  pais: string;
  empresa: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Client[]>) {
  res.status(200).json(clients)
}