import { getDatabase } from 'firebase/database';
const getEventById = ({eventId}) => {
  const db = getDatabase();
  debugger;
  console.log(db);
}

export { getEventById };