export const schema = `#graphql
type Vuelo {
  id: ID!
  origen: String!
  destino: String!
  fechaHora: String!
}

type Query {
  getFlights: [Vuelo!]!
  getFlight(id: ID!): Vuelo
}

type Mutation {
  addFlight(origen: String!, destino: String!,fechaHora: String!): Vuelo!
}
`;