import { GraphQLClient, gql } from "graphql-request";

export const hygraph = new GraphQLClient(
    'https://api-eu-west-2.hygraph.com/v2/clm68n5c83ncw01uk6gmo9gdp/master',
    {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTQyNTcyNDEsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xtNjhuNWM4M25jdzAxdWs2Z21vOWdkcC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMDUyZTQxODEtYWVmMi00N2E2LTk2ZWYtYTNlMWYxNTYzOWI2IiwianRpIjoiY2xtYngwbWloMHpudTAxdWljMjQ4MTZjYSJ9.GVGAg8Yhe55MLCUG05KWXy__pQNtwARXF01IXEC_OtXNFIoNBG5VJSkzUPC46p9KKGYG8rcZ80D7ixeMlqbxLqa8kkcW6n5FZ1bx1JWwARqxAFC_lywGoJTtrlB5i_NErF5RKai6JNGPIfn5bTos0ZIGTg8sHOcVLIwXi-sLK1O403iZukvQHmBzRLibq1DwHywI5YL9niXFDxrPVT4po6tBON1V-0QD-MpAYZhoHnQAGzSEr7ep4WBdNZkiHEKf8FeYF9lQ5006Oj4JY0oYgnkNlqJUEaVpFuPk0_T7PV6WYhMkEaUU2CsbHc5KuLP4cWnt5TKxNuHYZ3rWJ8ztZnIJ5C8Uir_nv_UdSBzbC3JOJPeTNyh2al93TblU-8tsjJfHvREZPLdI4piJfpkcs4rAfPbjKGAEsxymvgH6zhvVnUesGn9L7ZsdPfFrsC9STeOzMbunA30-PKlAKfNUNFtYDZWlppxlULlhHkH5Xw4eTwKGxE_WfLq8ZQeR0j1s84438jjIdAN-b-qWHttk9aiUR981P4xQvzR8PBkWOydB9lkCpcsHUeLCVojRj1CKB0ffNutziw6UZuRYeOg8vQH9XqR6FBZhs6Y8lH9HGp_3ctTdMqLTy_2VlkHJuaKB34on5J1CNCm1k-uy-Pzx_Fk-avuJDL_5UJAIULan35s'
      }
    }
);
  
export const FeaturedProducts = async() => {
    const QUERY = gql`
        {
            products(first: 6) {
                images
                price
                id
                quantity
                slug
                title
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.products;
}

export const SellingProducts = async() => {
    const QUERY = gql`
        {
            products(last: 6) {
                images
                price
                id
                quantity
                slug
                title
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.products;
}

export const SingleProducts = async(slug) => {
    console.log(slug)
    const QUERY = gql`
        {
            product(where: {slug: "${slug}"}) {
                id
                images
                title
                slug
                price
                category
                description {
                    html
                  }
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.product;
}

export const SimilarProducts = async(id, category) => {
    const QUERY = gql`
        {
            products(where: {category: "${category}", id_not: "${id}"}, first: 6) {
                images
                price
                id
                quantity
                slug
                title
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.products;
}

export const FilteredProducts = async(min, max) => {
    const QUERY = gql`
        {
            products(where: {price_gte: ${min}, price_lte: ${max}}) {
                images
                price
                id
                quantity
                slug
                title
              }
        }`;
    const result = await hygraph.request(QUERY)
    return result.products;
}

export const CategoryProducts = async(category, min, max) => {
    const QUERY = gql`
        {
            products(where: {category: "${category}", price_gte: ${min}, price_lte: ${max}}) {
                images
                price
                id
                quantity
                slug
                title
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.products;
}