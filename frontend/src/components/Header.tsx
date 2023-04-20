import Link from "next/link";
import React from "react";

// import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <header className="print:hidden mt-2 mb-4 flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold self-center">Stock Manager</h1>

      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/dashboard"
              className="py-2 text-sky-500 border-2 border-sky-500 px-4 rounded-md text-sm font-medium hover:bg-sky-50"
            >
              Lista de produtos
            </Link>
          </li>
          <li>
            <Link
              href="/entrada"
              className="py-2 text-sky-500 border-2 border-sky-500 px-4 rounded-md text-sm font-medium hover:bg-sky-50"
            >
              Entrada
            </Link>
          </li>
          <li>
            <Link
              href="/saida"
              className="py-2 text-sky-500 border-2 border-sky-500 px-4 rounded-md text-sm font-medium hover:bg-sky-50"
            >
              Saída
            </Link>
          </li>
          <li>
            <Link
              href="/relatorio"
              className="py-2 text-sky-500 border-2 border-sky-500 px-4 rounded-md text-sm font-medium hover:bg-sky-50"
            >
              Relatório
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
