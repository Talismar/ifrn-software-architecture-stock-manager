import { ProductTypes } from "@/@types/product";
import Header from "@/components/Header";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface CartItemsAmount {
  [key: string]: number;
}

export default function Register() {
  const [inputId, setInputId] = useState<number>(6);
  const [inputAmount, setInputAmount] = useState(1);
  const [productData, setProductData] = useState<ProductTypes[]>();

  async function handleSubmitSearchProduct(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.patch(`/product/${inputId}/`, {
        amount: inputAmount,
      });

      if (!response.data) {
        return;
      }

      if (response.data.amount < inputAmount) {
        showInsufficientStockError(response.data.amount);
      } else {
        updateProductData(response.data);
      }

      resetFormInputs();
    } catch (error) {
      handleProductSearchError(error as AxiosError);
    }
  }

  function showInsufficientStockError(stockAmount: number) {
    toast.error("Estoque insuficiente!");
    toast.warn(`So existe ${stockAmount} quantidades em estoque.`);
  }

  function updateProductData(productData: ProductTypes) {
    const updatedProduct = { ...productData, amount: inputAmount };
    const updatedProductData = getUpdatedProductData(updatedProduct);

    setProductData(updatedProductData);
    toast.success("Produto adicionado com sucesso.");
  }

  function getUpdatedProductData(updatedProduct: ProductTypes) {
    const updatedProductData = productData ? [...productData] : [];
    const existingProductIndex = updatedProductData.findIndex(
      (product) => product.id === updatedProduct.id
    );

    if (existingProductIndex !== -1) {
      updatedProductData[existingProductIndex].amount += inputAmount;
    } else {
      updatedProductData.push(updatedProduct);
    }

    return updatedProductData;
  }

  function handleProductSearchError(error: AxiosError) {
    if (error.response?.status === 404) {
      toast.error("Produto não encontrado!");
    }
  }

  function resetFormInputs() {
    setInputId(0);
    setInputAmount(0);
  }

  async function handleFinishSale() {
    const id_amount_products: CartItemsAmount = {};

    for (let index = 0; index < productData!.length; index++) {
      const element = productData![index];
      id_amount_products[String(element.id)] = element.amount;
    }

    try {
      const response = await api.post("/finish-sale/", {
        product_cart: id_amount_products,
      });

      if (response.status === 200) {
        toast.success("Compra finalizada com sucesso.");
        setProductData(undefined);
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 404) {
        const error_message = error.response?.data as { error: string };
        toast.error(error_message.error);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Stock Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section>
          <h1 className="text-2xl font-medium border-b-2 border-t-2 border-gray-300 py-4 mb-4">
            Saída de produtos
          </h1>

          <form onSubmit={handleSubmitSearchProduct}>
            <p>Digite o id do produto para efetuar uma saída</p>

            <section className="flex md:space-x-4 space-x-2">
              <label className="amount grow space-y-2">
                <span className="amount after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                  ID do produto
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  value={inputId}
                  onChange={(e) => setInputId(Number(e.target.value))}
                  className="mt-1 amount w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                          invalid:border-pink-500 invalid:text-pink-600
                          focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                          "
                />
              </label>

              <label className="amount grow space-y-2">
                <span className="amount after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                  Quantidade desejada
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(Number(e.target.value))}
                  className="mt-1 amount w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                          invalid:border-pink-500 invalid:text-pink-600
                          focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                          "
                />
              </label>
            </section>

            <button
              type="submit"
              className="bg-sky-500 py-2 rounded-md font-semibold text-white mt-8 w-full"
            >
              Buscar produto
            </button>
          </form>
        </section>

        {productData && (
          <>
            <h1 className="text-2xl font-medium border-b-2 border-t-2 border-gray-300 py-4 mb-4 mt-4">
              Carrinho de produtos
            </h1>

            <section className="grid grid-cols-5 my-8">
              <strong>ID</strong>
              <strong>Nome</strong>
              <strong>Quantidade</strong>
              <strong>Valor unitário</strong>
              <strong>Valor total</strong>
              {productData.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <strong>{product.id}</strong>
                    <strong>{product.name}</strong>
                    <strong>{product.amount}</strong>
                    <strong>{product.price}</strong>
                    <strong>
                      {(product.price * product.amount).toFixed(2)}
                    </strong>
                  </React.Fragment>
                );
              })}
            </section>

            <button
              type="submit"
              className="bg-sky-500 py-2 rounded-md font-semibold text-white mt-8 w-full"
              onClick={handleFinishSale}
            >
              Finalizar compra
            </button>
          </>
        )}
      </main>
    </>
  );
}
