import { MONGODB_APIKEY, MONGODB_ENDPOINT, MONGODB_DATABASE, MONGODB_DATASOURCE } from '$env/static/private';

export async function find(collection: string, filter:any, projection: any): Promise<any> {
    const response = await fetch(MONGODB_ENDPOINT + "/action/find", {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            ApiKey:MONGODB_APIKEY
        },
        body: JSON.stringify({
            'collection':collection,
            'database':MONGODB_DATABASE,
            'dataSource':MONGODB_DATASOURCE,
            'filter': filter,
            'projection': projection
        })
    });

    return await response.json();
}