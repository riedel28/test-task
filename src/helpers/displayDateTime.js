import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default (timestamp) => {
  const dateTime = parseISO(timestamp);

  return formatDistanceToNow(dateTime, { includeSeconds: true });
};