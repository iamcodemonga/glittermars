import { GraphQLClient, gql } from "graphql-request";

// const key = NEXT_PUBLIC_API_KEY;
const key = process.env.NEXT_PUBLIC_API_KEY;
// const bearer = NEXT_PUBLIC_GRAPH_BEARER;
const bearer = process.env.NEXT_PUBLIC_GRAPH_BEARER;

export const hygraph = new GraphQLClient( key,
    {
      headers: {
        Authorization: bearer
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
                quantity
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

export const FindUser = async(email, password) => {
    const QUERY = gql`
        {
            customers(where: {email: "${email}", password: "${password}"}) {
                id
                fullname
                email
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.customers;
}

export const GetUser = async(id) => {
    const QUERY = gql`
        {
            customer(where: {id: "${id}"}) {
                id
                fullname
                email
            }
        }`;
    const result = await hygraph.request(QUERY)
    return result.product;
}