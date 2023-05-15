import { LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';

export async function resultLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const tx = url.searchParams.get("tx");
    const { data: { data } } = await axios.get(`https://api.wormscan.io/api/v1/vaas?txHash=${tx}`);
    const vaa = data.vaa;
    return redirect(`/mainnet/inspector/${encodeURIComponent(vaa)}`);
}

export default function SearchResult() {
  const data = useLoaderData();
  return <div>{ JSON.stringify(data ) }</div>;
}