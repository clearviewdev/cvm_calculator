import { useLayoutEffect } from 'react';
import CompensationCriteria from '../components/CompensationCriteria';
import useComissionStore from '../store/comissionStore';
import { getData } from '../api/ComissionAPI';
import NavBar from '../components/NavBar';

export default function SettingsPage() {
  const setItems = useComissionStore((state) => state.setItems);

  useLayoutEffect(() => {
    fetchPolicy();
  }, []);

  async function fetchPolicy() {
    const items = await getData();
    setItems(items);
  }

  return (
    <div className="bg-white dark:bg-black relative">
      <NavBar />
      <CompensationCriteria />
    </div>
  );
}
