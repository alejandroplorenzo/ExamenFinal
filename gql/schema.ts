export const typeDefs = `#graphql
    type Contacto {
        id: ID
        nombreApellido: String
        telefono: String
        Pais: String
        horaActual: String
        net_worth: String
        gender: String
        occupation: String
        height: String
        birthday: String
    }

    type Mutation { 
        addContact(nombreApellido: String!, telefono: String!): Contacto!
        getContact(id: ID!): Contacto!
        getContacts(): [Contacto]!
        deleteContact(id: ID!): Boolean!
        updateContact(id: ID!, nombreApellido: String!, telefono: String!): Contacto! 
    }

`;