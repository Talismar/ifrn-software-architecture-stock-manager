import { ProductTypes } from "@/@types/product";
import Header from "@/components/Header";
import { api } from "@/lib/axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Report: React.FC = () => {
  const [inputPrice, setInputPrice] = useState<number>(0);
  const [inputDate, setInputDate] = useState("");
  const [productData, setProductData] = useState<ProductTypes[]>();

  async function handleSubmitByPrice(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.get(`/product/?price=${inputPrice}`);

      setProductData(response.data);
    } catch (error) {
      toast.error("Error");
    }
  }

  async function handleSubmitByAmount(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.get(`/product/?amount=${inputPrice}`);

      setProductData(response.data);
    } catch (error) {
      toast.error("Error");
    }
  }

  async function handleSubmitByCreatedAt(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.get(`/product/?created_at=${inputDate}`);

      setProductData(response.data);
    } catch (error) {
      toast.error("Error");
    }
  }

  function handlerExportPDF() {
    window.print();
  }

  return (
    <>
      <Header />

      <main className="pb-4">
        <h1 className="print:hidden text-2xl font-medium border-b-2 border-t-2 border-gray-300 py-4 mb-4 mt-4">
          Gerar relatório
        </h1>

        <section className="print:hidden flex flex-col space-y-4">
          <form onSubmit={handleSubmitByPrice}>
            <p>Produtos por preço</p>

            <section className="flex md:space-x-4 space-x-2">
              <label className="amount grow space-y-2">
                <span className="amount after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                  Preço
                </span>
                <input
                  type="number"
                  required
                  step="any"
                  min="0"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(Number(e.target.value))}
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
              Buscar produtos por preço
            </button>
          </form>

          <form onSubmit={handleSubmitByAmount}>
            <p>Produtos por quantidade</p>

            <section className="flex md:space-x-4 space-x-2">
              <label className="amount grow space-y-2">
                <span className="amount after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                  Quantidade
                </span>
                <input
                  type="number"
                  required
                  step="any"
                  min="0"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(Number(e.target.value))}
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
              Buscar produtos por quantidade
            </button>
          </form>

          <form onSubmit={handleSubmitByCreatedAt}>
            <p>Produtos por data</p>

            <section className="flex md:space-x-4 space-x-2">
              <label className="amount grow space-y-2">
                <span className="amount after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                  Data
                </span>
                <input
                  type="date"
                  required
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
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
              Buscar produtos por data de cadastro
            </button>
          </form>
        </section>

        {productData && productData?.length > 0 && (
          <>
            <h1 className="text-2xl font-medium border-b-2 border-t-2 border-gray-300 py-4 mb-4 mt-4">
              Relatório
            </h1>

            <section className="grid grid-cols-4 my-8">
              <strong>ID</strong>
              <strong>Nome</strong>
              <strong>Quantidade</strong>
              <strong>Valor unitário</strong>
              {productData.map((product) => {
                return (
                  <React.Fragment key={product.id}>
                    <strong>{product.id}</strong>
                    <strong>{product.name}</strong>
                    <strong>{product.amount}</strong>
                    <strong>{product.price}</strong>
                  </React.Fragment>
                );
              })}
            </section>

            <button
              type="submit"
              className="print:hidden bg-sky-500 py-2 rounded-md font-semibold text-white mt-8 w-full"
              onClick={handlerExportPDF}
            >
              Exportar PDF
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Report;
