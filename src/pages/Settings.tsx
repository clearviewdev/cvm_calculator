import { useLayoutEffect } from 'react';
import CompensationCriteria from '../components/CompensationCriteria';
import useComissionStore from '../store/comissionStore';
import { getData, getFeildsData } from '../api/ComissionAPI';
import NavBar from '../components/NavBar';
import useLoaderStore from '../store/loaderStore';

export default function SettingsPage() {
  const { setItems, setFields } = useComissionStore((state) => state);
  const { setLoading, isLoading } = useLoaderStore((state) => state);

  useLayoutEffect(() => {
    fetchPolicy();
  }, []);

  async function fetchPolicy() {
    setLoading(true);
    const items = await getData();
    setItems(items);

    const feilds = await getFeildsData('admin');
    setFields(feilds);

    setLoading(false);
  }

  if (isLoading) return null;

  return (
    <div className="bg-white dark:bg-black relative">
      <NavBar />
      <CompensationCriteria />
    </div>
  );
}
