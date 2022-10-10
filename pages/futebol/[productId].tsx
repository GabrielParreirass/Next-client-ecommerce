import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }:any = context;

  const res = await fetch(`http://localhost:3001/products/${params.productId}`);
  const data = await res.json();

  console.log(data);

  return {
    props: {
      data: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:3001/getAll");

  const data = await response.json();


  const paths = data.map((todo:any) => {
    return {
      params: {
        productId: `${todo._id}`,
      },
    };
  });

  return { paths, fallback: false };
};

function Product({ data }: any) {
  return <div>{data.team_name} - {data.team_year}</div>;
}

export default Product;
