import { getDatabase } from 'firebase/database';
const getEventById = ({eventId}) => {
  const db = getDatabase();
  console.log(db);
}

export { getEventById };