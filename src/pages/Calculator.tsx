import { useLayoutEffect, useRef, useState } from 'react';
import Calculator from '../components/Calculator';
import Outcome from '../components/Outcome';
import { initialFormState } from '../types';
import useComissionStore from '../store/comissionStore';
import { getData } from '../api/ComissionAPI';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import useLoaderStore from '../store/loaderStore';

export default function CalculatorPage() {
  const [form, setForm] = useState(initialFormState);
  const { monthlyCommission, total_points, commissionPerApp } = form;
  const setItems = useComissionStore((state) => state.setItems);
  const { setLoading, isLoading } = useLoaderStore((state) => state);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });

  useLayoutEffect(() => {
    fetchPolicy();
  }, []);

  async function fetchPolicy() {
    setLoading(true);
    const items = await getData();
    setItems(items);
    setLoading(false);
  }

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 lg:px-0">
          <div className="px-6 py-4 mb-8 rounded-lg">
            <h1
              style={{ color: '#122d42' }}
              className="text-4xl font-bold tracking-tight dark:text-white text-center"
            >
              Commission Rate Calculator
            </h1>
            <p className="text-lg text-gray-800 dark:text-gray-300 mt-6 text-center">
              An agent commission calculator that efficiently computes
              commissions based on policies sold, ensuring accurate and
              transparent compensation.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2">
              <Calculator
                form={form}
                setForm={setForm}
                scroll={executeScroll}
              />
            </div>
            <div
              ref={scrollRef}
              className="mx-auto w-full p-4 lg:px-0 flex flex-col justify-between items-center lg:w-1/2"
            >
              <div className="mt-2 p-2 lg:mt-0 lg:w-full w-full max-w-2xl lg:max-w-lg">
                <div className="rounded-2xl bg-gray-50 dark:bg-black text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-700 lg:flex lg:flex-col lg:justify-center py-8">
                  <div className="space-y-8">
                    <Outcome
                      withDivider
                      label="Monthly Commission"
                      value={monthlyCommission}
                      showCurrencySymbol={true}
                    />
                    <Outcome
                      withDivider
                      label="Total Points"
                      value={total_points}
                      showCurrencySymbol={false}
                    />
                    <Outcome
                      label="Commission per App"
                      value={commissionPerApp}
                      showCurrencySymbol={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
