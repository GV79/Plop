import React from 'react';
import DragDropComponent from './DragDropComponent';
import { useActiveIssues } from '../../utility/hooks';

export default function TeamDashboard({ changePage, checkSession }) {
  const [items, setItems, loading] = useActiveIssues('team', checkSession);

  return <DragDropComponent changePage={changePage} items={items} setItems={setItems} loading={loading} />;
}
