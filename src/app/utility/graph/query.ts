import { gql } from "@apollo/client";

export const getCryptoPunksNft = gql`
  query {
    punkTransfers(first: 50, orderBy: blockNumber, orderDirection: desc) {
      punkIndex
      to
      from
      transactionHash
      id
      blockNumber
      blockTimestamp
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
