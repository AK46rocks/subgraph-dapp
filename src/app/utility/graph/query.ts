import { gql } from "@apollo/client";

export const getAirSwapLights = gql`
  query {
      swapLights(first: 3, orderDirection: desc, orderBy: timestamp) {
        timestamp
        from
        to
        value
        signerAmount
        senderAmount
        signerFee
      }
  }
`;

export const getAllAttributes = (entity: any) => {
  return gql`
        query{
          __type(name:"${entity}"){
            name
          fields{
            name
            type{
              name
              ofType{
                name
                kind
              }
            }
          }
        }
        }
    `;
};
