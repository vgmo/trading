

export async function fetchDataFromServer(tickerId) {
  try {
    const res = await fetch(`https://api.marketsseer.com/dev/signals/${tickerId}`);
    return res.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}