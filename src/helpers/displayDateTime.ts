import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const displayDateTime = (timestamp: string) => {
  const dateTime = parseISO(timestamp);

  return formatDistanceToNow(dateTime, { includeSeconds: true });
};

export default displayDateTime;
