export default {
  count: JSON.parse(sessionStorage.getItem('vueCli-count')) || { num: 1 },
  location: JSON.parse(
      sessionStorage.getItem('locationInfo') ||
      '{"latitude": "", "longitude": ""}'
  ),
  direction: 'forward',
};
