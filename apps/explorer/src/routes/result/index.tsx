import { LoaderFunctionArgs } from 'react-router-dom';
import Result from './Result';
import axios from 'axios';
import { parseVaa } from '../../sdk';
import { Buffer } from "buffer";

export default Result;


export async function resultLoader({ params }: LoaderFunctionArgs) {
    const response = await axios.get(`https://api.wormscan.io/api/v1/vaas?txHash=${params.id}`);
    (window as any).vaa = response.data.data[0].vaa;
    (window as any).parseVaa = parseVaa;
    (window as any).Buffer = Buffer;
    console.log(parseVaa(Buffer.from(response.data.data[0].vaa)));
    return {
        data: {}
    };
}