import { clients } from '../../db.json'

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

export default function ChangeClientArray(clientsUpdated: Client[]) {
  clients = clientsUpdated;
}